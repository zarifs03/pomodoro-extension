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

