// lib
import React, { Component } from "react";
import * as d3 from "d3";
import { scaleLinear, scaleTime } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { select, selectAll } from "d3-selection";
import { timeFormat } from "d3-time-format";
import { extent } from "d3-array";

// src
import { multiFormat } from "./utils";

const margin = {
  top: 10,
  right: 20,
  bottom: 50,
  left: 50
};

// const getAxes = (width, height, tickFormat) => {
//   const innerWidth = width - margin.left - margin.right;
//   const innerHeight = height - margin.top - margin.bottom;
//   var x = scaleTime().range([0, innerWidth]);
//   var y = scaleLinear().range([innerHeight, 0]);
//   var xAxis = axisBottom(x).tickFormat(
//     tickFormat ? timeFormat(tickFormat) : multiFormat
//   );
//   var yAxis = axisLeft(y);
//   return { x, y, xAxis, yAxis };
// };

export default class ScatterPlotInner extends Component {
  state = {
    idleDelay: 350,
    idleTimeout: null,
    x: scaleTime().range([0, 600]),
    y: scaleLinear().range([600, 0])
  };

  componentDidMount() {
    console.log("did mount");
    const { width, height, tickFormat, data } = this.props;
    // const { x, y, xAxis, yAxis } = getAxes(width, height, tickFormat);
    const brush = d3.brush().on("end", this.brushended);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const x = scaleTime().range([0, innerWidth]);
    const y = scaleLinear().range([innerHeight, 0]);
    const xAxis = axisBottom(x).tickFormat(
      tickFormat ? timeFormat(tickFormat) : multiFormat
    );
    const yAxis = axisLeft(y);
    x.domain(extent(data, d => d.x)).nice();
    y.domain(extent(data, d => d.y)).nice();

    selectAll("circle").data(data);
    select(this.refs.xAxis)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-40)");
    d3.select(this.refs.yAxis).call(yAxis);
    select(this.refs.brush).call(brush);

    this.setState({ x, y, xAxis, yAxis });
  }

  brushended = () => {
    let { idleTimeout, idleDelay, x, y, xAxis, yAxis } = this.state;
    const { data } = this.props;
    const {
      event: { selection }
    } = d3;
    if (!selection) {
      if (!idleTimeout) {
        this.setState({
          idleTimeout: setTimeout(() => {
            this.setState({ idleTimeout: null });
          }, idleDelay)
        });
        return;
      }
      x.domain(extent(data, d => d.x));
      y.domain(extent(data, d => d.y));
    } else {
      x.domain([selection[0][0], selection[1][0]].map(x.invert, x));
      y.domain([selection[1][1], selection[0][1]].map(y.invert, y));
      select(".brush").call(d3.brush().move, null);
    }

    // Zooming
    const t = select("svg")
      .transition()
      .duration(750);
    select(".axis--x")
      .transition(t)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-40)");
    select(".axis--y")
      .transition(t)
      .call(yAxis);
    selectAll("circle")
      .transition(t)
      .attr("cx", function(d) {
        return x(d.x);
      })
      .attr("cy", function(d) {
        return y(d.y);
      });
  };

  render() {
    console.log("render");
    const { width, height, data } = this.props;
    const { x, y } = this.state;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    return (
      <div>
        <div id="scatterPlotSvg">
          <div className="legend">
            <svg className="scatter" width={width} height={height}>
              <g
                transform={"translate(" + margin.left + "," + margin.top + ")"}
              >
                <g
                  className={["axis", "axis--x"].join(" ")}
                  transform={"translate(0," + innerHeight + ")"}
                  ref="xAxis"
                  //   ref={node => select(node).call(axisLeft(y))}
                ></g>
                {/* call(xAxis) .selectAll("text") .attr("transform", "rotate(-40)"); //
          .style("text-anchor", "start"); */}
                <g
                  // transform={"translate(" + innerHeight + ", 0)"}
                  className={["axis", "axis--y"].join(" ")}
                  ref="yAxis"
                  // call yaxis
                ></g>
                {/* svg .append("g") .attr("class", "brush") .call(brush) .append("g")
              .attr("transform",); */}
                <g className="brush" ref="brush">
                  <g
                    transform={
                      "translate(" + margin.left + "," + margin.top + ")"
                    }
                  ></g>
                </g>

                <defs>
                  <clipPath id="clip">
                    <rect width={innerWidth} height={innerHeight}></rect>
                  </clipPath>
                </defs>
                <g clip-path="url(#clip)">
                  {data.map(d => (
                    <circle
                      className="dot"
                      r={5}
                      cx={x(d.x)}
                      cy={y(d.y)}
                      data-tip={d.x}
                      style={{ fill: d.color }}
                    ></circle>
                  ))}
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
