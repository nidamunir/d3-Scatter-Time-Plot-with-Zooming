// lib
import React from "react";
import { anomalies } from "./anomalies";
import moment from "moment";
// src

// style
import "./App.css";
import { XYPlot } from "./XYPlot/index";

const byteToGigaByte = n => {
  return n / Math.pow(10, 9);
};

export const mapAnomalyData = anomalyData => {
  return anomalyData.reduce((acc, current) => {
    const { timestamp, bytes, anomaly } = current;
    acc.push({
      x: moment(timestamp).toDate(),
      y: byteToGigaByte(bytes),
      color: anomaly ? "red" : "blue"
    });
    return acc;
  }, []);
};

export class App extends React.Component {
  render() {
    const data = mapAnomalyData(anomalies);
    return (
      <div className="App">
        <XYPlot
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
      </div>
    );
  }
}

export default App;
