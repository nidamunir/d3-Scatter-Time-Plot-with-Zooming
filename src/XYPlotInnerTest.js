// lib
import React from "react";
import ReactTooltip from "react-tooltip";

export default function XYPlotInner({
  width,
  height,
  margin,
  innerHeight,
  innerWidth,
  xAxisLabel,
  yAxisLabel,
  data,
  tooltipFormatter,
  x,
  y
}) {
  return (
    <React.Fragment>
      <ReactTooltip multiline type="light" effect="float" html />

      <div id="scatterPlotSvg">
        <div className="legend">
          <svg className="scatter" width={width} height={height}>
            <g transform={"translate(" + margin.left + "," + margin.top + ")"}>
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
