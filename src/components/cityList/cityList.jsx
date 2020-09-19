import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { BiHome } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import moment from "moment-timezone";

import { DAYS, MONTHS } from "../../utils/const";
import HoursList from "../hoursList/hourList";
import "./cityList.scss";

const CityList = (props) => {
  const [timeList, setTimeList] = useState([]);

  useEffect(() => {
    setTimeList((timeList) => timeList.concat(props.item));
  }, [props]);

  const getTime = (placeTime) => {
    if (!placeTime) {
      return "";
    }
    const time = moment.tz(placeTime.datetime, placeTime.timezone);

    return `${time.format("hh:mm A")} ${placeTime.abbreviation}`;
  };
  const getFormatDate = (date) => {
    const [year, month, day] = date.split("-");
    const d = new Date(year, +month - 1, day);
    const dateFormated = `${DAYS[d.getDay()]}, ${MONTHS[+month - 1]} ${day}`;

    let nextDay = new Date(d);
    nextDay.setDate(d.getDate() + 1);
    const formatedNextDate = {
      month: MONTHS[nextDay.getMonth()],
      day: nextDay.getDate(),
    };

    return { dateFormated, formatedNextDate };
  };

  const getContinentAndCity = (timezone) => {
    return timezone?.split("/").map((zone) => zone.replace("_", " ")) || "";
  };

  const removeItem = (item) => {
    const placeToRemove = item.timezone;
    setTimeList(timeList.filter((place) => place.timezone !== placeToRemove));
  };

  const calcDiff = (localTime, comparedTime) => {
    const local = moment.tz(localTime.datetime, localTime.timezone);
    const otherTime = moment.tz(comparedTime.datetime, comparedTime.timezone);
    const [date] = otherTime._i?.split(/[T|.]/);
    const { dateFormated, formatedNextDate } = getFormatDate(date);
    const diff = Math.round(
      (otherTime._d.getTime() - local._d.getTime()) / 3600000
    );
    const difference = diff > 0 ? `+${diff}` : diff;

    return { difference, dateFormated, formatedNextDate };
  };

  const getTimeData = (local, foreign) => {
    const { difference, dateFormated, formatedNextDate } = calcDiff(
      local,
      foreign
    );
    const [continent, city] = getContinentAndCity(foreign.timezone);

    return { difference, city, continent, dateFormated, formatedNextDate };
  };

  return (
    <div className="CityList">
      {timeList.length > 0 &&
        timeList.map((placeTime, key) => {
          const {
            difference,
            continent,
            city,
            dateFormated,
            formatedNextDate,
          } = getTimeData(timeList[0], placeTime);

          return (
            <Row className="col-md-12" key={key}>
              <Col className="col-md-1 align-self-center">
                <BsTrash
                  className="BsTrash"
                  onClick={() => removeItem(placeTime)}
                />
              </Col>
              <Col className="col-md-1 align-self-center">
                {(key && <p>{difference}</p>) || <BiHome />}
              </Col>
              <Col className="col-md-2 align-self-center">
                <h6>{continent}</h6>
                <p>{city}</p>
              </Col>
              <Col className="col-md-2 align-self-center">
                <h6>{getTime(placeTime)}</h6>
                <p>{dateFormated}</p>
              </Col>
              <Col className="col-md-6 align-self-center">
                <HoursList
                  hour={moment
                    .tz(placeTime.datetime, placeTime.timezone)
                    .format("HH")}
                  nextDay={formatedNextDate}
                />
              </Col>
            </Row>
          );
        })}
      <div className="selected"></div>
    </div>
  );
};

export default CityList;
