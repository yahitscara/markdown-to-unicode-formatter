// Theme Manager
// Handles dark/light mode with system preference detection

export class ThemeManager {
    constructor(storage) {
        this.storage = storage;
        this.currentTheme = null;
        this.systemThemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    }

    /**
     * Initialize theme system
     */
    initialize() {
        // Check for saved preference first
        const savedTheme = this.storage.getThemePreference();

        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            // Use system preference
            this.useSystemPreference();
        }

        // Listen for system theme changes
        this.systemThemeMedia.addEventListener('change', (e) => {
            // Only auto-update if no manual preference is saved
            if (!this.storage.getThemePreference()) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    /**
     * Apply system theme preference
     */
    useSystemPreference() {
        const isDark = this.systemThemeMedia.matches;
        this.setTheme(isDark ? 'dark' : 'light');
    }

    /**
     * Set specific theme
     * @param {string} theme - Theme name ('light' or 'dark')
     */
    setTheme(theme) {
        this.currentTheme = theme;

        // Remove both classes first
        document.body.classList.remove('light-mode', 'dark-mode');

        // Add the appropriate class
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.add('light-mode');
        }
    }

    /**
     * Toggle between light and dark mode
     */
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        this.storage.saveThemePreference(newTheme);
    }

    /**
     * Get current theme
     * @returns {string} - Current theme ('light' or 'dark')
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Check if dark mode is active
     * @returns {boolean} - True if dark mode
     */
    isDarkMode() {
        return this.currentTheme === 'dark';
    }
}
