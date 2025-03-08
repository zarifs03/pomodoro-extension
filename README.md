# 🍅 Pomodoro Timer Chrome Extension

A beautiful and functional Pomodoro Timer extension for Chrome that helps you stay productive with the Pomodoro Technique. Features a modern, dark-themed UI with smooth animations and state persistence.

## ✨ Features

- **Beautiful Dark Theme UI** with gradient backgrounds and glassmorphism effects
- **Persistent Timer State** - continues running even when popup is closed
- **Customizable Time Intervals** for:
  - Work sessions (default: 25 minutes)
  - Short breaks (default: 5 minutes)
  - Long breaks (default: 15 minutes)
- **Automatic Break Cycles**:
  - Short breaks after each work session
  - Long break after 4 work sessions
- **Visual Feedback**:
  - Different colors for work/break modes
  - Dynamic status messages
  - Session counter
- **Chrome Notifications** when sessions complete
- **Settings Persistence** across browser sessions

## 🚀 Installation

### Local Development
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/pomodoro-ext.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the extension directory

### Chrome Web Store
*(Coming soon)*

## 🎯 How to Use

1. Click the extension icon in your Chrome toolbar
2. Set your preferred time intervals in the settings (optional)
3. Click "Start" to begin your work session
4. Work until the timer completes
5. Take a break when notified
6. Repeat!

The extension will automatically:
- Switch between work and break modes
- Track your Pomodoro count
- Notify you when it's time to switch modes

## 🛠️ Technical Details

Built with:
- HTML5
- CSS3 (with modern features like CSS Variables, Flexbox)
- Vanilla JavaScript
- Chrome Extension APIs

Key Chrome APIs used:
- `chrome.storage` - For persistent settings and state
- `chrome.alarms` - For accurate background timing
- `chrome.notifications` - For session completion alerts

## 🎨 Color Scheme

The extension uses a carefully chosen color palette:
- Work mode: Red-Orange gradient (`#FF4B6C` to `#FF8C42`)
- Short break: Teal gradient (`#00C2A8` to `#01E2C9`)
- Long break: Purple gradient (`#6C63FF` to `#8F87FF`)
- Background: Dark navy gradient (`#2B2D42` to `#1A1B2E`)

## 📦 Project Structure

```
pomodoro-ext/
├── manifest.json      # Extension configuration
├── popup.html        # Main UI
├── popup.js          # UI logic
├── background.js     # Background service worker
├── styles.css        # Styling
└── images/          # Icons directory
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by the Pomodoro Technique by Francesco Cirillo
- UI design inspired by modern glassmorphism trends 