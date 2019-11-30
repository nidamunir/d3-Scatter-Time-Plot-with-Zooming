// lib
import React from "react";

// src
import { ScatterPlot } from "./ScatterPlot";

// style
import "./App.css";

export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ScatterPlot />
      </div>
    );
  }
}

export default App;
