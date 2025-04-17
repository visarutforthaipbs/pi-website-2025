// Word Cloud Service
// This service handles word cloud data using Strapi backend with localStorage as fallback
import axios from "axios";
import { API_URL, isUsingMockApi } from "../config.js";

// This is the Strapi endpoint for our Word collection
const WORDS_ENDPOINT = `${API_URL}/api/wordclouds`;

// Use localStorage as backup storage when the API is not available
const initializeLocalStorage = () => {
  if (!localStorage.getItem("wordCloudData")) {
    // Initialize with some sample words for a better initial experience
    const sampleWords = [
      { text: "การศึกษา", value: 30 },
      { text: "สิ่งแวดล้อม", value: 25 },
      { text: "เศรษฐกิจ", value: 20 },
      { text: "สุขภาพ", value: 35 },
      { text: "คมนาคม", value: 15 },
      { text: "ความเหลื่อมล้ำ", value: 40 },
      { text: "การเมือง", value: 22 },
      { text: "วัฒนธรรม", value: 18 },
    ];
    localStorage.setItem("wordCloudData", JSON.stringify(sampleWords));
  }
};

// Get all words
export const getAllWords = async () => {
  initializeLocalStorage();

  if (isUsingMockApi) {
    // Return local data with a simulated delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const words = JSON.parse(localStorage.getItem("wordCloudData"));
        resolve(words);
      }, 300);
    });
  } else {
    try {
      console.log("Fetching words from Strapi API endpoint:", WORDS_ENDPOINT);
      const response = await axios.get(WORDS_ENDPOINT);
      console.log("Strapi API Full Response:", response);

      // Transform the data from Strapi's format
      if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        const transformedWords = response.data.data.map((item) => ({
          text: item.text,
          value: item.value,
        }));
        console.log("Transformed words data:", transformedWords);
        return transformedWords;
      } else {
        console.warn("Unexpected API response format:", response.data);
        // Return empty array if data format is unexpected
        return [];
      }
    } catch (error) {
      console.error("Failed to fetch words from API:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        endpoint: WORDS_ENDPOINT,
      });

      // Fallback to local storage if API fails
      console.log("Falling back to localStorage data");
      return JSON.parse(localStorage.getItem("wordCloudData"));
    }
  }
};

// Add or update a word
export const addOrUpdateWord = async (text, value = 10) => {
  initializeLocalStorage();

  if (isUsingMockApi) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const words = JSON.parse(localStorage.getItem("wordCloudData"));
        const existingWordIndex = words.findIndex((word) => word.text === text);

        if (existingWordIndex >= 0) {
          // Update existing word
          words[existingWordIndex].value += 5;
        } else {
          // Add new word
          words.push({ text, value });
        }

        localStorage.setItem("wordCloudData", JSON.stringify(words));
        resolve(words);
      }, 300);
    });
  } else {
    try {
      console.log(`Adding/updating word "${text}" with value ${value}`);

      // Use our custom controller endpoint for creating/updating words
      await axios.post(`${WORDS_ENDPOINT}`, {
        data: {
          text: text,
          value: value,
        },
      });

      console.log("Successfully added/updated word in Strapi");

      // Fetch all words after successful update
      return getAllWords();
    } catch (error) {
      console.error("Failed to add/update word in API:", error);

      // Fallback to local storage if API fails
      console.log("Falling back to localStorage for adding/updating word");
      const words = JSON.parse(localStorage.getItem("wordCloudData"));
      const existingWordIndex = words.findIndex((word) => word.text === text);

      if (existingWordIndex >= 0) {
        words[existingWordIndex].value += 5;
      } else {
        words.push({ text, value });
      }

      localStorage.setItem("wordCloudData", JSON.stringify(words));
      return words;
    }
  }
};
