import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { notion } from './notion';
import { logger, getErrorMessage } from './logger';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getNotionDatabaseRowCount(databaseId: string): Promise<number> {
  try {
    logger.debug("utils", "Fetching database row count", { databaseId });
    
    let allResults: unknown[] = [];
    let hasMore = true;
    let startCursor: string | null = null;
    let pageCount = 0;

    // Fetch all pages from the database (handling pagination)
    while (hasMore) {
      pageCount++;
      logger.debug("utils", "Fetching database page", { databaseId, pageCount, startCursor });
      
      const response = await notion.databases.query({
        database_id: databaseId,
        start_cursor: startCursor ?? undefined,
        page_size: 100,
      });

      allResults = allResults.concat(response.results);
      hasMore = response.has_more;
      startCursor = response.next_cursor;
    }

    logger.info("utils", "Database row count fetched", { databaseId, rowCount: allResults.length, pagesFetched: pageCount });
    return allResults.length;
  } catch (error: unknown) {
    logger.error("utils", "Error fetching database row count", error instanceof Error ? error : new Error(getErrorMessage(error)), { databaseId });
    throw error;
  }
}
// Simple referral code generator used in the Notion API route
const REFERRAL_CODE_CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateCode(length = 8): string {
  let code = '';
  const charsetLength = REFERRAL_CODE_CHARSET.length;

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * charsetLength);
    code += REFERRAL_CODE_CHARSET[index];
  }

  return code;
}
