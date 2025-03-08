// Timer state
let timerState = {
  timeLeft: 25 * 60,
  isRunning: false,
  isPaused: false,
  currentMode: 'work',
  pomodoroCount: 0,
  totalPomodoros: 4,
  lastTimestamp: null
};

// Initialize timer state from storage
chrome.storage.local.get(['timerState'], (result) => {
  if (result.timerState) {
    timerState = result.timerState;
    if (timerState.isRunning && !timerState.isPaused) {
      // Resume timer if it was running
      const elapsedSeconds = Math.floor((Date.now() - timerState.lastTimestamp) / 1000);
      timerState.timeLeft = Math.max(0, timerState.timeLeft - elapsedSeconds);
      updateTimer();
    }
  }
});

function updateTimer() {
  if (!timerState.isRunning || timerState.isPaused) return;

  timerState.lastTimestamp = Date.now();
  
  // Save state
  chrome.storage.local.set({ timerState });

  if (timerState.timeLeft <= 0) {
    handleTimerComplete();
    return;
  }

  // Update every second
  chrome.alarms.create('pomodoroTick', {
    when: Date.now() + 1000
  });
}

function handleTimerComplete() {
  // Play notification
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'images/icon128.png',
    title: 'Pomodoro Timer',
    message: getNotificationMessage()
  });

  // Update mode and start next phase
  if (timerState.currentMode === 'work') {
    timerState.pomodoroCount++;
    if (timerState.pomodoroCount % timerState.totalPomodoros === 0) {
      timerState.currentMode = 'longBreak';
      setTimeLeft('longBreak');
    } else {
      timerState.currentMode = 'shortBreak';
      setTimeLeft('shortBreak');
    }
  } else {
    timerState.currentMode = 'work';
    setTimeLeft('work');
  }

  updateTimer();
}

function getNotificationMessage() {
  switch (timerState.currentMode) {
    case 'work':
      return 'Work session completed! Time for a break.';
    case 'shortBreak':
    case 'longBreak':
      return 'Break time is over. Ready to focus again?';
  }
}

function setTimeLeft(mode) {
  chrome.storage.sync.get(['workTime', 'shortBreak', 'longBreak'], (settings) => {
    switch (mode) {
      case 'work':
        timerState.timeLeft = (settings.workTime || 25) * 60;
        break;
      case 'shortBreak':
        timerState.timeLeft = (settings.shortBreak || 5) * 60;
        break;
      case 'longBreak':
        timerState.timeLeft = (settings.longBreak || 15) * 60;
        break;
    }
    chrome.storage.local.set({ timerState });
  });
}

// Listen for timer tick
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'pomodoroTick') {
    timerState.timeLeft--;
    updateTimer();
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'getState':
      sendResponse(timerState);
      break;
    case 'start':
      timerState.isRunning = true;
      timerState.isPaused = false;
      if (!request.resuming) {
        setTimeLeft(timerState.currentMode);
      }
      updateTimer();
      sendResponse(timerState);
      break;
    case 'pause':
      timerState.isPaused = true;
      chrome.storage.local.set({ timerState });
      sendResponse(timerState);
      break;
    case 'reset':
      timerState = {
        timeLeft: 25 * 60,
        isRunning: false,
        isPaused: false,
        currentMode: 'work',
        pomodoroCount: 0,
        totalPomodoros: 4,
        lastTimestamp: null
      };
      chrome.storage.local.set({ timerState });
      sendResponse(timerState);
      break;
  }
  return true;
}); 