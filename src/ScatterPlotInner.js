import React, { Component } from "react";
import { scaleLinear, scaleTime } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { select } from "d3-selection";
import { timeFormat } from "d3-time-format";
import {
  timeSecond,
  timeMinute,
  timeHour,
  timeDay,
  timeMonth,
  timeYear,
  timeWeek
} from "d3-time";
import { extent } from "d3-array";
export default class ScatterPlotInner extends Component {
  state = {
    tooltip: ""
  };
  componentDidMount() {
    const { data } = this.props;
    this.drawChart(data);
  }

  multiFormat = date => {
    const formatMillisecond = timeFormat(".%L");
    const formatSecond = timeFormat(":%S");
    const formatDateTime = timeFormat("%m/%d, %I:%M%p");
    const formatStandard = timeFormat("%m/%d/%Y");

    return (timeSecond(date) < date
      ? formatMillisecond
      : timeMinute(date) < date
      ? formatSecond
      : timeHour(date) < date
      ? formatDateTime
      : timeDay(date) < date
      ? formatDateTime
      : timeMonth(date) < date
      ? timeWeek(date) < date
        ? formatStandard
        : formatDateTime
      : timeYear(date) < date
      ? formatStandard
      : formatStandard)(date);
  };

  mouseOver = (data, index, elements, test2) => {
    console.log(select(index), index);
    this.setState({ tooltip: data.x });
  };
  mouseMove = data => {
    // console.log("mousemove", data);
  };

  mouseOut = data => {
    console.log("mouseout", data);
  };
  drawChart = anomalyData => {
    const { width, height, tickFormat } = this.props;
    var margin = {
        top: 10,
        right: 20,
        bottom: 50,
        left: 50
      },
      innerWidth = width - margin.left - margin.right,
      innerHeight = height - margin.top - margin.bottom,
      idleTimeout,
      idleDelay = 350;

    var x = scaleTime().range([0, innerWidth]);
    var y = scaleLinear().range([innerHeight, 0]);
    var xAxis = axisBottom(x).tickFormat(
      tickFormat ? timeFormat(tickFormat) : this.multiFormat
    );
    var yAxis = axisLeft(y);
    var div = select("#scatterPlotSvg")
      .append("div")
      .attr("class", "legend");
    var brush = brush().on("end", brushended);
    var svg = div
      .append("svg")
      .attr("class", "scatter")
      .attr("width", innerWidth + margin.left + margin.right)
      .attr("height", innerHeight + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var x0 = extent(anomalyData, function(d) {
      return d.x;
    });
    var y0 = extent(anomalyData, function(d) {
      return d.y;
    });
    x.domain(x0).nice();
    y.domain(y0).nice();
    svg
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + innerHeight + ")")
      //   .attr("transform", "rotate(90)")
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-40)");
    //   .style("text-anchor", "start");
    svg
      .append("g")
      .attr("class", "axis axis--y")
      .call(yAxis);
    svg
      .append("g")
      .attr("class", "brush")
      .call(brush)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    function brushended() {
      var s = event.selection;
      if (!s) {
        if (!idleTimeout) return (idleTimeout = setTimeout(idled, idleDelay));
        x.domain(x0);
        y.domain(y0);
      } else {
        x.domain([s[0][0], s[1][0]].map(x.invert, x));
        y.domain([s[1][1], s[0][1]].map(y.invert, y));
        svg.select(".brush").call(brush.move, null);
      }
      zoom();
    }

    function idled() {
      idleTimeout = null;
    }

    function zoom() {
      var t = svg.transition().duration(750);
      svg
        .select(".axis--x")
        .transition(t)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-40)");
      svg
        .select(".axis--y")
        .transition(t)
        .call(yAxis);
      svg
        .selectAll("circle")
        .transition(t)
        .attr("cx", function(d) {
          return x(d.x);
        })
        .attr("cy", function(d) {
          return y(d.y);
        });
    }

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", innerWidth)
      .attr("height", innerHeight);

    var circlegroup = svg.append("g");
    // .attr("dataTip", "ddasa")

    circlegroup.attr("clip-path", "url(#clip)");
    circlegroup
      .selectAll(".dot")
      .data(anomalyData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("r", 5)
      .attr("cx", function(d) {
        // console.log("d.x", d);
        return x(d.x);
      })
      .attr("cy", function(d) {
        return y(d.y);
      })
      .attr("data-tip", "helloworld")
      .attr("data-for", "tooltip")
      .style("fill", function(d) {
        return d.color;
      })
      //   .on("click", function() {})
      .on("mouseover", function(d, i) {})
      .on("mousemove", this.mouseMove)
      .on("mouseout", this.mouseOut);
    // function(d) {
    //   return TimeScatterPlot.getTooltip()
    //     .style("visibility", "visible")
    //     .text(function() {
    //       return d.x + " bytes: " + d.bytes + ", article: " + d.desc;
    //     });
    // }

    // .on("mousemove", function() {
    //   var event = event;
    //   return TimeScatterPlot.getTooltip()
    //     .style("top", event.pageY + "px")
    //     .style("left", event.pageX + 10 + "px");
    // })
    // .on("mouseout", function() {
    //   return TimeScatterPlot.getTooltip().style("visibility", "hidden");
    // });
    //   .on("click", this.drawChart);
  };
  render() {
    const { tooltip } = this.state;
    return (
      <div>
        <div id="scatterPlotSvg"></div>
      </div>
    );
  }
}
