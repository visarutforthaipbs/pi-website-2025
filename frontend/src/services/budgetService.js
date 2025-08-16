class BudgetService {
  constructor() {
    this.availableYears = ["2568"]; // Will expand as more years are added
    this.budgetCache = new Map();
  }

  /**
   * Get list of available budget years
   * @returns {string[]} Array of available years
   */
  getAvailableYears() {
    return [...this.availableYears];
  }

  /**
   * Parse CSV text to budget data
   * @param {string} csvText - Raw CSV content
   * @returns {Object} Parsed budget data with items and summary
   */
  parseBudgetCSV(csvText) {
    const lines = csvText.trim().split("\n");
    const headers = lines[0].split(",");

    const budgetItems = [];
    let totalBudget = 0;
    const categoryTotals = {};
    const budgetTypeTotals = {};

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i]);

      if (values.length >= 5) {
        const item = {
          id: values[0]?.trim(),
          description: values[1]?.trim(),
          category: values[2]?.trim(),
          budgetCode: values[3]?.trim(),
          amount: parseInt(values[4]?.trim() || "0", 10),
        };

        budgetItems.push(item);
        totalBudget += item.amount;

        // Calculate category totals
        if (!categoryTotals[item.category]) {
          categoryTotals[item.category] = 0;
        }
        categoryTotals[item.category] += item.amount;

        // Calculate budget type totals (from budget code)
        const budgetType = this.getBudgetType(item.budgetCode);
        if (!budgetTypeTotals[budgetType]) {
          budgetTypeTotals[budgetType] = 0;
        }
        budgetTypeTotals[budgetType] += item.amount;
      }
    }

    return {
      items: budgetItems,
      summary: {
        totalBudget,
        itemCount: budgetItems.length,
        categoryTotals,
        budgetTypeTotals,
        averagePerItem: Math.round(totalBudget / budgetItems.length),
      },
    };
  }

  /**
   * Parse a CSV line handling commas within quoted fields
   * @param {string} line - CSV line
   * @returns {string[]} Array of values
   */
  parseCSVLine(line) {
    const result = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(current);
        current = "";
      } else {
        current += char;
      }
    }

    result.push(current);
    return result;
  }

  /**
   * Determine budget type from budget code
   * @param {string} budgetCode - Budget code
   * @returns {string} Budget type in Thai
   */
  getBudgetType(budgetCode) {
    if (budgetCode.includes("225-")) {
      return "งบดำเนินการ";
    } else if (budgetCode.includes("325-")) {
      return "งบผลิตและจัดหารายการ";
    } else if (budgetCode.includes("425-")) {
      return "งบลงทุน";
    } else {
      return "อื่นๆ";
    }
  }

  /**
   * Load budget data for a specific year
   * @param {string} year - Buddhist year (e.g., '2568')
   * @returns {Promise<Object>} Budget data object
   */
  async loadBudgetData(year) {
    // Check cache first
    if (this.budgetCache.has(year)) {
      return this.budgetCache.get(year);
    }

    try {
      // Map year to correct filename
      const filename = this.getFilenameForYear(year);
      const response = await fetch(`/budget/${year}/${filename}`);

      if (!response.ok) {
        throw new Error(
          `Failed to load budget data for year ${year}: ${response.status}`
        );
      }

      const csvText = await response.text();
      const budgetData = this.parseBudgetCSV(csvText);

      // Add year info
      budgetData.year = year;
      budgetData.yearAD = this.convertToAD(year);

      // Cache the result
      this.budgetCache.set(year, budgetData);

      return budgetData;
    } catch (error) {
      console.error(`Error loading budget data for year ${year}:`, error);
      throw new Error(`ไม่สามารถโหลดข้อมูลงบประมาณปี ${year} ได้`);
    }
  }

  /**
   * Get filename for a specific year
   * @param {string} year - Buddhist year
   * @returns {string} Filename
   */
  getFilenameForYear(year) {
    const mapping = {
      2568: "pi-budget-68.csv",
      2567: "pi-budget-67.csv",
      2569: "pi-budget-69.csv",
      2570: "pi-budget-70.csv",
    };
    return mapping[year] || `pi-budget-${year.slice(-2)}.csv`;
  }

  /**
   * Convert Buddhist year to AD
   * @param {string} buddhistYear - Buddhist year
   * @returns {string} AD year
   */
  convertToAD(buddhistYear) {
    return (parseInt(buddhistYear) - 543).toString();
  }

  /**
   * Format currency in Thai format
   * @param {number} amount - Amount in baht
   * @returns {string} Formatted currency string
   */
  formatCurrency(amount) {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  /**
   * Format large numbers with Thai abbreviations
   * @param {number} number - Number to format
   * @returns {string} Formatted number with abbreviation
   */
  formatLargeNumber(number) {
    if (number >= 1000000) {
      return `${(number / 1000000).toFixed(1)} ล้าน`;
    } else if (number >= 1000) {
      return `${(number / 1000).toFixed(1)} พัน`;
    }
    return number.toString();
  }

  /**
   * Get category icon
   * @param {string} category - Category name
   * @returns {string} Emoji icon
   */
  getCategoryIcon(category) {
    const iconMap = {
      งบดำเนินการ: "💼",
      งบผลิตและจัดหารายการ: "🎬",
      งบลงทุน: "🏗️",
      อื่นๆ: "📋",
    };
    return iconMap[category] || "📊";
  }

  /**
   * Get category color
   * @param {string} category - Category name
   * @returns {string} Color scheme name for Chakra UI
   */
  getCategoryColor(category) {
    const colorMap = {
      งบดำเนินการ: "blue",
      งบผลิตและจัดหารายการ: "orange",
      งบลงทุน: "green",
      อื่นๆ: "gray",
    };
    return colorMap[category] || "gray";
  }

  /**
   * Search budget items
   * @param {Object[]} items - Budget items
   * @param {string} query - Search query
   * @returns {Object[]} Filtered items
   */
  searchItems(items, query) {
    if (!query.trim()) return items;

    const lowerQuery = query.toLowerCase();
    return items.filter(
      (item) =>
        item.description.toLowerCase().includes(lowerQuery) ||
        item.id.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Sort items by different criteria
   * @param {Object[]} items - Budget items
   * @param {string} sortBy - Sort criteria: 'amount-desc', 'amount-asc', 'name-asc', 'category'
   * @returns {Object[]} Sorted items
   */
  sortItems(items, sortBy) {
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case "amount-desc":
          return b.amount - a.amount;
        case "amount-asc":
          return a.amount - b.amount;
        case "name-asc":
          return a.description.localeCompare(b.description, "th");
        case "category":
          return a.category.localeCompare(b.category, "th");
        default:
          return 0;
      }
    });
  }
}

export default new BudgetService();
