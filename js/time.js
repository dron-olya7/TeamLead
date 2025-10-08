let totalSeconds = 30 * 60; // 30 минут

function updateTimer() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  $("#minutes").text(minutes.toString().padStart(2, "0"));
  $("#seconds").text(seconds.toString().padStart(2, "0"));

  if (totalSeconds <= 60) {
    $(".timer").addClass("warning");
  }
  if (totalSeconds <= 10) {
    $(".timer").addClass("critical");
  }

  totalSeconds--;

  if (totalSeconds < 0) {
    clearInterval(timerInterval);
    $(".timer").addClass("expired");
    $("#minutes").text("00");
    $("#seconds").text("00");
  }
}

updateTimer();
const timerInterval = setInterval(updateTimer, 1000);
