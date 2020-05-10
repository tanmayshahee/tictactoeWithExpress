import React from "react";
import ReactDOM from "react-dom";
import App from "./game/App";
import { Provider } from "react-redux";
import { getStore } from "./store/store";

ReactDOM.render(
  <Provider store={getStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
