import React from "react";
import * as d3 from "d3";

export default class ScatterPlot2 extends React.Component {
  state = {
    idleTimeout: null,
    idleDelay: 350,
    k: 600 / 960,
    width: 960,
    height: 600,
    x0: [-4.5, 4.5],
    y0: [(-4.5 * 600) / 960, (4.5 * 600) / 960],
    x: d3
      .scaleLinear()
      .domain([-4.5, 4.5])
      .range([0, 960]),
    y: d3
      .scaleLinear()
      .domain([(-4.5 * 600) / 960, (4.5 * 600) / 960])
      .range([600, 0]),
    z: d3.scaleOrdinal(d3.schemeCategory10)
  };
  componentDidMount() {
    const xAxis = d3.axisTop(this.state.x).ticks(12),
      yAxis = d3
        .axisRight(this.state.y)
        .ticks((12 * this.state.height) / this.state.width);
    d3.select("svg")
      .selectAll(".domain")
      .style("display", "none");

    d3.select("svg")
      .append("g")
      .attr("class", "brush")
      .call(this.brush);
    // d3.select("g.brush").call(this.brush());
    this.setState({
      x: d3
        .scaleLinear()
        .domain(this.state.x0)
        .range([0, 960]),
      y: d3
        .scaleLinear()
        .domain(this.state.y0)
        .range([600, 0]),
      z: d3.scaleOrdinal(d3.schemeCategory10)
    });
    d3.select("g.axis-x").call(xAxis);
    d3.select("g.axis-y").call(yAxis);
  }

  brush = d3.brush().on("end", () => this.brushended());

  brushended = () => {
    console.log("in brush ended");
    let { idleTimeout, idleDelay, x0, y0, width, height, x, y, k } = this.state;

    var s = d3.event.selection;
    if (!s) {
      console.log("s null");
      if (!idleTimeout) {
        console.log("returning");
        return (idleTimeout = setTimeout(this.idled(), idleDelay));
      }
      x.domain(x0);
      y.domain(y0);
    } else {
      console.log("s not null");
      x.domain([s[0][0], s[1][0]].map(x.invert, x));
      y.domain([s[1][1], s[0][1]].map(y.invert, y));
      d3.select(".brush").call(this.brush.move, null);
    }
    this.zoom();
  };

  idled = () => {
    this.setState({ idleTimeout: null });
  };
  zoom = () => {
    let { idleTimeout, idleDelay, x0, y0, width, height, x, y, k } = this.state;
    const points = this.getPoints();

    console.log("zooming");
    const xAxis = d3.axisTop(x).ticks(12),
      yAxis = d3.axisRight(y).ticks((12 * height) / width);
    var t = d3
      .select("svg")
      .transition()
      .duration(750);
    d3.select("svg")
      .select("g.axis-x")
      .transition(t)
      .call(xAxis);
    d3.select("svg")
      .select("g.axis-y")
      .transition(t)
      .call(yAxis);
    d3.select("svg")
      .selectAll("circle")
      .data(points)
      .transition(t)
      .attr("cx", function(d) {
        return x(d[0]);
      })
      .attr("cy", function(d) {
        return y(d[1]);
      });
  };

  //   cx = d => {
  //     console.log("dddd", d);
  //   };
  getPoints = () => {
    const random = d3.randomNormal(0, 0.2);
    const sqrt3 = Math.sqrt(3);
    const points0 = d3.range(300).map(function() {
      return [random() + sqrt3, random() + 1, 0];
    });
    const points1 = d3.range(300).map(function() {
      return [random() - sqrt3, random() + 1, 1];
    });
    const points2 = d3.range(300).map(function() {
      return [random(), random() - 1, 2];
    });
    return d3.merge([points0, points1, points2]);
  };
  render() {
    let { idleTimeout, idleDelay, x0, y0, width, height, x, y, z } = this.state;
    console.log("state", this.state);
    const points = this.getPoints();
    // console.log("points", points);
    return (
      <div>
        <h3> Scatter Plot with Trend Line </h3>
        <svg width={width} height={height}>
          {points.map(point => (
            <circle
              cx={x(point[0])}
              cy={y(point[1])}
              r={2.5}
              fill={z(point[2])}
            ></circle>
          ))}

          <g
            // axis="x"
            transform={"translate(0," + (height - 10) + ")"}
            // scale={d3.axisTop().scale(x)}
            ticks={d3.axisTop(x).ticks(12)}
            className="axis-x"
          />
          <g
            // axis="y"
            transform={"translate(10,0)"}
            // scale={d3.axisRight().scale(x)}
            ticks={d3.axisRight(y).ticks((12 * height) / width)}
            className="axis-y"
          />
          {/* <g className="brush"></g> */}
        </svg>
      </div>
    );
  }
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
