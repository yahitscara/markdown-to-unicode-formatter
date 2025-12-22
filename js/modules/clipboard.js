// Clipboard Manager
// Handles copy/paste operations with fallback support

export class ClipboardManager {
    /**
     * Copy text to clipboard
     * @param {string} text - Text to copy
     * @returns {Promise<boolean>} - Success status
     */
    async copyToClipboard(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                // Use modern Clipboard API
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                // Fallback for older browsers or non-secure contexts
                return this.fallbackCopy(text);
            }
        } catch (error) {
            console.error('Copy failed:', error);
            return this.fallbackCopy(text);
        }
    }

    /**
     * Paste text from clipboard
     * @returns {Promise<string>} - Pasted text
     */
    async pasteFromClipboard() {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                // Use modern Clipboard API
                const text = await navigator.clipboard.readText();
                return text;
            } else {
                // Fallback not available for paste
                throw new Error('Clipboard paste not supported in this browser');
            }
        } catch (error) {
            console.error('Paste failed:', error);
            return '';
        }
    }

    /**
     * Fallback copy method for older browsers
     * @param {string} text - Text to copy
     * @returns {boolean} - Success status
     */
    fallbackCopy(text) {
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.left = '-999999px';
            textarea.style.top = '-999999px';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();

            const successful = document.execCommand('copy');
            document.body.removeChild(textarea);

            return successful;
        } catch (error) {
            console.error('Fallback copy failed:', error);
            return false;
        }
    }
}
