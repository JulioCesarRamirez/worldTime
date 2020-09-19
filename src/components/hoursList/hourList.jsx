import React from "react";
import "./hoursList.scss";

const HoursList = (props) => {
  const { hour, nextDay } = props;

  let items = [],
    className = "currentday";

  for (let i = hour - 1; i <= +hour + 24; i++) {
    if (i === 24) {
      className = "nextday";
      items.push(
        <li key={i} className={`${className} first`}>
          <h6>{nextDay.month}</h6>
          <p>{nextDay.day}</p>
        </li>
      );
    } else
      items.push(
        <li
          key={i}
          className={`${className} ${+i === +hour ? "HoursList-active" : ""}`}
        >
          <h6>{i % 12 || 12}</h6>
          <p>{i < 12 || i === 24 ? "a.m." : "p.m."}</p>
        </li>
      );
  }
  return (
    <div className="HoursList">
      <ul>{items}</ul>
    </div>
  );
};

export default HoursList;
