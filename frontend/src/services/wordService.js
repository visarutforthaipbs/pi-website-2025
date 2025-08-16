import CONFIG from "../config.js";

class WordService {
  constructor() {
    this.baseURL = CONFIG.API_BASE_URL;
  }

  async getWords() {
    try {
      const response = await fetch(
        `${this.baseURL}${CONFIG.API_ENDPOINTS.WORD_CLOUD}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Transform to expected format
      return data.data.map((item) => ({
        text: item.attributes.text,
        value: item.attributes.value,
      }));
    } catch (error) {
      console.error("Error fetching words:", error);
      throw error;
    }
  }

  async submitWord(text) {
    try {
      const response = await fetch(
        `${this.baseURL}${CONFIG.API_ENDPOINTS.WORD_CLOUD}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error submitting word:", error);
      throw error;
    }
  }
}

export default new WordService();
