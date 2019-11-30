// lib
import React, { Component } from "react";
import ReactTooltip from "react-tooltip";

// src
import ScatterPlotInner from "./ScatterPlotInner2";
import { mapAnomalyData } from "./utils";
import { anomalies } from "../anomalies";

export default class ScatterPlot extends Component {
  // componentDidUpdate() {
  //   ReactTooltip.rebuild();
  // }
  render() {
    const data = mapAnomalyData(anomalies);
    return (
      <React.Fragment>
        <ReactTooltip
        //   id="tooltip"
        //   getContent={datumAsText => {
        //     console.log("text", datumAsText);
        //     if (datumAsText == null) {
        //       return;
        //     }
        //     let d = JSON.parse(datumAsText);
        //     return (
        //       <div>
        //         <p>ID: {d.id}</p>
        //         <p>Category: {d.category}</p>
        //       </div>
        //     );
        //   }}
        />
        <ScatterPlotInner
          data={data}
          width={1000}
          height={600}
          // tickFormat="%b %d, %y"
        />
      </React.Fragment>
    );
  }
}
