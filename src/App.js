import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import { Toggle, Modal } from "./utils";
import ScatterPlot from "./ScatterPlot";
import Brush from "./Brush";
export class App extends React.Component {
  state = {
    screenWidth: 1000,
    screenHeight: 500,
    hover: "none",
    brushExtent: [0, 40]
  };
  onBrush = d => {
    console.log("onBrush", d);
    this.setState({ brushExtent: d });
  };
  render() {
    return (
      <div className="App">
        {/* test comment */}

        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        {/* <Toggle>
          {(on, toggle) => (
            <React.Fragment>
              <button onClick={toggle}>Show/Hide</button>
              <Modal on={on} toggle={toggle}>
                <h1>Hello</h1>
              </Modal>
            </React.Fragment>
          )}
        </Toggle> */}
        {/* <D3Test /> */}
        {/* <Brush
            changeBrush={this.onBrush}
            size={[this.state.screenWidth, 50]}
          /> */}
        <ScatterPlot />
      </div>
    );
  }
}

export default App;
