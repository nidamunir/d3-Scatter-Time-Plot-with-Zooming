import moment from "moment";
import { timeFormat } from "d3-time-format";
import {
  timeSecond,
  timeMinute,
  timeHour,
  timeDay,
  timeMonth,
  timeYear
} from "d3-time";

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

export const multiFormat = date => {
  const formatMillisecond = timeFormat(".%L");
  const formatSecond = timeFormat(":%S");
  const formatDateTime = timeFormat("%I:%M%p");
  // const formatHour = d3.timeFormat("%m/%d, %I:%M%p");
  const formatStandard = timeFormat("%m/%d");
  // return (d3.timeSecond(date) < date
  //   ? formatMillisecond
  //   : d3.timeMinute(date) < date
  //   ? formatSecond
  //   : d3.timeHour(date) < date
  //   ? formatMinute
  //   : d3.timeDay(date) < date
  //   ? formatHour
  //   : formatStandard)(date);

  return (timeSecond(date) < date
    ? formatMillisecond
    : timeMinute(date) < date
    ? formatSecond
    : timeHour(date) < date
    ? formatDateTime
    : timeDay(date) < date
    ? formatDateTime
    : timeMonth(date) < date
    ? formatStandard
    : timeYear(date) < date
    ? formatStandard
    : formatStandard)(date);
};

export const formatTooltip = d =>
  `<div>
    <span>${d.x}</span></br>
    <span>${d.y}</span>
  </div>`;
