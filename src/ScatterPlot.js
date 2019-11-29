import React, { Component } from "react";
import ScatterPlotInner from "./ScatterPlotInner";
import { anomalies } from "./anomalies";
import * as moment from "moment";

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

export default class ScatterPlot extends Component {
  render() {
    const data = mapAnomalyData(anomalies);
    return (
      <ScatterPlotInner
        data={data}
        width={1000}
        height={600}
        tickFormat="%b %d, %y"
      />
    );
  }
}
