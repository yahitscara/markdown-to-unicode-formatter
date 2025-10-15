# LinkedIn Markdown Formatter

Convert markdown-style text to Unicode formatted text for platforms like LinkedIn that don't support markdown.

## Features

- **Bold text**: `**text**` or `__text__` → 𝗯𝗼𝗹𝗱
- **Italic text**: `*text*` or `_text_` → 𝘪𝘵𝘢𝘭𝘪𝘤
- **Bold italic**: `***text***` or `___text___` → 𝙗𝙤𝙡𝙙 𝙞𝙩𝙖𝙡𝙞𝙘
- **Headers**: `# Header` → 𝗛𝗲𝗮𝗱𝗲𝗿 (strips # and makes bold)
- Preserves line breaks and spacing

## Installation

```bash
npm install
```

## Usage

### Read from file and print to stdout

```bash
node formatter.js example.md
```

### Pipe from stdin

```bash
echo "This is **bold** and *italic*" | node formatter.js
cat input.md | node formatter.js
```

### Read from clipboard

```bash
node formatter.js --clipboard
# or short form:
node formatter.js -c
```

When reading from clipboard, the formatted result is **automatically copied back to the clipboard** for easy pasting into LinkedIn.

### Read from file and copy to clipboard

```bash
node formatter.js input.md --copy
# or short form:
node formatter.js input.md -o
```

## Examples

### Input (markdown)
```markdown
# My LinkedIn Post

This is a **bold statement** about something important.

Here's some *italic text* to emphasize a point.

You can also use ***bold and italic together*** for maximum impact.
```

### Output (Unicode formatted)
```
𝗠𝘆 𝗟𝗶𝗻𝗸𝗲𝗱𝗜𝗻 𝗣𝗼𝘀𝘁

This is a 𝗯𝗼𝗹𝗱 𝘀𝘁𝗮𝘁𝗲𝗺𝗲𝗻𝘁 about something important.

Here's some 𝘪𝘵𝘢𝘭𝘪𝘤 𝘵𝘦𝘹𝘵 to emphasize a point.

You can also use 𝙗𝙤𝙡𝙙 𝙖𝙣𝙙 𝙞𝙩𝙖𝙡𝙞𝙘 𝙩𝙤𝙜𝙚𝙩𝙝𝙚𝙧 for maximum impact.
```

## Common Workflows

### Quick clipboard workflow
1. Copy your markdown text to clipboard
2. Run: `node formatter.js -c`
3. The formatted text is now in your clipboard
4. Paste directly into LinkedIn

### File-based workflow
1. Write your post in a markdown file (e.g., `post.md`)
2. Run: `node formatter.js post.md --copy`
3. Paste into LinkedIn

## Command-line Options

| Option | Short | Description |
|--------|-------|-------------|
| `--clipboard` | `-c` | Read input from clipboard (auto-copies result back) |
| `--copy` | `-o` | Copy output to clipboard |

## License

MIT
