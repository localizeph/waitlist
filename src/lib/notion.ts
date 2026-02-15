import { Client } from "@notionhq/client";
import { logger } from "./logger";

// Validate environment variables
if (!process.env.NOTION_SECRET) {
  logger.error("notion-client", "NOTION_SECRET environment variable is not set");
}

if (!process.env.NOTION_DB_ID) {
  logger.warn("notion-client", "NOTION_DB_ID environment variable is not set");
}

export const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

logger.info("notion-client", "Notion client initialized");

// Notion database ID for the waitlist entries
export const NOTION_DB_ID = process.env.NOTION_DB_ID || "";

