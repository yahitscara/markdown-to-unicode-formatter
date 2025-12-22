// Storage Manager
// Handles LocalStorage operations for user preferences

export class StorageManager {
    constructor() {
        this.THEME_KEY = 'markdown-formatter-theme';
        this.HISTORY_KEY = 'markdown-formatter-history';
        this.MAX_HISTORY = 10;
    }

    /**
     * Save theme preference
     * @param {string} theme - Theme name ('light' or 'dark')
     */
    saveThemePreference(theme) {
        try {
            localStorage.setItem(this.THEME_KEY, theme);
        } catch (error) {
            console.error('Failed to save theme preference:', error);
        }
    }

    /**
     * Get saved theme preference
     * @returns {string|null} - Saved theme or null
     */
    getThemePreference() {
        try {
            return localStorage.getItem(this.THEME_KEY);
        } catch (error) {
            console.error('Failed to get theme preference:', error);
            return null;
        }
    }

    /**
     * Save conversion to history
     * @param {string} markdown - Original markdown text
     * @param {string} unicode - Converted unicode text
     */
    saveToHistory(markdown, unicode) {
        try {
            const history = this.getHistory();
            const entry = {
                markdown,
                unicode,
                timestamp: Date.now()
            };

            history.unshift(entry);

            // Keep only the most recent entries
            const trimmedHistory = history.slice(0, this.MAX_HISTORY);

            localStorage.setItem(this.HISTORY_KEY, JSON.stringify(trimmedHistory));
        } catch (error) {
            console.error('Failed to save to history:', error);
        }
    }

    /**
     * Get conversion history
     * @returns {Array} - Array of history entries
     */
    getHistory() {
        try {
            const historyJson = localStorage.getItem(this.HISTORY_KEY);
            return historyJson ? JSON.parse(historyJson) : [];
        } catch (error) {
            console.error('Failed to get history:', error);
            return [];
        }
    }

    /**
     * Clear all history
     */
    clearHistory() {
        try {
            localStorage.removeItem(this.HISTORY_KEY);
        } catch (error) {
            console.error('Failed to clear history:', error);
        }
    }

    /**
     * Check if LocalStorage is available
     * @returns {boolean} - Availability status
     */
    isAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }
}
