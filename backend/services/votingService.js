import { getDatabase } from "../config/database.js";
import { ObjectId } from "mongodb";

class VotingService {
  constructor() {
    this.collectionName = "projects_voting";
  }

  async getProjectVotes(projectId) {
    try {
      const db = getDatabase();
      const collection = db.collection(this.collectionName);

      const voteDoc = await collection.findOne({ projectId });

      return {
        count: voteDoc ? voteDoc.voters.length : 0,
        voters: voteDoc ? new Set(voteDoc.voters) : new Set(),
      };
    } catch (error) {
      console.error("Error getting project votes:", error);
      throw error;
    }
  }

  async hasUserVoted(projectId, userIP) {
    try {
      const db = getDatabase();
      const collection = db.collection(this.collectionName);

      const voteDoc = await collection.findOne({
        projectId,
        voters: userIP,
      });

      return voteDoc !== null;
    } catch (error) {
      console.error("Error checking if user voted:", error);
      throw error;
    }
  }

  async submitVote(projectId, userIP) {
    try {
      const db = getDatabase();
      const collection = db.collection(this.collectionName);

      // Check if user already voted
      const hasVoted = await this.hasUserVoted(projectId, userIP);
      if (hasVoted) {
        return {
          success: false,
          message: "You have already voted for this project",
        };
      }

      // Add vote
      await collection.updateOne(
        { projectId },
        {
          $addToSet: { voters: userIP },
          $setOnInsert: {
            projectId,
            createdAt: new Date(),
          },
          $set: { updatedAt: new Date() },
        },
        { upsert: true }
      );

      return {
        success: true,
        message: "Vote submitted successfully",
      };
    } catch (error) {
      console.error("Error submitting vote:", error);
      throw error;
    }
  }

  async getAllVotes() {
    try {
      const db = getDatabase();
      const collection = db.collection(this.collectionName);

      const voteDocs = await collection.find({}).toArray();

      const votes = {};
      voteDocs.forEach((doc) => {
        votes[doc.projectId] = {
          count: doc.voters.length,
          voters: new Set(doc.voters),
        };
      });

      return votes;
    } catch (error) {
      console.error("Error getting all votes:", error);
      throw error;
    }
  }

  async getVoteStats() {
    try {
      const db = getDatabase();
      const collection = db.collection(this.collectionName);

      const stats = await collection
        .aggregate([
          {
            $group: {
              _id: null,
              totalProjects: { $sum: 1 },
              totalVotes: { $sum: { $size: "$voters" } },
            },
          },
        ])
        .toArray();

      return stats[0] || { totalProjects: 0, totalVotes: 0 };
    } catch (error) {
      console.error("Error getting vote stats:", error);
      throw error;
    }
  }
}

export default new VotingService();
