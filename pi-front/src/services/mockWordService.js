// Mock Word Service - simulates API calls for word cloud data during development
// Uses localStorage to persist data between page reloads

// Initial mock data
const initialWords = [
  { text: "การศึกษา", value: 64 },
  { text: "สิ่งแวดล้อม", value: 42 },
  { text: "สุขภาพ", value: 50 },
  { text: "การจราจร", value: 35 },
  { text: "ความเหลื่อมล้ำ", value: 58 },
  { text: "ค่าครองชีพ", value: 70 },
  { text: "การมีส่วนร่วม", value: 30 },
  { text: "คอร์รัปชัน", value: 45 },
  { text: "ที่อยู่อาศัย", value: 25 },
  { text: "น้ำท่วม", value: 20 },
];

// Initialize localStorage with mock data if empty
const initializeLocalStorage = () => {
  if (!localStorage.getItem("wordCloudData")) {
    localStorage.setItem("wordCloudData", JSON.stringify(initialWords));
  }
};

// Get all words
export const getAllWords = async () => {
  // Initialize localStorage if needed
  initializeLocalStorage();

  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const words = JSON.parse(localStorage.getItem("wordCloudData"));
      resolve(words);
    }, 300);
  });
};

// Add a new word or update an existing one
export const addOrUpdateWord = async (text, value = 10) => {
  // Initialize localStorage if needed
  initializeLocalStorage();

  // Simulate API call delay
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

      // Save updated words to localStorage
      localStorage.setItem("wordCloudData", JSON.stringify(words));
      resolve(words);
    }, 300);
  });
};
