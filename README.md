# Markdown to Unicode Formatter

Transform markdown formatting into Unicode text characters that work on LinkedIn, Twitter, Discord, and any platform that doesn't support native markdown.

## 🌐 Web App

**[Try it live](https://yahitscara.github.io/markdown-to-unicode-formatter)** - Open the web app in your browser!

## ✨ Features

- **Bold text**: `**text**` or `__text__` → 𝗯𝗼𝗹𝗱
- **Italic text**: `*text*` or `_text_` → 𝘪𝘵𝘢𝘭𝘪𝘤
- **Bold italic**: `***text***` or `___text___` → 𝙗𝙤𝙡𝙙 𝙞𝙩𝙖𝙡𝙞𝙘
- **Headers**: `# Header` → 𝗛𝗲𝗮𝗱𝗲𝗿 (strips # and makes bold)
- Real-time conversion as you type
- Dark mode with system preference auto-detection
- Copy to clipboard with one click
- Works with text from Word, Google Docs, and other apps
- Responsive design for mobile, tablet, and desktop

## 🚀 Usage

### Web Application (Recommended)

1. Open `index.html` in your browser
2. Type or paste markdown text in the input box
3. See the Unicode-formatted output instantly
4. Click "Copy" to copy to clipboard
5. Paste anywhere (LinkedIn, Twitter, Discord, etc.)

### Command Line (Legacy)

The CLI tool is still available for automation and scripting:

```bash
# Install dependencies (first time only)
npm install

# Read from file
node formatter.js example.md

# Pipe from stdin
echo "This is **bold** and *italic*" | node formatter.js

# Read from clipboard (auto-copies result back)
node formatter.js --clipboard

# Copy output to clipboard
node formatter.js input.md --copy
```

## 📁 Project Structure

```
markdown-to-unicode-formatter/
├── index.html              # Web app entry point
├── css/
│   ├── styles.css         # Main styles
│   └── themes.css         # Dark/light mode themes
├── js/
│   ├── app.js             # Application initialization
│   └── modules/
│       ├── unicodeMaps.js    # Unicode character mappings
│       ├── formatter.js      # Markdown parsing
│       ├── uiController.js   # UI event handling
│       ├── themeManager.js   # Dark mode system
│       ├── clipboard.js      # Copy/paste functionality
│       └── storage.js        # LocalStorage management
├── formatter.js           # CLI tool (legacy)
└── README.md
```

## 🎯 Examples

### Input (markdown)
```markdown
# My Post

This is a **bold statement** about something important.

Here's some *italic text* to emphasize a point.

You can also use ***bold and italic together*** for maximum impact.
```

### Output (Unicode formatted)
```
𝗠𝘆 𝗣𝗼𝘀𝘁

This is a 𝗯𝗼𝗹𝗱 𝘀𝘁𝗮𝘁𝗲𝗺𝗲𝗻𝘁 about something important.

Here's some 𝘪𝘵𝘢𝘭𝘪𝘤 𝘵𝘦𝘹𝘵 to emphasize a point.

You can also use 𝙗𝙤𝙡𝙙 𝙖𝙣𝙙 𝙞𝙩𝙖𝙡𝙞𝙘 𝙩𝙤𝙜𝙚𝙩𝙝𝙚𝙧 for maximum impact.
```

## 🛠️ Development

The application is built with vanilla JavaScript (no frameworks required) for maximum compatibility and portability.

### Running Locally

Simply open `index.html` in a modern web browser. No build step required!

For development with live reload, you can use any static file server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 🌍 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## 🔮 Future Extensions

The modular architecture makes it easy to extend:

- **Browser Extension**: Import `formatter.js` and `unicodeMaps.js` directly
- **Mobile App**: Core conversion logic has zero dependencies
- **API Server**: Extract formatter as standalone npm package
- **VS Code Plugin**: Reuse the same conversion functions

## 📝 License

MIT

## 🙏 Contributing

Contributions welcome! Feel free to open issues or submit pull requests.

---

Made by [yahitscara](https://github.com/yahitscara)
