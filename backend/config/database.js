import { MongoClient } from "mongodb";

let db = null;
let client = null;

export async function connectToDatabase() {
  if (db) return db;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("pi_website");
    console.log("✅ Connected to MongoDB Atlas");
    return db;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }
}

export async function initializeDatabase() {
  try {
    const database = await connectToDatabase();

    // Create collections if they don't exist
    const collections = await database.listCollections().toArray();
    const collectionNames = collections.map((col) => col.name);

    if (!collectionNames.includes("wordcloud")) {
      await database.createCollection("wordcloud");
      console.log("✅ Created wordcloud collection");
    }

    if (!collectionNames.includes("projects_voting")) {
      await database.createCollection("projects_voting");
      console.log("✅ Created projects_voting collection");
    }

    return database;
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    throw error;
  }
}

export function getDatabase() {
  if (!db) {
    throw new Error(
      "Database not initialized. Call connectToDatabase() first."
    );
  }
  return db;
}

export async function closeConnection() {
  if (client) {
    await client.close();
    db = null;
    client = null;
    console.log("✅ Closed MongoDB connection");
  }
}
