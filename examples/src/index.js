import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import Main from "../../src";

class App extends PureComponent {
  render() {
    return <Main />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) module.hot.accept();
