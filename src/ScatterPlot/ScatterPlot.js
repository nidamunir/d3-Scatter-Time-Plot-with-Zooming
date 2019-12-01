// lib
import React, { Component } from "react";
import moment from "moment";

// src
import ScatterPlotInner from "./ScatterPlotInner2";
import { mapAnomalyData } from "./utils";
import { anomalies } from "../anomalies";

export default class ScatterPlot extends Component {
  render() {
    const data = mapAnomalyData(anomalies);
    return (
      <React.Fragment>
        <ScatterPlotInner
          data={data}
          width={1000}
          height={600}
          // tickFormat="%b %d, %y"
          yAxisLabel="GB"
          xAxisLabel="Date"
          tooltipFormatter={d =>
            `<div>
            <span>${moment(d.x).format("MMM DD YYYY, hh:mma")}</span></br>
            <span>${d.y.toFixed(2)} GB</span>
          </div>`
          }
        />
      </React.Fragment>
    );
  }
}
