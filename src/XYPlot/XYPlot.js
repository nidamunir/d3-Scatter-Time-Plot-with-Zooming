// lib
import React, { Component } from "react";
import { scaleLinear, scaleTime } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { select, selectAll, event } from "d3-selection";
import { timeFormat } from "d3-time-format";
import { brush } from "d3-brush";
import { extent } from "d3-array";
import ReactTooltip from "react-tooltip";

// src
import { multiFormat, formatTooltip } from "./utils";

const margin = {
  top: 10,
  right: 20,
  bottom: 50,
  left: 50
};

export class XYPlot extends Component {
  state = {
    idleDelay: 350,
    idleTimeout: null,
    x: scaleTime().range([0, 600]),
    y: scaleLinear().range([600, 0])
  };

  componentDidMount() {
    const { width, height, tickFormat, data } = this.props;

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
    select(this.refs.xAxis).call(xAxis);
    select(this.refs.yAxis).call(yAxis);
    select(this.refs.brush).call(brush().on("end", this.brushended));

    this.setState({ x, y, xAxis, yAxis });
  }

  brushended = () => {
    let { idleTimeout, idleDelay, x, y, xAxis, yAxis } = this.state;
    const { data } = this.props;
    const { selection } = event;
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
      select(".brush").call(brush().move, null);
    }

    // Zooming
    const t = select("svg")
      .transition()
      .duration(750);
    select(".axis--x")
      .transition(t)
      .call(xAxis);
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
    const {
      width,
      height,
      data,
      yAxisLabel,
      xAxisLabel,
      tooltipFormatter = formatTooltip
    } = this.props;
    const { x, y } = this.state;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    return (
      <React.Fragment>
        <ReactTooltip multiline type="light" effect="float" html />

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
                >
                  <text
                    className="x-label"
                    textAnchor="middle"
                    fill="black"
                    transform={"translate(" + innerWidth / 2 + ", " + 35 + ")"}
                  >
                    {xAxisLabel}
                  </text>
                </g>
                <g className={["axis", "axis--y"].join(" ")} ref="yAxis">
                  <text
                    className="y-label"
                    textAnchor="middle"
                    fill="black"
                    transform={
                      "translate(" +
                      -30 +
                      ", " +
                      innerHeight / 2 +
                      ") rotate(-90)"
                    }
                  >
                    {yAxisLabel}
                  </text>
                </g>
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
                      data-tip={tooltipFormatter(d)}
                      style={{ fill: d.color }}
                    ></circle>
                  ))}
                </g>
              </g>
            </svg>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
