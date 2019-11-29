import React, { Component } from "react";
import * as d3 from "d3";
import * as moment from "moment";

export default class ScatterPlotInner extends Component {
  componentDidMount() {
    const { data } = this.props;
    this.drawChart(data);
  }

  multiFormat = date => {
    const formatMillisecond = d3.timeFormat(".%L");
    const formatSecond = d3.timeFormat(":%S");
    const formatDateTime = d3.timeFormat("%m/%d, %I:%M%p");
    // const formatHour = d3.timeFormat("%m/%d, %I:%M%p");
    const formatStandard = d3.timeFormat("%m/%d/%Y");
    // return (d3.timeSecond(date) < date
    //   ? formatMillisecond
    //   : d3.timeMinute(date) < date
    //   ? formatSecond
    //   : d3.timeHour(date) < date
    //   ? formatMinute
    //   : d3.timeDay(date) < date
    //   ? formatHour
    //   : formatStandard)(date);

    return (d3.timeSecond(date) < date
      ? formatMillisecond
      : d3.timeMinute(date) < date
      ? formatSecond
      : d3.timeHour(date) < date
      ? formatDateTime
      : d3.timeDay(date) < date
      ? formatDateTime
      : d3.timeMonth(date) < date
      ? d3.timeWeek(date) < date
        ? formatStandard
        : formatDateTime
      : d3.timeYear(date) < date
      ? formatStandard
      : formatStandard)(date);
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

    var x = d3.scaleTime().range([0, innerWidth]);
    var y = d3.scaleLinear().range([innerHeight, 0]);
    var xAxis = d3
      .axisBottom(x)
      .tickFormat(tickFormat ? d3.timeFormat(tickFormat) : this.multiFormat);
    var yAxis = d3.axisLeft(y);
    var div = d3
      .select("#scatterPlotSvg")
      .append("div")
      .attr("class", "legend");
    var brush = d3.brush().on("end", brushended);
    var svg = div
      .append("svg")
      .attr("class", "scatter")
      .attr("width", innerWidth + margin.left + margin.right)
      .attr("height", innerHeight + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var x0 = d3.extent(anomalyData, function(d) {
      return d.x;
    });
    var y0 = d3.extent(anomalyData, function(d) {
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
      var s = d3.event.selection;
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

    circlegroup.attr("clip-path", "url(#clip)");
    circlegroup
      .selectAll(".dot")
      .data(anomalyData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("r", 5)
      .attr("cx", function(d) {
        return x(d.x);
      })
      .attr("cy", function(d) {
        return y(d.y);
      })
      .style("fill", function(d) {
        return d.color;
      });
    //   .on("click", function() {})
    //   .on("mouseover", function(d) {
    //     return TimeScatterPlot.getTooltip()
    //       .style("visibility", "visible")
    //       .text(function() {
    //         return d.x + " bytes: " + d.bytes + ", article: " + d.desc;
    //       });
    //   })
    //   .on("mousemove", function() {
    //     var event = d3.event;
    //     return TimeScatterPlot.getTooltip()
    //       .style("top", event.pageY + "px")
    //       .style("left", event.pageX + 10 + "px");
    //   })
    //   .on("mouseout", function() {
    //     return TimeScatterPlot.getTooltip().style("visibility", "hidden");
    //   })
    //   .on("click", this.drawChart);
  };

  render() {
    return (
      <div>
        <div id="scatterPlotSvg">
          <svg />
        </div>
      </div>
    );
  }
}
