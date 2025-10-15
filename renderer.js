// Unicode character mappings
const boldMap = {
  'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛',
  'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣',
  'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫',
  'Y': '𝗬', 'Z': '𝗭',
  'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵',
  'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽',
  'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅',
  'y': '𝘆', 'z': '𝘇',
  '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳',
  '8': '𝟴', '9': '𝟵'
};

const italicMap = {
  'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏',
  'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗',
  'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟',
  'Y': '𝘠', 'Z': '𝘡',
  'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩',
  'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱',
  'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹',
  'y': '𝘺', 'z': '𝘻'
};

const boldItalicMap = {
  'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃',
  'I': '𝙄', 'J': '𝙅', 'K': '𝙆', 'L': '𝙇', 'M': '𝙈', 'N': '𝙉', 'O': '𝙊', 'P': '𝙋',
  'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏', 'U': '𝙐', 'V': '𝙑', 'W': '𝙒', 'X': '𝙓',
  'Y': '𝙔', 'Z': '𝙕',
  'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝',
  'i': '𝙞', 'j': '𝙟', 'k': '𝙠', 'l': '𝙡', 'm': '𝙢', 'n': '𝙣', 'o': '𝙤', 'p': '𝙥',
  'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩', 'u': '𝙪', 'v': '𝙫', 'w': '𝙬', 'x': '𝙭',
  'y': '𝙮', 'z': '𝙯'
};

function toBold(text) {
  return text.split('').map(char => boldMap[char] || char).join('');
}

function toItalic(text) {
  return text.split('').map(char => italicMap[char] || char).join('');
}

function toBoldItalic(text) {
  return text.split('').map(char => boldItalicMap[char] || char).join('');
}

function formatMarkdown(text) {
  let result = text;

  // Process headers
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

// DOM elements
const inputTextarea = document.getElementById('input');
const outputTextarea = document.getElementById('output');
const formatBtn = document.getElementById('formatBtn');
const pasteBtn = document.getElementById('pasteBtn');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const statusDiv = document.getElementById('status');

// Show status message
function showStatus(message, isSuccess = true) {
  statusDiv.textContent = message;
  statusDiv.className = `status ${isSuccess ? 'success' : 'error'}`;

  setTimeout(() => {
    statusDiv.style.display = 'none';
  }, 3000);
}

// Format button
formatBtn.addEventListener('click', () => {
  const input = inputTextarea.value;
  if (!input.trim()) {
    showStatus('Please enter some text to format', false);
    return;
  }

  const formatted = formatMarkdown(input);
  outputTextarea.value = formatted;
  showStatus('✓ Text formatted successfully!');
});

// Auto-format on input change (optional - real-time formatting)
inputTextarea.addEventListener('input', () => {
  if (inputTextarea.value.trim()) {
    outputTextarea.value = formatMarkdown(inputTextarea.value);
  } else {
    outputTextarea.value = '';
  }
});

// Paste from clipboard
pasteBtn.addEventListener('click', async () => {
  try {
    const text = await window.electronAPI.readClipboard();
    inputTextarea.value = text;
    outputTextarea.value = formatMarkdown(text);
    showStatus('✓ Pasted from clipboard');
  } catch (error) {
    showStatus('Failed to read from clipboard', false);
  }
});

// Copy to clipboard
copyBtn.addEventListener('click', async () => {
  const output = outputTextarea.value;
  if (!output.trim()) {
    showStatus('Nothing to copy', false);
    return;
  }

  try {
    await window.electronAPI.writeClipboard(output);
    showStatus('✓ Copied to clipboard!');
  } catch (error) {
    showStatus('Failed to copy to clipboard', false);
  }
});

// Clear button
clearBtn.addEventListener('click', () => {
  inputTextarea.value = '';
  outputTextarea.value = '';
  showStatus('✓ Cleared');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Cmd/Ctrl + Enter to format
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    e.preventDefault();
    formatBtn.click();
  }

  // Cmd/Ctrl + V to paste
  if ((e.metaKey || e.ctrlKey) && e.key === 'v' && !e.shiftKey) {
    if (document.activeElement !== inputTextarea) {
      e.preventDefault();
      pasteBtn.click();
    }
  }

  // Cmd/Ctrl + C to copy (when not in textarea)
  if ((e.metaKey || e.ctrlKey) && e.key === 'c' && document.activeElement !== inputTextarea && document.activeElement !== outputTextarea) {
    e.preventDefault();
    copyBtn.click();
  }
});
