import React from "react";

const Days = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thurs",
  5: "Fri",
  6: "Sat",
};

const WeekDay = ({ index }) => {
  return <div className="calender-weekdays-weekday">{Days[index]}</div>;
};

export default WeekDay;
