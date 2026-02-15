# Notion SDK Usage Documentation

This document details how the `@notionhq/client` SDK is used in this Next.js waitlist project.

---

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [Client Initialization](#client-initialization)
- [API Usage](#api-usage)
  - [Database Queries](#database-queries)
  - [Creating Pages](#creating-pages)
  - [Helper Functions](#helper-functions)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Files Using Notion SDK](#files-using-notion-sdk)
- [Error Handling](#error-handling)

---

## Overview

The project uses **Notion as a CMS** to store and manage waitlist entries. The `@notionhq/client` package (v3.0.1) provides the official JavaScript SDK for interacting with Notion's API.

**Primary Use Cases:**
- Storing waitlist signups in a Notion database
- Querying existing entries to prevent duplicates
- Managing referral codes and referral relationships
- Tracking user signups

---

## Installation

```bash
npm install @notionhq/client
# or
pnpm add @notionhq/client
# or
yarn add @notionhq/client
```

**Package version:** `^3.0.1`

---

## Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
NOTION_SECRET="your_notion_integration_secret"
NOTION_DB_ID="your_notion_database_id"
```

### Setting Up Notion Integration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "+ New integration"
3. Name it (e.g., "Waitlist App Integration")
4. Associate with your workspace
5. Enable capabilities: "Insert content", "Read content", "Update content"
6. Copy the "Internal Integration Token" → this is your `NOTION_SECRET`
7. Share your database with the integration via the `•••` menu → "+ Add connections"

---

## Client Initialization

**File:** `src/lib/notion.ts`

```typescript
import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

// Notion database ID for the waitlist entries
export const NOTION_DB_ID = process.env.NOTION_DB_ID || "";
```

The `Client` instance is exported as a singleton and reused across the application.

---

## API Usage

### Database Queries

#### 1. Check if Email Exists

**File:** `src/lib/email-check.ts`

```typescript
import { notion, NOTION_DB_ID } from "./notion";

export async function checkEmailExists(email: string) {
  const existing = await notion.databases.query({
    database_id: NOTION_DB_ID,
    filter: { property: "Email", email: { equals: email } }
  });
  return existing.results.length > 0;
}
```

**SDK Method:** `notion.databases.query()`

**Filter Type:** `EmailPropertyFilter` - Filters by email property type

---

#### 2. Check for Duplicate Before Creating

**File:** `src/app/api/notion/route.ts`

```typescript
const existing = await notion.databases.query({
  database_id: NOTION_DB_ID,
  filter: {
    property: "Email",
    email: { equals: email },
  },
});

if (existing.results.length > 0) {
  return NextResponse.json(
    { error: "You're already on the waitlist!" },
    { status: 409 }
  );
}
```

---

#### 3. Find Referrer by Referral Code

```typescript
const results = await notion.databases.query({
  database_id: NOTION_DB_ID,
  filter: {
    property: "Referral Code",
    rich_text: { equals: referredBy },
  },
});

if (results.results.length > 0) {
  referrerPageId = results.results[0].id;
}
```

**Filter Type:** `RichTextPropertyFilter` - Filters by text content

---

#### 4. Get Database Row Count (with Pagination)

**File:** `src/lib/utils.ts`

```typescript
export async function getNotionDatabaseRowCount(databaseId: string) {
  try {
    let allResults: unknown[] = [];
    let hasMore = true;
    let startCursor: string | null = null;

    // Fetch all pages from the database (handling pagination)
    while (hasMore) {
      const response = await notion.databases.query({
        database_id: databaseId,
        start_cursor: startCursor ?? undefined,
        page_size: 100,
      });

      allResults = allResults.concat(response.results);
      hasMore = response.has_more;
      startCursor = response.next_cursor;
    }

    return allResults.length;
  } catch (error) {
    console.error("Error fetching database rows:", error);
    throw error;
  }
}
```

**Pagination Properties:**
- `has_more`: Boolean indicating if more results exist
- `next_cursor`: Cursor for fetching the next page
- `page_size`: Number of results per page (max 100)

---

### Creating Pages

**File:** `src/app/api/notion/route.ts`

```typescript
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
```

**SDK Method:** `notion.pages.create()`

**Property Types Used:**

| Property | Type | Description |
|----------|------|-------------|
| `Name` | `title` | Page title property |
| `Email` | `email` | Email property type |
| `Referral Code` | `rich_text` | Plain text content |
| `Referred By` | `rich_text` | Optional text content |
| `Referrer` | `relation` | Links to another page in the same database |

---

## Database Schema

The Notion database must have the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `Name` | Title | Yes | User's name (defaults to email prefix) |
| `Email` | Email | Yes | User's email address (unique) |
| `Referral Code` | Text | Yes | Unique referral code for sharing |
| `Referred By` | Text | No | Referral code that brought this user |
| `Referrer` | Relation | No | Relation to the referrer's page (self-referential) |
| `Signed Up At` | Created time | Optional | Auto-generated timestamp |

**Setup Instructions:**
1. Create a new "Database - Full page" in Notion
2. Add properties with the exact names and types listed above
3. For the `Referrer` relation, select the same database as the target

---

## Files Using Notion SDK

| File | Purpose |
|------|---------|
| `src/lib/notion.ts` | Client initialization and exports |
| `src/lib/utils.ts` | Helper function `getNotionDatabaseRowCount()` |
| `src/lib/email-check.ts` | Helper function `checkEmailExists()` |
| `src/app/api/notion/route.ts` | API route for creating waitlist entries |

---

## Error Handling

The API route includes comprehensive error handling:

```typescript
try {
  // ... database operations
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Notion API error:", error.message);
    
    return NextResponse.json(
      {
        error: "Failed to save to Notion",
        details: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (missing email)
- `409` - Conflict (email already exists)
- `500` - Internal Server Error (Notion API error)

---

## API Route

**Endpoint:** `POST /api/notion`

**Request Body:**
```json
{
  "email": "user@example.com",
  "firstname": "John",
  "referredBy": "ABC12345"
}
```

**Response Body (Success):**
```json
{
  "success": true,
  "message": "Added to waitlist",
  "code": "XYZ789AB",
  "notionId": "page-uuid-here"
}
```

**Response Body (Conflict):**
```json
{
  "error": "You're already on the waitlist!"
}
```

---

## TypeScript Types

The Notion SDK provides TypeScript definitions for all API methods. Key types include:

- `Client` - Main SDK client class
- `QueryDatabaseParameters` - Parameters for database queries
- `CreatePageParameters` - Parameters for creating pages
- `PageObjectResponse` - Response type for page creation

---

## Rate Limits

Notion API has rate limits:
- **Integration limits:** 3 requests per second (for free tier)

The project implements Upstash Redis rate limiting separately for API routes.

---

## Additional Resources

- [Notion API Documentation](https://developers.notion.com/)
- [@notionhq/client npm package](https://www.npmjs.com/package/@notionhq/client)
- [Notion API Reference](https://developers.notion.com/reference/intro)
