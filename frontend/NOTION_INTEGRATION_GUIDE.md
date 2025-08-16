# Notion API Integration Guide

## Current Status

The Projects page is currently using **mock data** because the Notion API cannot be called directly from the browser due to CORS (Cross-Origin Resource Sharing) restrictions.

## The CORS Problem

- Notion API is designed for server-side use only
- Browser applications cannot make direct calls to Notion API
- This is a security feature to protect API keys

## Solutions to Implement Real Notion Integration

### Option 1: Backend API Proxy (Recommended)

Create a backend API that acts as a proxy:

```javascript
// backend/api/projects.js (Node.js/Express example)
const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

app.get("/api/projects", async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: "status",
        select: {
          does_not_equal: "archived",
        },
      },
    });

    res.json(response.results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});
```

Then update the frontend to call your API:

```javascript
// frontend - update notionService.js
async getProjects() {
  const response = await fetch('/api/projects');
  return response.json();
}
```

### Option 2: Serverless Functions

Deploy serverless functions (Vercel, Netlify, etc.):

```javascript
// api/projects.js (Vercel serverless function)
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        // ... query options
      });

      res.status(200).json(response.results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  }
}
```

### Option 3: Next.js API Routes

If you migrate to Next.js:

```javascript
// pages/api/projects.js
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default async function handler(req, res) {
  // Same implementation as serverless function
}
```

## Environment Variables Setup

For any backend solution, you'll need to set environment variables:

```bash
NOTION_TOKEN=your_notion_api_token_here
NOTION_DATABASE_ID=your_notion_database_id_here
```

## Required Notion Database Properties

Your Notion database should have these properties:

- **title** (Title)
- **description** (Rich text)
- **URL** (URL)
- **thumbnail** (Files & media)
- **status** (Select: active, archived, etc.)
- **work-type** (Select: PI Project, PI Service, PI Platform)

## Implementation Steps

1. Choose one of the backend solutions above
2. Set up environment variables securely
3. Update `notionService.js` to call your backend API instead of Notion directly
4. Test the integration
5. Deploy your backend alongside your frontend

## Security Notes

- Never expose Notion API tokens in frontend code
- Always use environment variables for sensitive data
- Implement proper error handling and rate limiting
- Consider caching responses to reduce API calls

The current mock data setup ensures the application works while you implement the proper backend integration.
