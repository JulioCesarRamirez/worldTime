import React, { useEffect, useState } from "react";
import "./hoursList.scss";

const HoursList = (props) => {
  const [hours, setHours] = useState(
    Array(24 - 0)
      .fill()
      .map((item, index) => 1 + index)
  );
  const [hour, setHour] = useState(Number(props.hour));
  useEffect(() => {
    console.log(props, hour);
  }, [props]);
  return (
    <div className="HoursList">
      <ul>
        {hours.map((h) => {
          return (
            <li key={h} className={h === hour? "HoursList-active" : ""}>
              <h6>{h}</h6>
              <p>{h < 12 ? "am" : "pm"}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HoursList;
