import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.min.css";
import PomodoroApp from "./Pomodoro/PomodoroContainer";

import pomodoroReducer from "./Pomodoro/Duck/reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";

const store = createStore(pomodoroReducer);

ReactDOM.render(
  <Provider store={store}>
    <PomodoroApp />
  </Provider>,
  document.getElementById("root")
);
