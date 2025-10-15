#!/usr/bin/env node

import { readFileSync } from 'fs';
import clipboard from 'clipboardy';
import { toBold, toItalic, toBoldItalic } from './unicode-maps.js';

function formatMarkdown(text) {
  let result = text;

  // Process headers (remove # symbols and optionally make bold)
  result = result.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, content) => {
    return toBold(content);
  });

  // Process bold italic (***text*** or ___text___)
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

async function main() {
  const args = process.argv.slice(2);
  let inputText = '';
  let shouldCopyToClipboard = false;

  // Parse arguments
  const hasClipboardFlag = args.includes('--clipboard') || args.includes('-c');
  const hasCopyFlag = args.includes('--copy') || args.includes('-o');
  const fileArg = args.find(arg => !arg.startsWith('-'));

  if (hasCopyFlag || hasClipboardFlag) {
    shouldCopyToClipboard = true;
  }

  // Determine input source
  if (hasClipboardFlag) {
    // Read from clipboard (and auto-copy result back)
    try {
      inputText = await clipboard.read();
    } catch (error) {
      console.error('Error reading from clipboard:', error.message);
      process.exit(1);
    }
  } else if (fileArg) {
    // Read from file
    try {
      inputText = readFileSync(fileArg, 'utf-8');
    } catch (error) {
      console.error('Error reading file:', error.message);
      process.exit(1);
    }
  } else {
    // Read from stdin (pipe)
    const chunks = [];
    for await (const chunk of process.stdin) {
      chunks.push(chunk);
    }
    if (chunks.length > 0) {
      inputText = Buffer.concat(chunks).toString('utf-8');
    } else {
      console.error('Usage: node formatter.js [--clipboard|-c] [--copy|-o] [file]');
      console.error('');
      console.error('Examples:');
      console.error('  node formatter.js input.md');
      console.error('  node formatter.js --clipboard --copy');
      console.error('  cat input.md | node formatter.js');
      console.error('  node formatter.js -c -o');
      process.exit(1);
    }
  }

  // Format the text
  const formatted = formatMarkdown(inputText);

  // Output
  if (shouldCopyToClipboard) {
    try {
      await clipboard.write(formatted);
      console.error('✓ Formatted text copied to clipboard');
    } catch (error) {
      console.error('Error writing to clipboard:', error.message);
      process.exit(1);
    }
  } else {
    console.log(formatted);
  }
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
