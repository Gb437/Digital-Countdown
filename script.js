document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resetBtn = document.getElementById("resetBtn");
  const hoursInput = document.getElementById("hours");
  const minutesInput = document.getElementById("minutes");
  const secondsInput = document.getElementById("seconds");
  const display = document.getElementById("countdown");

  let timer = null;
  let remaining = 0;
  let isPaused = false;

  function formatTime(totalSeconds) {
    if (totalSeconds < 0) totalSeconds = 0;
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  }

  function updateDisplay(totalSeconds) {
    display.textContent = formatTime(totalSeconds);
  }

  startBtn.addEventListener("click", () => {
    // read inputs (safe fallback to 0)
    const h = parseInt(hoursInput.value, 10) || 0;
    const m = parseInt(minutesInput.value, 10) || 0;
    const s = parseInt(secondsInput.value, 10) || 0;

    const totalSeconds = h * 3600 + m * 60 + s;
    if (totalSeconds <= 0) {
      display.textContent = "Enter a valid time";
      return;
    }

    remaining = totalSeconds;
    isPaused = false;
    clearInterval(timer);
    updateDisplay(remaining);

    timer = setInterval(() => {
      if (!isPaused) {
        remaining--;
        if (remaining <= 0) {
          clearInterval(timer);
          timer = null;
          display.textContent = "Time is up!!";
          return;
        }
        updateDisplay(remaining);
      }
    }, 1000);
  });

  pauseBtn.addEventListener("click", () => {
    if (!timer) return; // nothing running
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "Resume" : "Pause";
  });

  resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    isPaused = false;
    remaining = 0;
    updateDisplay(0);
    pauseBtn.textContent = "Pause";
  });

  // init display
  updateDisplay(0);
});
