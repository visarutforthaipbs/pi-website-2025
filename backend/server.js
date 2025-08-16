const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

// MongoDB imports
const { connectToDatabase, initializeDatabase } = require("./config/database");
const wordCloudService = require("./services/wordCloudService");
const votingService = require("./services/votingService");

const app = express();
const PORT = process.env.PORT || 3001;

// Notion API configuration
const NOTION_TOKEN = "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";
const DATABASE_ID = "24e85b60e2a780988192cc3b3ab25fdf";
const NOTION_API_BASE = "https://api.notion.com/v1";

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to format project data from Notion response
function formatProject(project) {
  const properties = project.properties;

  return {
    id: project.id,
    title: getPlainText(properties.title?.title || []),
    description: getPlainText(properties.description?.rich_text || []),
    url: properties.URL?.url || "#",
    thumbnail: getThumbnail(properties.thumbnail?.files || []),
    status: properties.status?.select?.name || "active",
    workType: properties.workType?.select?.name || "PI Project",
    createdTime: project.created_time,
    lastEditedTime: project.last_edited_time,
  };
}

// Extract plain text from Notion rich text
function getPlainText(richText) {
  return richText.map((text) => text.plain_text).join("");
}

// Get thumbnail URL from Notion files
function getThumbnail(files) {
  if (files && files.length > 0) {
    const file = files[0];
    return file.type === "external" ? file.external.url : file.file.url;
  }
  return "/images/project/default-project.jpg"; // Fallback image
}

// Routes
app.get("/api/projects", async (req, res) => {
  try {
    const response = await fetch(
      `${NOTION_API_BASE}/databases/${DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NOTION_TOKEN}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
        body: JSON.stringify({
          sorts: [
            {
              property: "title",
              direction: "ascending",
            },
          ],
          page_size: 100,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Notion API Error ${response.status}:`, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Notion API returned ${data.results.length} results`);
    console.log(`Has more pages: ${data.has_more}`);

    const projects = data.results.map((project) => formatProject(project));

    res.json({
      data: projects,
      meta: {
        total: projects.length,
      },
    });
  } catch (error) {
    console.error("Error fetching projects from Notion:", error);
    res.status(500).json({ error: "Failed to fetch projects from Notion" });
  }
});

app.get("/api/projects/type/:workType", async (req, res) => {
  const { workType } = req.params;

  try {
    const response = await fetch(
      `${NOTION_API_BASE}/databases/${DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NOTION_TOKEN}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
        body: JSON.stringify({
          filter: {
            property: "work-type",
            select: {
              equals: workType,
            },
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const projects = data.results.map((project) => formatProject(project));

    res.json({
      data: projects,
      meta: {
        total: projects.length,
      },
    });
  } catch (error) {
    console.error(`Error fetching ${workType} projects from Notion:`, error);
    res
      .status(500)
      .json({ error: `Failed to fetch ${workType} projects from Notion` });
  }
});

// Voting endpoints using MongoDB Atlas
// GET /api/projects/:projectId/votes - Get vote count for a project
app.get("/api/projects/:projectId/votes", async (req, res) => {
  try {
    const { projectId } = req.params;
    const userIP = req.ip || req.connection.remoteAddress;

    // Get project vote data
    const projectVotes = await votingService.getProjectVotes(projectId);
    const hasVoted = await votingService.hasUserVoted(projectId, userIP);

    res.json({
      votes: projectVotes.count,
      hasVoted: hasVoted,
    });
  } catch (error) {
    console.error("Error fetching vote data:", error);
    res.status(500).json({ error: "Failed to fetch vote data" });
  }
});

// POST /api/projects/:projectId/vote - Vote for a project
app.post("/api/projects/:projectId/vote", async (req, res) => {
  try {
    const { projectId } = req.params;
    const userIP = req.ip || req.connection.remoteAddress;

    // Submit vote
    const result = await votingService.submitVote(projectId, userIP);

    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }

    // Get updated vote count
    const projectVotes = await votingService.getProjectVotes(projectId);

    res.json({
      success: true,
      votes: projectVotes.count,
      hasVoted: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Error adding vote:", error);
    res.status(500).json({ error: "Failed to add vote" });
  }
});

// GET /api/projects/votes/all - Get vote counts for all projects
app.get("/api/projects/votes/all", async (req, res) => {
  try {
    const userIP = req.ip || req.connection.remoteAddress;

    // Get all votes
    const allVotes = await votingService.getAllVotes();

    // Convert to the format expected by frontend
    const votes = {};
    const userVotes = [];

    for (const [projectId, voteData] of Object.entries(allVotes)) {
      votes[projectId] = voteData.count;
      if (voteData.voters.has(userIP)) {
        userVotes.push(projectId);
      }
    }

    res.json({
      votes: votes,
      userVotes: userVotes,
    });
  } catch (error) {
    console.error("Error fetching all votes:", error);
    res.status(500).json({ error: "Failed to fetch votes data" });
  }
});

// Wordcloud endpoints using MongoDB
// GET /api/wordclouds - Fetch word cloud data
app.get("/api/wordclouds", async (req, res) => {
  try {
    const words = await wordCloudService.getAllWords();

    // Format the response to match Strapi's structure
    const formattedData = {
      data: words.map((word, index) => ({
        id: word.id || index + 1,
        attributes: {
          text: word.text,
          value: word.value,
          createdAt: word.createdAt?.toISOString() || new Date().toISOString(),
          updatedAt: word.updatedAt?.toISOString() || new Date().toISOString(),
        },
      })),
      meta: {
        pagination: {
          page: 1,
          pageSize: words.length,
          pageCount: 1,
          total: words.length,
        },
      },
    };

    console.log(`Returning ${words.length} word cloud items from MongoDB`);
    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching word cloud data from MongoDB:", error);
    res.status(500).json({ error: "Failed to fetch word cloud data" });
  }
});

// POST /api/wordclouds - Submit new word to word cloud
app.post("/api/wordclouds", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return res
        .status(400)
        .json({ error: "Text is required and must be a non-empty string" });
    }

    const result = await wordCloudService.addOrUpdateWord(text);
    const stats = await wordCloudService.getWordStats();

    res.json({
      success: true,
      message: "Word submitted successfully",
      data: {
        word: result,
        stats: stats,
      },
    });
  } catch (error) {
    console.error("Error submitting word to MongoDB:", error);
    res.status(500).json({ error: "Failed to submit word" });
  }
});

// GET /api/wordclouds - Fetch word cloud data
app.get("/api/wordclouds", (req, res) => {
  try {
    // Format the response to match Strapi's structure
    const formattedData = {
      data: wordCloudData.map((word, index) => ({
        id: index + 1,
        attributes: {
          text: word.text,
          value: word.value,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      })),
      meta: {
        pagination: {
          page: 1,
          pageSize: wordCloudData.length,
          pageCount: 1,
          total: wordCloudData.length,
        },
      },
    };

    console.log(`Returning ${wordCloudData.length} word cloud items`);
    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching word cloud data:", error);
    res.status(500).json({ error: "Failed to fetch word cloud data" });
  }
});

// POST /api/wordclouds - Submit new word to word cloud
app.post("/api/wordclouds", (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return res
        .status(400)
        .json({ error: "Text is required and must be a non-empty string" });
    }

    const trimmedText = text.trim();

    // Check if word already exists
    const existingWordIndex = wordCloudData.findIndex(
      (word) => word.text.toLowerCase() === trimmedText.toLowerCase()
    );

    if (existingWordIndex !== -1) {
      // Increment existing word count
      wordCloudData[existingWordIndex].value += 1;
      console.log(
        `Incremented word "${trimmedText}" to value ${wordCloudData[existingWordIndex].value}`
      );
    } else {
      // Add new word
      wordCloudData.push({ text: trimmedText, value: 1 });
      console.log(`Added new word "${trimmedText}" with value 1`);
    }

    res.json({
      success: true,
      message: "Word submitted successfully",
      data: {
        word: result,
        stats: stats,
      },
    });
  } catch (error) {
    console.error("Error submitting word to MongoDB:", error);
    res.status(500).json({ error: "Failed to submit word" });
  }
});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "Please fill in all required fields",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
        message: "Please provide a valid email address",
      });
    }

    // Create nodemailer transporter (using Gmail as example)
    // Note: You'll need to set up email credentials in environment variables
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "pi.thaipbs@gmail.com",
        pass: process.env.EMAIL_PASS || "your-app-password",
      },
    });

    // Email to the PI team
    const mailToTeam = {
      from: process.env.EMAIL_USER || "pi.thaipbs@gmail.com",
      to: "pi.thaipbs@gmail.com",
      subject: `[PI Website Contact] ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>Sent from PI Website Contact Form</small></p>
      `,
    };

    // Auto-reply to the sender
    const autoReply = {
      from: process.env.EMAIL_USER || "pi.thaipbs@gmail.com",
      to: email,
      subject: "ขอบคุณสำหรับการติดต่อ - PI Team",
      html: `
        <h2>ขอบคุณสำหรับการติดต่อ</h2>
        <p>สวัสดี ${name},</p>
        <p>ขอบคุณที่ได้ส่งข้อความมาหาเรา เราได้รับข้อความของคุณเรียบร้อยแล้วและจะตอบกลับโดยเร็วที่สุด</p>
        <p><strong>หัวข้อที่คุณส่งมา:</strong> ${subject}</p>
        <br>
        <p>ขอแสดงความนับถือ,</p>
        <p>ทีม Public Intelligence (PI)<br>
        สำนักเครือข่ายและการมีส่วนร่วมสาธารณะ<br>
        บริษัทสื่อสาธารณะไทย</p>
        <hr>
        <p><small>อีเมลนี้ถูกส่งอัตโนมัติ กรุณาอย่าตอบกลับอีเมลนี้</small></p>
      `,
    };

    // Send emails
    try {
      await transporter.sendMail(mailToTeam);
      await transporter.sendMail(autoReply);

      res.json({
        success: true,
        message: "Message sent successfully",
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);

      // For demo purposes, we'll still return success even if email fails
      // In production, you might want to save to database as fallback
      res.json({
        success: true,
        message: "Message received successfully",
      });
    }
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to process contact form",
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Notion API server is running" });
});

// Initialize database and start server
async function startServer() {
  try {
    // Try to connect to MongoDB
    const dbConnection = await connectToDatabase();

    if (dbConnection) {
      console.log("✅ Connected to MongoDB");

      // Initialize database with sample data if needed
      await initializeDatabase();
      console.log("✅ Database initialized");
    } else {
      console.log("⚠️  Running in fallback mode without MongoDB");
    }

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📋 Available endpoints:`);
      console.log(`   - GET  /api/projects - Fetch projects from Notion`);
      console.log(
        `   - GET  /api/wordclouds - Fetch word cloud data${
          dbConnection ? " from MongoDB" : " (fallback mode)"
        }`
      );
      console.log(`   - POST /api/wordclouds - Submit word to word cloud`);
      console.log(`   - POST /api/contact - Submit contact form`);
      console.log(`   - GET  /health - Health check`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

// Start the server
startServer();
