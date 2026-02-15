import { NextResponse } from "next/server";
import { notion, NOTION_DB_ID } from "~/lib/notion";
import { generateCode } from "~/lib/utils";
import { logger, getErrorMessage } from "~/lib/logger";

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  
  try {
    const { email, firstname, referredBy } = await request.json();

    logger.debug("notion-api", "Processing waitlist submission", { requestId, email, referredBy });

    if (!email) {
      logger.warn("notion-api", "Missing email in request", { requestId });
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    logger.debug("notion-api", "Checking for existing email", { requestId, email, databaseId: NOTION_DB_ID });

    const existing = await notion.databases.query({
      database_id: NOTION_DB_ID,
      filter: {
        property: "Email",
        email: { equals: email },
      },
    });

    if (existing.results.length > 0) {
      logger.info("notion-api", "Duplicate email submission attempted", { requestId, email });
      return NextResponse.json(
        { error: "You're already on the waitlist!" },
        { status: 409 }
      );
    }

    // Generate unique referral code
    const code = generateCode();
    logger.debug("notion-api", "Generated referral code", { requestId, code });

    // Find referrer by matching Referred By → Referral Code
    let referrerPageId: string | null = null;
    if (referredBy) {
      logger.debug("notion-api", "Looking up referrer", { requestId, referredBy });
      
      try {
        const results = await notion.databases.query({
          database_id: NOTION_DB_ID,
          filter: {
            property: "Referral Code",
            rich_text: { equals: referredBy },
          },
        });

        if (results.results.length > 0) {
          referrerPageId = results.results[0].id;
          logger.debug("notion-api", "Found referrer", { requestId, referrerPageId });
        } else {
          logger.warn("notion-api", "Referrer not found", { requestId, referredBy });
        }
      } catch (error: unknown) {
        logger.error("notion-api", "Error looking up referrer", error instanceof Error ? error : new Error(getErrorMessage(error)), { requestId, referredBy });
        // Continue without referrer - don't block the signup
      }
    }

    // Create new entry
    logger.debug("notion-api", "Creating new page in Notion", { requestId, email, code });
    
    const page = await notion.pages.create({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        Name: {
          title: [{ text: { content: firstname || email.split("@")[0] } }],
        },
        Email: { email },
        "Referral Code": {
          rich_text: [{ text: { content: code } }],
        },
        "Referred By": referredBy
          ? { rich_text: [{ text: { content: referredBy } }] }
          : { rich_text: [] },
        // Link referrer via Relation
        Referrer: referrerPageId
          ? { relation: [{ id: referrerPageId }] }
          : { relation: [] },
      },
    });

    logger.info("notion-api", "Successfully added to waitlist", { requestId, email, notionId: page.id, code });

    return NextResponse.json(
      {
        success: true,
        message: "Added to waitlist",
        code, // ← Used in form to generate share link
        notionId: page.id,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    logger.error("notion-api", "Error processing waitlist submission", error instanceof Error ? error : new Error(errorMessage), { requestId });
    
    return NextResponse.json(
      {
        error: "Failed to save to Notion",
        details: errorMessage,
        success: false,
      },
      { status: 500 }
    );
  }
}
