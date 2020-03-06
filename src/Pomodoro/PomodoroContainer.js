import { connect } from "react-redux";
import actions from "./Duck/actions";
import PomodoroComponent from "./PomodoroComponent";

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  const reset = () => {
    dispatch(actions.reset());
  };

  const stopTimer = paused => {
    dispatch(actions.stopTimer(paused));
  };

  const setPeriod = (target, sessionPeriod, breakPeriod) => {
    dispatch(actions.setPeriod(target, sessionPeriod, breakPeriod));
  };

  const turnOnTimer = (minutes,
    seconds,
    sessionPeriod,
    breakPeriod,
    sessionEnd) => {
    dispatch(
      actions.turnOnTimer(
        minutes,
        seconds,
        sessionPeriod,
        breakPeriod,
        sessionEnd
      )
    );
  };

  return {
    reset,
    stopTimer,
    setPeriod,
    turnOnTimer
  };
};

const PomodoroContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PomodoroComponent);
export default PomodoroContainer;
