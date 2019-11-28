import React from "react";
import * as d3 from "d3";

// var svg = d3.select("svg"),
//   width = +svg.attr("width"),
//   height = +svg.attr("height");

// var k = height / width,
//   x0 = [-4.5, 4.5],
//   y0 = [-4.5 * k, 4.5 * k],
//   x = d3
//     .scaleLinear()
//     .domain(x0)
//     .range([0, width]),
//   y = d3
//     .scaleLinear()
//     .domain(y0)
//     .range([height, 0]),
//   z = d3.scaleOrdinal(d3.schemeCategory10);

// var xAxis = d3.axisTop(x).ticks(12),
//   yAxis = d3.axisRight(y).ticks((12 * height) / width);

// var brush = d3.brush().on("end", brushended),
//   idleTimeout,
//   idleDelay = 350;

// svg
//   .selectAll("circle")
//   .data(points)
//   .enter()
//   .append("circle")
//   .attr("cx", function(d) {
//     return x(d[0]);
//   })
//   .attr("cy", function(d) {
//     return y(d[1]);
//   })
//   .attr("r", 2.5)
//   .attr("fill", function(d) {
//     return z(d[2]);
//   });

// svg
//   .append("g")
//   .attr("class", "axis axis--x")
//   .attr("transform", "translate(0," + (height - 10) + ")")
//   .call(xAxis);

// svg
//   .append("g")
//   .attr("class", "axis axis--y")
//   .attr("transform", "translate(10,0)")
//   .call(yAxis);

// svg.selectAll(".domain").style("display", "none");

// svg
//   .append("g")
//   .attr("class", "brush")
//   .call(brush);

// function brushended() {
//   var s = d3.event.selection;
//   if (!s) {
//     if (!idleTimeout) return (idleTimeout = setTimeout(idled, idleDelay));
//     x.domain(x0);
//     y.domain(y0);
//   } else {
//     x.domain([s[0][0], s[1][0]].map(x.invert, x));
//     y.domain([s[1][1], s[0][1]].map(y.invert, y));
//     svg.select(".brush").call(brush.move, null);
//   }
//   zoom();
// }

// function idled() {
//   idleTimeout = null;
// }

// function zoom() {
//   var t = svg.transition().duration(750);
//   svg
//     .select(".axis--x")
//     .transition(t)
//     .call(xAxis);
//   svg
//     .select(".axis--y")
//     .transition(t)
//     .call(yAxis);
//   svg
//     .selectAll("circle")
//     .transition(t)
//     .attr("cx", function(d) {
//       return x(d[0]);
//     })
//     .attr("cy", function(d) {
//       return y(d[1]);
//     });
// }
export default function ScatterPlot() {
  //   const random = d3.randomNormal(0, 0.2);
  //   const sqrt3 = Math.sqrt(3);
  //   const points0 = d3.range(300).map(function() {
  //     return [random() + sqrt3, random() + 1, 0];
  //   });
  //   const points1 = d3.range(300).map(function() {
  //     return [random() - sqrt3, random() + 1, 1];
  //   });
  //   const points2 = d3.range(300).map(function() {
  //       return [random(), random() - 1, 2];
  //     }),
  //     points = d3.merge([points0, points1, points2]);
  //   const width = "960",
  //     height = "600";
  //   const k = height / width;
  //   const x0 = [-4.5, 4.5];
  //   const y0 = [-4.5 * k, 4.5 * k];
  //   const x = d3
  //     .scaleLinear()
  //     .domain(x0)
  //     .range([0, width]);
  //   const y = d3
  //     .scaleLinear()
  //     .domain(y0)
  //     .range([height, 0]);
  //   const z = d3.scaleOrdinal(d3.schemeCategory10);

  //   const xAxis = d3.axisTop(x).ticks(12);
  //   const yAxis = d3.axisRight(y).ticks((12 * height) / width);

  //   //   const brush = d3.brush().on("end", brushended);
  //   const idleTimeout = null;
  //   const idleDelay = 350;
  //   console.log("points", points);
  //   // svg
  //   .append("g")
  //   .attr("class", "axis axis--x")
  //   .attr("transform", "translate(0," + (height - 10) + ")")
  //   .call(xAxis);
  // svg
  //   .append("g")
  //   .attr("class", "axis axis--y")
  //   .attr("transform", "translate(10,0)")
  //   .call(yAxis);

  // svg.selectAll(".domain").style("display", "none");

  // svg
  //   .append("g")
  //   .attr("class", "brush")
  //   .call(brush);
  const margin = { top: 20, right: 15, bottom: 60, left: 60 };
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;
  const data = [
    [0, 3],
    [5, 13],
    [10, 22],
    [15, 36],
    [20, 48],
    [25, 59],
    [30, 77],
    [35, 85],
    [40, 95],
    [45, 105],
    [50, 120],
    [55, 150],
    [60, 147],
    [65, 168],
    [70, 176],
    [75, 188],
    [80, 199],
    [85, 213],
    [90, 222],
    [95, 236],
    [100, 249]
  ];
  const x = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function(d) {
        return d[0];
      })
    ])
    .range([0, width]);

  const y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function(d) {
        return d[1];
      })
    ])
    .range([height, 0]);
  return (
    <div>
      <h3> Scatter Plot with Trend Line </h3>
      <svg
        width={width + margin.right + margin.left}
        height={height + margin.top + margin.bottom}
        className="chart"
      >
        <g
          transform={"translate(" + margin.left + "," + margin.top + ")"}
          width={width}
          height={height}
          className="main"
        >
          <RenderCircles data={data} scale={{ x, y }} />
          <TrendLine data={data} scale={{ x, y }} />
          <Axis
            axis="x"
            transform={"translate(0," + height + ")"}
            scale={d3.axisBottom().scale(x)}
          />
          <Axis
            axis="y"
            transform="translate(0,0)"
            scale={d3.axisLeft().scale(y)}
          />
        </g>
      </svg>
    </div>
  );
}
class Axis extends React.Component {
  componentDidMount() {
    const node = this.refs[this.props.axis];
    d3.select(node).call(this.props.scale);
  }

  render() {
    return (
      <g
        className="main axis date"
        transform={this.props.transform}
        ref={this.props.axis}
      />
    );
  }
}
class RenderCircles extends React.Component {
  render() {
    let renderCircles = this.props.data.map((coords, i) => (
      <circle
        cx={this.props.scale.x(coords[0])}
        cy={this.props.scale.y(coords[1])}
        r="8"
        style={{ fill: "rgba(25, 158, 199, .9)" }}
        key={i}
      />
    ));
    return <g>{renderCircles}</g>;
  }
}

function sortNumber(a, b) {
  return a - b;
}

class TrendLine extends React.Component {
  render() {
    let x_coords = this.props.data.map(n => {
      return n[0];
    });
    let y_coords = this.props.data.map(n => {
      return n[1];
    });
    const trendline = linearRegression(y_coords, x_coords);

    // Lowest and highest x coordinates to draw a plot line
    const lowest_x = x_coords.sort(sortNumber)[0];
    const hightest_x = x_coords.sort(sortNumber)[x_coords.length - 1];
    const trendline_points = [
      [lowest_x, trendline(lowest_x)],
      [hightest_x, trendline(hightest_x)]
    ];

    return (
      <line
        x1={this.props.scale.x(trendline_points[0][0])}
        y1={this.props.scale.y(trendline_points[0][1])}
        x2={this.props.scale.x(trendline_points[1][0])}
        y2={this.props.scale.y(trendline_points[1][1])}
        style={{ stroke: "black", strokeWidth: "2" }}
      />
    );
  }
}

function linearRegression(y, x) {
  var lr = {};
  var n = y.length;
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var sum_yy = 0;

  for (var i = 0; i < y.length; i++) {
    sum_x += x[i];
    sum_y += y[i];
    sum_xy += x[i] * y[i];
    sum_xx += x[i] * x[i];
    sum_yy += y[i] * y[i];
  }

  lr["slope"] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
  lr["intercept"] = (sum_y - lr.slope * sum_x) / n;
  lr["r2"] = Math.pow(
    (n * sum_xy - sum_x * sum_y) /
      Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)),
    2
  );

  return x => {
    return lr.slope * x + lr.intercept;
  };
}
