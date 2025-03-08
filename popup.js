// DOM elements
const timerDisplay = document.getElementById('timer');
const statusDisplay = document.getElementById('status');
const cycleCountDisplay = document.getElementById('cycle-count');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const workTimeInput = document.getElementById('work-time');
const shortBreakInput = document.getElementById('short-break');
const longBreakInput = document.getElementById('long-break');

// Initialize
function initialize() {
  // Load saved settings if any
  chrome.storage.sync.get(['workTime', 'shortBreak', 'longBreak'], (result) => {
    if (result.workTime) workTimeInput.value = result.workTime;
    if (result.shortBreak) shortBreakInput.value = result.shortBreak;
    if (result.longBreak) longBreakInput.value = result.longBreak;
  });
  
  // Get current timer state
  chrome.runtime.sendMessage({ action: 'getState' }, (state) => {
    updateDisplay(state);
  });
}

// Save settings when changed
function saveSettings() {
  chrome.storage.sync.set({
    workTime: workTimeInput.value,
    shortBreak: shortBreakInput.value,
    longBreak: longBreakInput.value
  });
}

// Reset timer
function resetTimer() {
  chrome.runtime.sendMessage({ action: 'reset' }, (state) => {
    updateDisplay(state);
  });
}

// Start timer
function startTimer() {
  chrome.runtime.sendMessage({ action: 'start' }, (state) => {
    updateDisplay(state);
  });
}

// Pause timer
function pauseTimer() {
  chrome.runtime.sendMessage({ action: 'pause' }, (state) => {
    updateDisplay(state);
  });
}

// Update display based on state
function updateDisplay(state) {
  // Update timer display
  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Update cycle count
  cycleCountDisplay.textContent = `Pomodoro: ${state.pomodoroCount}/${state.totalPomodoros}`;
  
  // Update status and mode
  document.body.setAttribute('data-mode', state.currentMode);
  
  switch (state.currentMode) {
    case 'work':
      statusDisplay.textContent = state.isPaused ? 'Focus paused' : state.isRunning ? 'Focusing...' : 'Ready to focus';
      break;
    case 'shortBreak':
      statusDisplay.textContent = state.isPaused ? 'Break paused' : state.isRunning ? 'Short break time' : 'Ready for a short break';
      break;
    case 'longBreak':
      statusDisplay.textContent = state.isPaused ? 'Break paused' : state.isRunning ? 'Long break time' : 'Ready for a long break';
      break;
  }
  
  // Update button states
  startBtn.disabled = state.isRunning && !state.isPaused;
  pauseBtn.disabled = !state.isRunning || state.isPaused;
  
  // Update start button color based on mode
  startBtn.style.background = state.currentMode === 'work' ? 'var(--work-color)' :
                             state.currentMode === 'shortBreak' ? 'var(--short-break-color)' :
                             'var(--long-break-color)';
  
  // Disable settings when timer is running
  workTimeInput.disabled = state.isRunning;
  shortBreakInput.disabled = state.isRunning;
  longBreakInput.disabled = state.isRunning;
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

workTimeInput.addEventListener('change', saveSettings);
shortBreakInput.addEventListener('change', saveSettings);
longBreakInput.addEventListener('change', saveSettings);

// Update display periodically
setInterval(() => {
  chrome.runtime.sendMessage({ action: 'getState' }, (state) => {
    updateDisplay(state);
  });
}, 1000);

// Initialize on load
document.addEventListener('DOMContentLoaded', initialize);