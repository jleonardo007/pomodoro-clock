import React from "react";

const Session = ({ sessionLength, click }) => {
  return (
    <div className="session-section">
      <h2 id="session-label">Session Period</h2>
      <p id="session-length">{sessionLength}</p>
      <div className="session-buttons">
        <i
          id="session-decrement"
          className="fas fa-arrow-alt-circle-down"
          onClick={click}
        ></i>
        <i
          id="session-increment"
          className="fas fa-arrow-alt-circle-up"
          onClick={click}
        ></i>
      </div>
    </div>
  );
};

const Break = ({ breakLength, click }) => {
  return (
    <div className="break-section">
      <h2 id="break-label">Break Period</h2>
      <p id="break-length">{breakLength}</p>
      <div className="break-buttons">
        <i
          id="break-decrement"
          className="fas fa-arrow-alt-circle-down"
          onClick={click}
        ></i>
        <i
          id="break-increment"
          className="fas fa-arrow-alt-circle-up"
          onClick={click}
        ></i>
      </div>
    </div>
  );
};

const Timer = ({ min, sec, end, paused, ending, click }) => {
  return (
    <div className="timer-section">
      <h3 id="timer-label">{end ? "Break Period" : "Session Period"}</h3>
      <p id="time-left" className={ending ? "timer-ending" : null}>
        {`${min < 10 ? "0" + min : min}:${
          sec < 10 ? "0" + sec : sec === 60 ? "00" : sec
        }`}
      </p>
      <div className="timer-buttons">
        <i
          id="start_stop"
          className={paused ? "fas fa-play" : "fas fa-pause"}
          onClick={click}
        ></i>
        <i id="reset" className="fas fa-redo-alt" onClick={click}></i>
      </div>
    </div>
  );
};

class PomodoroApp extends React.Component {
  
  getTimerState() {
    const {
      minutes,
      seconds,
      isPaused,
      sessionEnd,
      alarm
    } = this.props;
    return { minutes, seconds, isPaused, sessionEnd, alarm };
  }

  alarm = () => {
    const beep = document.getElementById("beep");
    beep.play();
  };

  handleClick = e => {
    const target = e.target;
    const {
      sessionLength,
      breakLength,
      isPaused,
    } = this.props;
    let timer = null;

    if (target.id !== "start_stop" && target.id !== "reset" && isPaused)
      this.props.setPeriod(target, sessionLength, breakLength);
    else {
      switch (target.id) {
        case "reset":
          this.props.reset();
          const beep = document.getElementById("beep");
          beep.pause();
          beep.currentTime = 0;
          break;

        case "start_stop":
          timer = setInterval(() => {
            const {
              minutes,
              seconds,
              isPaused,
              sessionEnd,
              alarm
            } = this.getTimerState();

            if (alarm) this.alarm();
            if (!isPaused)
              this.props.turnOnTimer(
                minutes,
                seconds,
                sessionLength,
                breakLength,
                sessionEnd
              );
            else clearInterval(timer);
          }, 1000);
          this.props.stopTimer(isPaused);
          break;
      }
    }
  };

  render() {
    const {
      sessionLength,
      breakLength,
      sessionEnd,
      isPaused,
      isTimerEnding
    } = this.props;
    const { minutes, seconds } = this.props;
    return (
      <div id="pomodoro-clock">
        <h1 id="title">
          React Pomodoro Clock <i className="fas fa-stopwatch"></i>
        </h1>
        <Session sessionLength={sessionLength} click={this.handleClick} />
        <Break breakLength={breakLength} click={this.handleClick} />
        <Timer
          min={minutes}
          sec={seconds}
          end={sessionEnd}
          paused={isPaused}
          ending={isTimerEnding}
          click={this.handleClick}
        />
        <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" />
      </div>
    );
  }
}

export default PomodoroApp;
