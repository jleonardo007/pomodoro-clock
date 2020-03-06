import types from "./types";

const initialState = {
  sessionLength: 25,
  breakLength: 5,
  isPaused: true,
  isTimerEnding: false,
  sessionEnd: false,
  alarm: false,
  minutes: 25,
  seconds: 0
};

const pomodoroReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RESET:
      return { ...initialState };

    case types.STOP_TIMER:
      return {
        ...state,
        isPaused: action.paused
      };

    case types.SET_PERIOD:
      return {
        ...state,
        sessionLength: action.sessionPeriod,
        breakLength: action.breakPeriod,
        minutes: action.sessionPeriod
      };

    case types.START_TIMER:
      return {
        ...state,
        minutes: action.minutesLeft,
        seconds: action.secondsLeft,
        isTimerEnding: action.ending,
        sessionEnd: action.end,
        alarm: action.beep
      };

    default:
      return state;
  }
};

export default pomodoroReducer;
