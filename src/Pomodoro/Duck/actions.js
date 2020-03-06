import types from "./types";

const reset = () => {
  return {
    type: types.RESET
  };
};

const stopTimer = paused => {
  return {
    type: types.STOP_TIMER,
    paused: !paused
  };
};

const setPeriod = (target, sessionPeriod, breakPeriod) => {
  if (target.id === "session-decrement" && sessionPeriod > 1) sessionPeriod--;
  if (target.id === "session-increment" && sessionPeriod < 60) sessionPeriod++;
  if (target.id === "break-decrement" && breakPeriod > 1) breakPeriod--;
  if (target.id === "break-increment" && breakPeriod < 60) breakPeriod++;

  return {
    type: types.SET_PERIOD,
    sessionPeriod,
    breakPeriod
  };
};

//Variables in turnOnTimer function
let secondsLeft = 0;
let minutesLeft = 0;

const turnOnTimer = (
  minutes,
  seconds,
  sessionPeriod,
  breakPeriod,
  sessionEnd
) => {
  let sessionEndingTime =
    sessionPeriod < 5 ? 1 : Math.floor(sessionPeriod * 0.2);
  let breakEndingTime = breakPeriod < 5 ? 1 : Math.floor(breakPeriod * 0.2);

  if (secondsLeft >= 0 && secondsLeft <= 59) {
    minutesLeft = minutes;
    secondsLeft = seconds - 1;
  }

  if (secondsLeft < 0) {
    minutesLeft = minutes - 1;
    secondsLeft = 59;
  }

  if (minutesLeft < 0 && !sessionEnd) {
    minutesLeft = breakPeriod;
    secondsLeft = 0;
    sessionEnd = true;
  }

  if (minutesLeft < 0 && sessionEnd) {
    minutesLeft = sessionPeriod;
    secondsLeft = 0;
    sessionEnd = false;
  }

  let beep = minutesLeft === 0 && secondsLeft === 0 ? true : false;

  if (minutesLeft < sessionEndingTime || minutesLeft < breakEndingTime) {
    return {
      type: types.START_TIMER,
      minutesLeft,
      secondsLeft,
      ending: true,
      end: sessionEnd,
      beep
    };
  } else {
    return {
      type: types.START_TIMER,
      minutesLeft,
      secondsLeft,
      ending: false,
      end: sessionEnd,
      beep
    };
  }
};

export default {
  reset,
  stopTimer,
  setPeriod,
  turnOnTimer
};
