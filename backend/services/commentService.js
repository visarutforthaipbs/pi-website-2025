import { getDatabase } from "../config/database.js";
import { ObjectId } from "mongodb";

class CommentService {
  constructor() {
    this.collectionName = "project_comments";
  }

  async getProjectComments(projectId) {
    try {
      const db = getDatabase();
      const collection = db.collection(this.collectionName);

      const comments = await collection
        .find({ projectId })
        .sort({ createdAt: -1 })
        .toArray();

      return comments;
    } catch (error) {
      console.error("Error getting project comments:", error);
      throw error;
    }
  }

  async addComment(projectId, comment, userIP, userName = "ผู้ใช้งาน") {
    try {
      const db = getDatabase();
      const collection = db.collection(this.collectionName);

      const commentDoc = {
        _id: new ObjectId(),
        projectId,
        comment: comment.trim(),
        userName,
        userIP,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0,
        likedBy: [],
      };

      await collection.insertOne(commentDoc);

      return {
        success: true,
        message: "Comment added successfully",
        comment: commentDoc,
      };
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  }

  async likeComment(commentId, userIP) {
    try {
      const db = getDatabase();
      const collection = db.collection(this.collectionName);

      const comment = await collection.findOne({
        _id: new ObjectId(commentId),
      });

      if (!comment) {
        return { success: false, message: "Comment not found" };
      }

      const hasLiked = comment.likedBy?.includes(userIP);

      if (hasLiked) {
        // Unlike
        await collection.updateOne(
          { _id: new ObjectId(commentId) },
          {
            $pull: { likedBy: userIP },
            $inc: { likes: -1 },
            $set: { updatedAt: new Date() },
          }
        );
        return { success: true, message: "Comment unliked", action: "unliked" };
      } else {
        // Like
        await collection.updateOne(
          { _id: new ObjectId(commentId) },
          {
            $addToSet: { likedBy: userIP },
            $inc: { likes: 1 },
            $set: { updatedAt: new Date() },
          }
        );
        return { success: true, message: "Comment liked", action: "liked" };
      }
    } catch (error) {
      console.error("Error liking comment:", error);
      throw error;
    }
  }

  async getCommentCount(projectId) {
    try {
      const db = getDatabase();
      const collection = db.collection(this.collectionName);

      const count = await collection.countDocuments({ projectId });
      return count;
    } catch (error) {
      console.error("Error getting comment count:", error);
      return 0;
    }
  }

  async getAllCommentStats() {
    try {
      const db = getDatabase();
      const collection = db.collection(this.collectionName);

      const pipeline = [
        {
          $group: {
            _id: "$projectId",
            commentCount: { $sum: 1 },
            latestComment: { $max: "$createdAt" },
          },
        },
      ];

      const stats = await collection.aggregate(pipeline).toArray();

      const result = {};
      stats.forEach((stat) => {
        result[stat._id] = {
          count: stat.commentCount,
          latestComment: stat.latestComment,
        };
      });

      return result;
    } catch (error) {
      console.error("Error getting comment stats:", error);
      return {};
    }
  }
}

export default new CommentService();
