import { getDatabase } from "../config/database.js";
import { ObjectId } from "mongodb";

class WordCloudService {
  constructor() {
    this.collectionName = "wordcloud";
  }

  async getAllWords() {
    try {
      const db = getDatabase();
      const collection = db.collection(this.collectionName);

      const words = await collection.find({}).sort({ value: -1 }).toArray();

      // Format the data to include proper IDs and ensure consistent structure
      return words.map((word) => ({
        id: word._id ? word._id.toString() : new ObjectId().toString(),
        text: word.text,
        value: word.value,
        createdAt: word.createdAt || new Date(),
        updatedAt: word.updatedAt || new Date(),
      }));
    } catch (error) {
      console.error("Error fetching all words:", error);
      throw error;
    }
  }

  async addOrUpdateWord(text) {
    try {
      const db = getDatabase();
      const collection = db.collection(this.collectionName);

      // Normalize the text (trim, lowercase for comparison)
      const normalizedText = text.trim();
      const searchText = normalizedText.toLowerCase();

      if (!normalizedText) {
        throw new Error("Text cannot be empty");
      }

      // Check if word already exists (case-insensitive)
      const existingWord = await collection.findOne({
        textLower: searchText,
      });

      if (existingWord) {
        // Update existing word by incrementing value
        const updatedWord = await collection.findOneAndUpdate(
          { _id: existingWord._id },
          {
            $inc: { value: 1 },
            $set: {
              updatedAt: new Date(),
              text: normalizedText, // Keep the original case from first submission
            },
          },
          { returnDocument: "after" }
        );

        return {
          id: updatedWord._id.toString(),
          text: updatedWord.text,
          value: updatedWord.value,
          isNew: false,
          createdAt: updatedWord.createdAt,
          updatedAt: updatedWord.updatedAt,
        };
      } else {
        // Create new word entry
        const newWord = {
          text: normalizedText,
          textLower: searchText,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const result = await collection.insertOne(newWord);

        return {
          id: result.insertedId.toString(),
          text: normalizedText,
          value: 1,
          isNew: true,
          createdAt: newWord.createdAt,
          updatedAt: newWord.updatedAt,
        };
      }
    } catch (error) {
      console.error("Error adding/updating word:", error);
      throw error;
    }
  }

  async getWordStats() {
    try {
      const db = getDatabase();
      const collection = db.collection(this.collectionName);

      const stats = await collection
        .aggregate([
          {
            $group: {
              _id: null,
              totalWords: { $sum: 1 },
              totalSubmissions: { $sum: "$value" },
              maxValue: { $max: "$value" },
              minValue: { $min: "$value" },
            },
          },
        ])
        .toArray();

      const result = stats[0] || {
        totalWords: 0,
        totalSubmissions: 0,
        maxValue: 0,
        minValue: 0,
      };

      // Get top words
      const topWords = await collection
        .find({})
        .sort({ value: -1 })
        .limit(10)
        .toArray();

      return {
        ...result,
        topWords: topWords.map((word) => ({
          text: word.text,
          value: word.value,
        })),
      };
    } catch (error) {
      console.error("Error getting word stats:", error);
      throw error;
    }
  }

  async deleteWord(wordId) {
    try {
      const db = getDatabase();
      const collection = db.collection(this.collectionName);

      const result = await collection.deleteOne({ _id: new ObjectId(wordId) });

      return result.deletedCount > 0;
    } catch (error) {
      console.error("Error deleting word:", error);
      throw error;
    }
  }

  async clearAllWords() {
    try {
      const db = getDatabase();
      const collection = db.collection(this.collectionName);

      const result = await collection.deleteMany({});

      return {
        success: true,
        deletedCount: result.deletedCount,
      };
    } catch (error) {
      console.error("Error clearing all words:", error);
      throw error;
    }
  }
}

export default new WordCloudService();
