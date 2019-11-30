import React, { Component } from "react";
import ScatterPlotInner from "./ScatterPlotInner2";
import { anomalies } from "./anomalies";
import * as moment from "moment";
import ReactTooltip from "react-tooltip";

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
  componentDidUpdate() {
    ReactTooltip.rebuild();
  }
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
