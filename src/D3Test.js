import React, { Component } from "react";
import { csv, json } from "d3";
import tweets from "./tweets";
async function getData() {
  await csv("./cities.csv", data => console.log("cities", data));
  await json("./tweets", data => console.log("tweets", data.tweets));
  console.log("tweets", tweets);
}

export default class d3Test extends Component {
  // <script src="https://d3js.org/d3.v5.js"></script>;

  componentDidMount() {
    getData();
  }

  render() {
    return <div>d3</div>;
  }
}
