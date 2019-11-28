import * as d3 from "d3";
import React, { Component } from "react";
import * as moment from "moment";

export default class ScatterPlot5 extends React.Component {
  state = {
    idleTimeout: null,
    idleDelay: 350,
    margin: {
      top: 10,
      right: 20,
      bottom: 30,
      left: 50
    }
  };
  xAxis = () => {
    const { x } = this.state;
    d3.axisBottom(x);
  };
  yAxis = () => {
    const { y } = this.state;
    d3.axisLeft(y);
  };
  brush = d3.brush().on("end", this.brushended);

  brushended = () => {
    let { idleDelay, idleTimeout, x, y, x0, y0 } = this.state;
    var s = d3.event.selection;
    if (!s) {
      if (!idleTimeout)
        return (idleTimeout = setTimeout(this.idled, idleDelay));
      x.domain(x0);
      y.domain(y0);
    } else {
      x.domain([s[0][0], s[1][0]].map(x.invert, x));
      y.domain([s[1][1], s[0][1]].map(y.invert, y));
      d3.select("svg")
        .select(".brush")
        .call(this.brush.move, null);
    }
    this.zoom();
  };
  componentDidMount() {
    const margin = {
      top: 10,
      right: 20,
      bottom: 30,
      left: 50
    };
    const width = 510 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    // var x0 = d3.extent(articlesData, function(d) {
    //   return moment(d.code).toDate();
    // });
    // var y0 = d3.extent(articlesData, function(d) {
    //   return d.qty;
    // });
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    var x0 = d3.extent(articlesData, function(d) {
      return moment(d.code).toDate();
    });
    var y0 = d3.extent(articlesData, function(d) {
      return d.qty;
    });
    this.setState({
      x,
      y,
      x0,
      y0
    });

    x.domain(x0).nice();
    y.domain(y0).nice();
    console.log("mounted");
    d3.select("svg")
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(this.xAxis);
    d3.select("svg")
      .append("g")
      .attr("class", "axis axis--y")
      .call(this.yAxis);
    d3.select("svg")
      .append("g")
      .attr("class", "brush")
      .call(this.brush)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.select("svg")
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    var circlegroup = d3.select("svg").append("g");

    circlegroup.attr("clip-path", "url(#clip)");
    circlegroup
      .selectAll(".dot")
      .data(articlesData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("r", 5)
      .attr("cx", function(d) {
        return x(moment(d.code).toDate());
      })
      .attr("cy", function(d) {
        return y(d.qty);
      })
      .style("fill", function(d) {
        return "steelblue";
      })
      .on("click", function() {})
      //   .on("mouseover", function(d) {
      //     return TimeScatterPlot.getTooltip()
      //       .style("visibility", "visible")
      //       .text(function() {
      //         return d.code + " qty: " + d.qty + ", article: " + d.desc;
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
      .on("click", console.log("clicked"));
  }
  idled = () => {
    this.setState({
      idleTimeout: null
    });
  };

  zoom = () => {
    const { x, y } = this.state;
    var t = d3
      .select("svg")
      .transition()
      .duration(750);
    d3.select("svg")
      .select(".axis--x")
      .transition(t)
      .call(this.xAxis);
    d3.select("svg")
      .select(".axis--y")
      .transition(t)
      .call(this.yAxis);
    d3.select("svg")
      .selectAll("circle")
      .transition(t)
      .attr("cx", function(d) {
        return x(moment(d.code).toDate());
      })
      .attr("cy", function(d) {
        return y(d.qty);
      });
  };
  render() {
    const { width, margin, height } = this.state;

    return (
      <React.Fragment>
        <div className="scatterDiv">
          <div className="legend">
            <svg
              className="scatter"
              width={width + margin.left + margin.right}
              height={height + margin.top + margin.bottom}
            >
              <g
                transform={"translate(" + margin.left + "," + margin.top + ")"}
              />
            </svg>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
var articlesData = [
  {
    code: "2014-06-03 05:00",
    desc: "1306050822568",
    qty: 3103
  },
  {
    code: "2014-07-22 04:10",
    desc: "1306050822568",
    qty: 7938
  },
  {
    code: "2014-07-08 04:10",
    desc: "1306050822568",
    qty: 6321
  },
  {
    code: "2014-08-25 12:15",
    desc: "1306050822568",
    qty: 74
  },
  {
    code: "2014-08-01 12:15",
    desc: "1306050822568",
    qty: 148
  },
  {
    code: "2014-08-26 12:15",
    desc: "1306050822568",
    qty: 74
  },
  {
    code: "2014-11-25 05:00",
    desc: "1306050822568",
    qty: 13720
  },
  {
    code: "2014-10-21 05:00",
    desc: "1306050822568",
    qty: 7670
  },
  {
    code: "2014-09-09 09:38",
    desc: "1306050822568",
    qty: 834
  },
  {
    code: "2014-07-30 12:15",
    desc: "1306050822568",
    qty: 74
  },
  {
    code: "2014-12-09 04:10",
    desc: "1306050822568",
    qty: 6766
  },
  {
    code: "2014-10-28 05:00",
    desc: "1306050822568",
    qty: 5015
  },
  {
    code: "2014-11-07 08:00",
    desc: "1306050822568",
    qty: 38
  },
  {
    code: "2014-12-16 04:10",
    desc: "1306050822568",
    qty: 6251
  },
  {
    code: "2015-03-17 04:10",
    desc: "1306050822568",
    qty: 5517
  },
  {
    code: "2015-03-03 09:38",
    desc: "1306050822568",
    qty: 0
  },
  {
    code: "2015-07-28 04:10",
    desc: "1306050822568",
    qty: 6621
  },
  {
    code: "2015-07-21 05:00",
    desc: "1306050822568",
    qty: 16963
  },
  {
    code: "2015-08-11 05:00",
    desc: "1306050822568",
    qty: 12908
  },
  {
    code: "2015-09-22 04:10",
    desc: "1306050822568",
    qty: 9122
  },
  {
    code: "2015-08-18 05:00",
    desc: "1306050822568",
    qty: 10843
  },
  {
    code: "2015-04-14 04:10",
    desc: "1306050822568",
    qty: 7208
  },
  {
    code: "2015-05-26 05:00",
    desc: "1306050822568",
    qty: 20504
  },
  {
    code: "2015-06-23 04:10",
    desc: "1306050822568",
    qty: 9564
  },
  {
    code: "2015-06-02 05:00",
    desc: "1306050822568",
    qty: 14677
  },
  {
    code: "2015-03-24 05:00",
    desc: "1306050822568",
    qty: 7524
  },
  {
    code: "2015-05-19 04:10",
    desc: "1306050822568",
    qty: 7503
  },
  {
    code: "2015-06-19 06:00",
    desc: "1306050822568",
    qty: 74
  },
  {
    code: "2015-06-11 12:18",
    desc: "1306050822568",
    qty: 0
  },
  {
    code: "2015-07-03 12:18",
    desc: "1306050822568",
    qty: 0
  },
  {
    code: "2016-02-23 08:00",
    desc: "1306050822568",
    qty: 888
  },
  {
    code: "2016-01-19 04:10",
    desc: "1306050822568",
    qty: 8463
  },
  {
    code: "2015-11-17 04:10",
    desc: "1306050822568",
    qty: 7062
  },
  {
    code: "2016-02-10 09:38",
    desc: "1306050822568",
    qty: 670
  },
  {
    code: "2016-02-19 08:00",
    desc: "1306050822568",
    qty: 1106
  },
  {
    code: "2016-06-13 05:00",
    desc: "1306050822568",
    qty: 74
  },
  {
    code: "2016-07-26 05:00",
    desc: "EccomitInt3",
    qty: 1036
  },
  {
    code: "2016-07-12 05:00",
    desc: "EccomitInt1",
    qty: 1323
  },
  {
    code: "2016-06-28 04:10",
    desc: "1306050822568",
    qty: 8536
  },
  {
    code: "2016-06-28 09:38",
    desc: "1306050822568",
    qty: 1760
  },
  {
    code: "2016-04-19 04:10",
    desc: "1306050822568",
    qty: 9861
  },
  {
    code: "2016-05-17 08:00",
    desc: "1306050822568",
    qty: 1554
  },
  {
    code: "2016-07-05 05:00",
    desc: "1306050822568",
    qty: 10030
  },
  {
    code: "2014-07-29 05:00",
    desc: "1306050822568",
    qty: 16076
  },
  {
    code: "2014-08-12 04:10",
    desc: "1306050822568",
    qty: 4704
  },
  {
    code: "2014-06-17 04:10",
    desc: "1306050822568",
    qty: 1764
  },
  {
    code: "2014-09-02 04:10",
    desc: "1306050822568",
    qty: 4557
  },
  {
    code: "2014-06-03 04:10",
    desc: "1306050822568",
    qty: 1176
  },
  {
    code: "2014-05-27 04:10",
    desc: "1306050822568",
    qty: 294
  },
  {
    code: "2014-11-18 05:00",
    desc: "1306050822568",
    qty: 16153
  },
  {
    code: "2014-10-06 12:15",
    desc: "1306050822568",
    qty: 148
  },
  {
    code: "2014-10-07 08:00",
    desc: "1306050822568",
    qty: 38
  },
  {
    code: "2014-09-09 08:00",
    desc: "1306050822568",
    qty: 0
  },
  {
    code: "2014-09-02 12:15",
    desc: "1306050822568",
    qty: 148
  },
  {
    code: "2015-03-10 04:10",
    desc: "1306050822568",
    qty: 8163
  },
  {
    code: "2014-12-23 04:10",
    desc: "1306050822568",
    qty: 7060
  },
  {
    code: "2014-12-23 05:00",
    desc: "1306050822568",
    qty: 14383
  },
  {
    code: "2015-01-27 05:00",
    desc: "1306050822568",
    qty: 11064
  },
  {
    code: "2015-01-20 05:00",
    desc: "1306050822568",
    qty: 10622
  },
  {
    code: "2013-02-05 09:00",
    desc: "1503031714206-3",
    qty: 103
  },
  {
    code: "2014-10-14 12:15",
    desc: "1306050822568",
    qty: 74
  },
  {
    code: "2015-09-08 04:10",
    desc: "1306050822568",
    qty: 7651
  },
  {
    code: "2015-08-18 04:10",
    desc: "1306050822568",
    qty: 4708
  },
  {
    code: "2015-05-05 04:10",
    desc: "1306050822568",
    qty: 8534
  },
  {
    code: "2015-04-28 05:00",
    desc: "1306050822568",
    qty: 11064
  },
  {
    code: "2015-05-23 05:00",
    desc: "1306050822568",
    qty: 1474
  },
  {
    code: "2015-04-07 04:10",
    desc: "1306050822568",
    qty: 4267
  },
  {
    code: "2015-06-08 05:00",
    desc: "1306050822568",
    qty: 146
  },
  {
    code: "2015-06-30 06:00",
    desc: "1306050822568",
    qty: 74
  },
  {
    code: "2015-07-09 05:00",
    desc: "1306050822568",
    qty: 73
  },
  {
    code: "2015-02-24 09:38",
    desc: "1306050822568",
    qty: 0
  },
  {
    code: "2015-07-10 06:00",
    desc: "1306050822568",
    qty: 74
  },
  {
    code: "2015-03-01 08:38",
    desc: "1306050822568",
    qty: 0
  },
  {
    code: "2016-03-01 04:10",
    desc: "1306050822568",
    qty: 9346
  },
  {
    code: "2016-03-08 08:00",
    desc: "1306050822568",
    qty: 3910
  },
  {
    code: "2015-11-10 05:00",
    desc: "1306050822568",
    qty: 23527
  },
  {
    code: "2015-10-20 04:10",
    desc: "1306050822568",
    qty: 9417
  },
  {
    code: "2015-12-15 04:10",
    desc: "1306050822568",
    qty: 3900
  },
  {
    code: "2015-12-22 04:10",
    desc: "1306050822568",
    qty: 2502
  },
  {
    code: "2015-12-22 05:00",
    desc: "1306050822568",
    qty: 4130
  },
  {
    code: "2015-11-30 12:18",
    desc: "1306050822568",
    qty: 0
  },
  {
    code: "2015-11-26 12:18",
    desc: "1306050822568",
    qty: 0
  },
  {
    code: "2016-07-05 04:10",
    desc: "1306050822568",
    qty: 8168
  },
  {
    code: "2016-05-24 09:38",
    desc: "1306050822568",
    qty: 1540
  },
  {
    code: "2016-06-07 08:00",
    desc: "1306050822568",
    qty: 1996
  },
  {
    code: "2016-04-19 05:00",
    desc: "1306050822568",
    qty: 13348
  },
  {
    code: "2016-04-05 08:00",
    desc: "1306050822568",
    qty: 888
  },
  {
    code: "2016-04-26 05:00",
    desc: "1306050822568",
    qty: 10102
  },
  {
    code: "2016-05-24 05:00",
    desc: "1306050822568",
    qty: 10839
  },
  {
    code: "2016-05-10 09:38",
    desc: "1306050822568",
    qty: 1760
  },
  {
    code: "2016-06-21 08:00",
    desc: "1306050822568",
    qty: 3025
  },
  {
    code: "2016-05-24 08:00",
    desc: "1306050822568",
    qty: 888
  },
  {
    code: "2016-04-26 08:00",
    desc: "1306050822568",
    qty: 1554
  },
  {
    code: "2016-04-26 09:38",
    desc: "1306050822568",
    qty: 1760
  },
  {
    code: "2016-05-10 08:00",
    desc: "1306050822568",
    qty: 222
  },
  {
    code: "2014-08-26 05:00",
    desc: "1306050822568",
    qty: 16371
  },
  {
    code: "2014-09-02 05:00",
    desc: "1306050822568",
    qty: 10398
  },
  {
    code: "2014-07-08 05:00",
    desc: "1306050822568",
    qty: 1845
  },
  {
    code: "2014-06-17 05:00",
    desc: "1306050822568",
    qty: 2730
  },
  {
    code: "2014-09-16 04:10",
    desc: "1306050822568",
    qty: 5292
  },
  {
    code: "2014-09-30 05:00",
    desc: "1306050822568",
    qty: 7668
  },
  {
    code: "2014-09-09 05:00",
    desc: "1306050822568",
    qty: 13275
  },
  {
    code: "2014-09-23 04:10",
    desc: "1306050822568",
    qty: 1911
  },
  {
    code: "2014-10-17 12:15",
    desc: "1306050822568",
    qty: 74
  },
  {
    code: "2014-09-08 12:15",
    desc: "1306050822568",
    qty: 74
  },
  {
    code: "2015-03-03 05:00",
    desc: "1306050822568",
    qty: 8115
  },
  {
    code: "2014-12-30 05:00",
    desc: "1306050822568",
    qty: 11064
  },
  {
    code: "2015-03-03 04:10",
    desc: "1306050822568",
    qty: 5147
  },
  {
    code: "2015-01-13 04:10",
    desc: "1306050822568",
    qty: 4486
  },
  {
    code: "2015-02-10 05:00",
    desc: "1306050822568",
    qty: 6343
  },
  {
    code: "2015-08-25 04:10",
    desc: "1306050822568",
    qty: 5442
  },
  {
    code: "2015-08-11 04:10",
    desc: "1306050822568",
    qty: 6474
  },
  {
    code: "2015-09-08 05:00",
    desc: "1306050822568",
    qty: 16079
  },
  {
    code: "2015-09-15 04:10",
    desc: "1306050822568",
    qty: 6621
  },
  {
    code: "2015-09-29 04:10",
    desc: "1306050822568",
    qty: 9858
  },
  {
    code: "2015-07-14 04:10",
    desc: "1306050822568",
    qty: 5737
  },
  {
    code: "2015-09-16 05:00",
    desc: "1306050822568",
    qty: 146
  },
  {
    code: "2015-06-23 05:00",
    desc: "1306050822568",
    qty: 15636
  },
  {
    code: "2015-04-07 05:00",
    desc: "1306050822568",
    qty: 6417
  },
  {
    code: "2015-04-14 05:00",
    desc: "1306050822568",
    qty: 12170
  },
  {
    code: "2015-09-25 05:00",
    desc: "1306050822568",
    qty: 73
  },
  {
    code: "2015-09-29 06:00",
    desc: "1306050822568",
    qty: 74
  },
  {
    code: "2015-07-15 12:18",
    desc: "1306050822568",
    qty: 0
  },
  {
    code: "2015-09-29 12:18",
    desc: "1306050822568",
    qty: 0
  },
  {
    code: "2015-07-14 12:18",
    desc: "1306050822568",
    qty: 0
  },
  {
    code: "2015-06-08 06:00",
    desc: "1306050822568",
    qty: 148
  },
  {
    code: "2015-06-11 06:00",
    desc: "1306050822568",
    qty: 74
  },
  {
    code: "2016-03-15 05:00",
    desc: "1306050822568",
    qty: 12534
  },
  {
    code: "2016-03-08 04:10",
    desc: "1306050822568",
    qty: 8610
  },
  {
    code: "2016-03-15 09:38",
    desc: "1306050822568",
    qty: 220
  },
  {
    code: "2016-02-23 05:00",
    desc: "1306050822568",
    qty: 13125
  },
  {
    code: "2016-01-12 05:00",
    desc: "1306050822568",
    qty: 12982
  },
  {
    code: "2015-11-03 04:10",
    desc: "1306050822568",
    qty: 8757
  },
  {
    code: "2015-11-24 12:18",
    desc: "1306050822568",
    qty: 0
  },
  {
    code: "2015-11-13 05:00",
    desc: "1306050822568",
    qty: 73
  },
  {
    code: "2016-03-01 08:00",
    desc: "1306050822568",
    qty: 2881
  },
  {
    code: "2016-03-15 08:00",
    desc: "1306050822568",
    qty: 1181
  },
  {
    code: "2015-11-04 12:18",
    desc: "1306050822568",
    qty: 0
  },
  {
    code: "2016-07-12 08:00",
    desc: "1306050822568",
    qty: 4353
  },
  {
    code: "2016-07-12 05:00",
    desc: "EccomitInt4",
    qty: 1332
  },
  {
    code: "2016-06-28 05:00",
    desc: "EccomitInt1",
    qty: 956
  },
  {
    code: "2016-07-19 05:00",
    desc: "EccomitInt3",
    qty: 1332
  },
  {
    code: "2016-05-24 04:10",
    desc: "1306050822568",
    qty: 7653
  },
  {
    code: "2016-05-31 09:38",
    desc: "1306050822568",
    qty: 1320
  },
  {
    code: "2016-06-21 05:00",
    desc: "1306050822568",
    qty: 10836
  },
  {
    code: "2016-05-31 08:00",
    desc: "1306050822568",
    qty: 2361
  },
  {
    code: "2016-07-05 05:00",
    desc: "EccomitInt4",
    qty: 1036
  },
  {
    code: "2016-06-21 05:00",
    desc: "EccomitInt2",
    qty: 888
  },
  {
    code: "2014-07-16 12:15",
    desc: "1306050822568",
    qty: 74
  },
  {
    code: "2014-07-15 04:10",
    desc: "1306050822568",
    qty: 5292
  },
  {
    code: "2014-08-22 12:15",
    desc: "1306050822568",
    qty: 74
  },
  {
    code: "2014-08-27 12:15",
    desc: "1306050822568",
    qty: 74
  },
  {
    code: "2014-11-11 04:10",
    desc: "1306050822568",
    qty: 9261
  },
  {
    code: "2014-09-16 05:00",
    desc: "1306050822568",
    qty: 11798
  },
  {
    code: "2014-11-04 05:00",
    desc: "1306050822568",
    qty: 16153
  },
  {
    code: "2014-12-02 05:00",
    desc: "1306050822568",
    qty: 9294
  },
  {
    code: "2014-10-07 05:00",
    desc: "1306050822568",
    qty: 8112
  },
  {
    code: "2014-08-15 12:15",
    desc: "1306050822568",
    qty: 74
  },
  {
    code: "2014-11-11 05:00",
    desc: "1306050822568",
    qty: 17481
  },
  {
    code: "2015-01-13 05:00",
    desc: "1306050822568",
    qty: 11064
  },
  {
    code: "2015-01-06 04:10",
    desc: "1306050822568",
    qty: 5148
  },
  {
    code: "2015-09-29 05:00",
    desc: "1306050822568",
    qty: 25370
  }
];
