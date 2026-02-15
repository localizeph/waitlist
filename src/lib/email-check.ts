import { notion, NOTION_DB_ID } from "./notion";
import { logger, getErrorMessage } from "./logger";

export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    logger.debug("email-check", "Checking if email exists", { email, databaseId: NOTION_DB_ID });
    
    const existing = await notion.databases.query({
      database_id: NOTION_DB_ID,
      filter: { property: "Email", email: { equals: email } }
    });
    
    const exists = existing.results.length > 0;
    logger.debug("email-check", "Email check completed", { email, exists, count: existing.results.length });
    
    return exists;
  } catch (error: unknown) {
    logger.error("email-check", "Error checking email existence", error instanceof Error ? error : new Error(getErrorMessage(error)), { email });
    throw error;
  }
}