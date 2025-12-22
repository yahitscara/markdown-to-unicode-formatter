// Main Application Entry Point
// Initializes and coordinates all modules

import { MarkdownFormatter } from './modules/formatter.js';
import { UIController } from './modules/uiController.js';
import { ThemeManager } from './modules/themeManager.js';
import { ClipboardManager } from './modules/clipboard.js';
import { StorageManager } from './modules/storage.js';

class App {
    constructor() {
        this.formatter = null;
        this.ui = null;
        this.themeManager = null;
        this.clipboard = null;
        this.storage = null;
    }

    /**
     * Initialize the application
     */
    initialize() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    /**
     * Start the application
     */
    start() {
        try {
            // Gather DOM elements
            const elements = this.gatherElements();

            // Initialize managers
            this.storage = new StorageManager();
            this.clipboard = new ClipboardManager();
            this.formatter = new MarkdownFormatter();
            this.themeManager = new ThemeManager(this.storage);
            this.ui = new UIController(elements, this.formatter, this.clipboard, this.storage);

            // Initialize theme detection
            this.themeManager.initialize();

            // Set up theme toggle button
            elements.themeToggle.addEventListener('click', () => {
                this.themeManager.toggleTheme();
            });

            // Initialize UI
            this.ui.initialize();

            console.log('Markdown to Unicode Formatter initialized successfully');
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.showError();
        }
    }

    /**
     * Gather all required DOM elements
     * @returns {Object} - Object containing all DOM elements
     */
    gatherElements() {
        const elements = {
            inputTextarea: document.getElementById('input'),
            outputTextarea: document.getElementById('output'),
            copyButton: document.getElementById('copy-btn'),
            themeToggle: document.getElementById('theme-toggle'),
            charCount: document.getElementById('input-count'),
            toastContainer: document.getElementById('toast-container')
        };

        // Validate that all elements exist
        for (const [key, element] of Object.entries(elements)) {
            if (!element) {
                throw new Error(`Required element not found: ${key}`);
            }
        }

        return elements;
    }

    /**
     * Show error message to user
     */
    showError() {
        const errorMessage = document.createElement('div');
        errorMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fee2e2;
            color: #991b1b;
            padding: 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            text-align: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        `;
        errorMessage.innerHTML = `
            <h2 style="margin-bottom: 0.5rem;">Initialization Error</h2>
            <p>Failed to load the application. Please refresh the page.</p>
        `;
        document.body.appendChild(errorMessage);
    }
}

// Create and initialize the application
const app = new App();
app.initialize();
