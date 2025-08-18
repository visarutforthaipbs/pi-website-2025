import ky from "ky";
import dotenv from "dotenv";

dotenv.config();

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_EVENTS_DATABASE_ID =
  process.env.NOTION_EVENTS_DATABASE_ID || "25185b60e2a780e6b7b7f45332081f3c";
const NOTION_API_VERSION = "2022-06-28";

// Create a ky instance with default headers
const notionClient = ky.create({
  prefixUrl: "https://api.notion.com/v1",
  headers: {
    Authorization: `Bearer ${NOTION_API_KEY}`,
    "Notion-Version": NOTION_API_VERSION,
    "Content-Type": "application/json",
  },
});

class NotionService {
  /**
   * Fetch all projects from the Notion database
   * @returns {Promise<Array>} Array of project objects
   */
  async getProjects() {
    try {
      if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
        throw new Error("Notion API credentials not configured");
      }

      // First, try to get the database schema to understand available properties
      let databaseInfo;
      try {
        databaseInfo = await notionClient
          .get(`databases/${NOTION_DATABASE_ID}`)
          .json();
        console.log(
          "Database properties:",
          Object.keys(databaseInfo.properties || {})
        );
      } catch (dbError) {
        console.warn("Could not fetch database schema:", dbError.message);
      }

      // Try the query without sorting first to avoid property name issues
      const response = await notionClient
        .post(`databases/${NOTION_DATABASE_ID}/query`, {
          json: {
            page_size: 100,
          },
        })
        .json();

      console.log(`Notion API returned ${response.results.length} results`);

      // Transform Notion data to our project format
      return response.results.map((page) =>
        this.transformNotionPageToProject(page)
      );
    } catch (error) {
      console.error("Error fetching projects from Notion:", error);

      // If we get a 400 error, let's try to get more details
      if (error.response && error.response.status === 400) {
        try {
          const errorBody = await error.response.text();
          console.error("Notion API Error Details:", errorBody);
        } catch (e) {
          console.error("Could not parse error response");
        }
      }

      throw error;
    }
  }

  /**
   * Get a specific project by ID
   * @param {string} projectId - Notion page ID
   * @returns {Promise<Object>} Project object
   */
  async getProjectById(projectId) {
    try {
      const response = await notionClient.get(`pages/${projectId}`).json();
      return this.transformNotionPageToProject(response);
    } catch (error) {
      console.error("Error fetching project by ID from Notion:", error);
      throw error;
    }
  }

  /**
   * Transform Notion page data to our project format
   * @param {Object} page - Notion page object
   * @returns {Object} Transformed project object
   */
  transformNotionPageToProject(page) {
    const properties = page.properties;

    // Log the properties to understand the structure
    console.log("Available properties:", Object.keys(properties));

    return {
      id: page.id,
      title:
        this.getPropertyValue(
          properties.Title || properties.Name || properties.title
        ) || "Untitled Project",
      description:
        this.getPropertyValue(
          properties.Description || properties.description
        ) || "No description available",
      status:
        this.getPropertyValue(properties.Status || properties.status) ||
        "draft",
      category:
        this.getPropertyValue(
          properties.Category || properties.category || properties.workType
        ) || "general",
      budget:
        this.getPropertyValue(properties.Budget || properties.budget) || 0,
      startDate: this.getPropertyValue(
        properties["Start Date"] || properties.StartDate || properties.startDate
      ),
      endDate: this.getPropertyValue(
        properties["End Date"] || properties.EndDate || properties.endDate
      ),
      votes: this.getPropertyValue(properties.Votes || properties.votes) || 0,
      createdTime: page.created_time,
      lastEditedTime: page.last_edited_time,
      url: page.url,
      // Extract thumbnail/image
      thumbnail:
        this.getPropertyValue(
          properties.Thumbnail ||
            properties.thumbnail ||
            properties.Image ||
            properties.image ||
            properties.Cover ||
            properties.cover
        ) || this.getPageCover(page),
      // Extract any additional properties
      tags: this.getPropertyValue(properties.Tags || properties.tags) || [],
      priority:
        this.getPropertyValue(properties.Priority || properties.priority) ||
        "medium",
    };
  }

  /**
   * Extract value from Notion property based on its type
   * @param {Object} property - Notion property object
   * @returns {any} Extracted value
   */
  getPropertyValue(property) {
    if (!property) return null;

    switch (property.type) {
      case "title":
        return property.title.map((t) => t.plain_text).join("");
      case "rich_text":
        return property.rich_text.map((t) => t.plain_text).join("");
      case "select":
        return property.select?.name || null;
      case "multi_select":
        return property.multi_select.map((option) => option.name);
      case "number":
        return property.number;
      case "date":
        return property.date?.start || null;
      case "checkbox":
        return property.checkbox;
      case "url":
        return property.url;
      case "email":
        return property.email;
      case "phone_number":
        return property.phone_number;
      case "created_time":
        return property.created_time;
      case "last_edited_time":
        return property.last_edited_time;
      case "files":
        return (
          property.files?.[0]?.file?.url ||
          property.files?.[0]?.external?.url ||
          null
        );
      default:
        return null;
    }
  }

  /**
   * Extract cover image URL from a Notion page
   * @param {Object} page - Notion page object
   * @returns {string|null} Cover image URL
   */
  getPageCover(page) {
    if (!page?.cover) return null;

    // Handle file cover
    if (page.cover.type === "file" && page.cover.file?.url) {
      return page.cover.file.url;
    }

    // Handle external cover
    if (page.cover.type === "external" && page.cover.external?.url) {
      return page.cover.external.url;
    }

    return null;
  }

  /**
   * Create a new project in Notion
   * @param {Object} projectData - Project data to create
   * @returns {Promise<Object>} Created project object
   */
  async createProject(projectData) {
    try {
      const response = await notionClient
        .post("pages", {
          json: {
            parent: { database_id: NOTION_DATABASE_ID },
            properties: this.transformProjectToNotionProperties(projectData),
          },
        })
        .json();

      return this.transformNotionPageToProject(response);
    } catch (error) {
      console.error("Error creating project in Notion:", error);
      throw error;
    }
  }

  /**
   * Transform project data to Notion properties format
   * @param {Object} projectData - Project data
   * @returns {Object} Notion properties object
   */
  transformProjectToNotionProperties(projectData) {
    const properties = {};

    if (projectData.title) {
      properties.Title = {
        title: [{ text: { content: projectData.title } }],
      };
    }

    if (projectData.description) {
      properties.Description = {
        rich_text: [{ text: { content: projectData.description } }],
      };
    }

    if (projectData.status) {
      properties.Status = {
        select: { name: projectData.status },
      };
    }

    if (projectData.category) {
      properties.Category = {
        select: { name: projectData.category },
      };
    }

    if (projectData.budget) {
      properties.Budget = {
        number: projectData.budget,
      };
    }

    if (projectData.startDate) {
      properties["Start Date"] = {
        date: { start: projectData.startDate },
      };
    }

    if (projectData.endDate) {
      properties["End Date"] = {
        date: { start: projectData.endDate },
      };
    }

    if (projectData.votes !== undefined) {
      properties.Votes = {
        number: projectData.votes,
      };
    }

    return properties;
  }

  /**
   * Fetch all events from the Notion events database
   * @returns {Promise<Array>} Array of event objects
   */
  async getEvents() {
    try {
      if (!NOTION_API_KEY || !NOTION_EVENTS_DATABASE_ID) {
        throw new Error("Notion API credentials not configured for events");
      }

      console.log(
        `Fetching events from database: ${NOTION_EVENTS_DATABASE_ID}`
      );

      const response = await notionClient
        .post(`databases/${NOTION_EVENTS_DATABASE_ID}/query`, {
          json: {
            page_size: 100,
          },
        })
        .json();

      if (!response.results || !Array.isArray(response.results)) {
        console.error("Invalid response format:", response);
        return [];
      }

      const events = response.results
        .map((page) => this.transformEventPage(page))
        .filter((event) => event !== null);

      console.log(`Successfully fetched ${events.length} events`);
      return events;
    } catch (error) {
      console.error("Error fetching events from Notion:", error);
      throw new Error(`Failed to fetch events: ${error.message}`);
    }
  }

  /**
   * Transform a Notion page into an event object
   * @param {Object} page - Notion page object
   * @returns {Object|null} Event object or null if invalid
   */
  transformEventPage(page) {
    try {
      const props = page.properties;

      // Extract event data with safe property access
      const event = {
        id: page.id,
        title: this.extractTitle(
          props.Title || props.Name || props.title || props.name
        ),
        description: this.extractRichText(
          props.Description || props.description
        ),
        type: this.extractSelectProperty(props.Type || props.type) || "event",
        date: this.extractDateProperty(props.Date || props.date),
        time: this.extractRichText(props.Time || props.time) || "",
        location: this.extractRichText(props.Location || props.location) || "",
        isOnline:
          this.extractCheckboxProperty(
            props.IsOnline || props.isOnline || props.is_online
          ) || false,
        capacity: this.extractNumberProperty(props.Capacity || props.capacity),
        registered:
          this.extractNumberProperty(props.Registered || props.registered) || 0,
        isFeatured:
          this.extractCheckboxProperty(
            props.Featured || props.featured || props.is_featured
          ) || false,
        status:
          this.extractSelectProperty(props.Status || props.status) ||
          "upcoming",
        createdTime: page.created_time,
        lastEditedTime: page.last_edited_time,
        url: page.url,
      };

      // Validate required fields
      if (!event.title || !event.date) {
        console.warn("Event missing required fields (title or date):", event);
        return null;
      }

      return event;
    } catch (error) {
      console.error("Error transforming event page:", error);
      return null;
    }
  }

  /**
   * Extract checkbox property value
   * @param {Object} property - Notion checkbox property
   * @returns {boolean} Checkbox value
   */
  extractCheckboxProperty(property) {
    if (!property || property.type !== "checkbox") {
      return false;
    }
    return property.checkbox || false;
  }

  /**
   * Extract date property value
   * @param {Object} property - Notion date property
   * @returns {string|null} Date string or null
   */
  extractDateProperty(property) {
    if (!property || property.type !== "date" || !property.date) {
      return null;
    }
    return property.date.start;
  }
}

export default new NotionService();
