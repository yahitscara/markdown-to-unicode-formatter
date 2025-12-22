// Markdown to Unicode Formatter
// Wrapper module for markdown parsing and conversion

import { toBold, toItalic, toBoldItalic } from './unicodeMaps.js';

export class MarkdownFormatter {
    /**
     * Convert markdown formatted text to Unicode styled text
     * @param {string} text - Markdown text to format
     * @returns {string} - Unicode formatted text
     */
    format(text) {
        if (!text) return '';

        let result = text;

        // Process headers (remove # symbols and make bold)
        result = result.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, content) => {
            return toBold(content);
        });

        // Process bold italic (***text*** or ___text___)
        // Must come before bold and italic processing
        result = result.replace(/\*\*\*(.+?)\*\*\*/g, (match, content) => toBoldItalic(content));
        result = result.replace(/___(.+?)___/g, (match, content) => toBoldItalic(content));

        // Process bold (**text** or __text__)
        result = result.replace(/\*\*(.+?)\*\*/g, (match, content) => toBold(content));
        result = result.replace(/__(.+?)__/g, (match, content) => toBold(content));

        // Process italic (*text* or _text_)
        result = result.replace(/\*(.+?)\*/g, (match, content) => toItalic(content));
        result = result.replace(/_(.+?)_/g, (match, content) => toItalic(content));

        return result;
    }

    /**
     * Get character count from text
     * @param {string} text - Text to count
     * @returns {number} - Character count
     */
    getCharCount(text) {
        return text ? text.length : 0;
    }

    /**
     * Get word count from text
     * @param {string} text - Text to count
     * @returns {number} - Word count
     */
    getWordCount(text) {
        return text ? text.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
    }
}
