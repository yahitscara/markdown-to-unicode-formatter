// UI Controller
// Handles DOM events and UI updates

export class UIController {
    constructor(elements, formatter, clipboard, storage) {
        this.elements = elements;
        this.formatter = formatter;
        this.clipboard = clipboard;
        this.storage = storage;
    }

    /**
     * Initialize UI event listeners
     */
    initialize() {
        // Real-time formatting on input
        this.elements.inputTextarea.addEventListener('input', this.onInput.bind(this));

        // Copy button
        this.elements.copyButton.addEventListener('click', this.onCopy.bind(this));

        // Update initial state
        this.updateCharCount();
    }

    /**
     * Handle input event - real-time formatting
     * @param {Event} event - Input event
     */
    onInput(event) {
        const markdown = event.target.value;
        const unicode = this.formatter.format(markdown);

        this.elements.outputTextarea.value = unicode;
        this.updateCharCount();

        // Optionally save to history (commented out to avoid spam)
        // if (markdown.trim() && unicode.trim()) {
        //     this.storage.saveToHistory(markdown, unicode);
        // }
    }

    /**
     * Handle copy button click
     */
    async onCopy() {
        const text = this.elements.outputTextarea.value;

        if (!text.trim()) {
            this.showToast('Nothing to copy!');
            return;
        }

        const success = await this.clipboard.copyToClipboard(text);

        if (success) {
            this.showToast('Copied to clipboard!');
            this.showCopySuccess();
        } else {
            this.showToast('Failed to copy');
        }
    }

    /**
     * Update character count display
     */
    updateCharCount() {
        const count = this.formatter.getCharCount(this.elements.inputTextarea.value);
        this.elements.charCount.textContent = `${count} character${count !== 1 ? 's' : ''}`;
    }

    /**
     * Show copy success state on button
     */
    showCopySuccess() {
        this.elements.copyButton.classList.add('copied');

        setTimeout(() => {
            this.elements.copyButton.classList.remove('copied');
        }, 2000);
    }

    /**
     * Show toast notification
     * @param {string} message - Message to display
     */
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;

        this.elements.toastContainer.appendChild(toast);

        // Auto-remove after animation completes
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    /**
     * Set input text programmatically
     * @param {string} text - Text to set
     */
    setInput(text) {
        this.elements.inputTextarea.value = text;
        this.onInput({ target: this.elements.inputTextarea });
    }

    /**
     * Clear all text
     */
    clear() {
        this.elements.inputTextarea.value = '';
        this.elements.outputTextarea.value = '';
        this.updateCharCount();
    }
}
