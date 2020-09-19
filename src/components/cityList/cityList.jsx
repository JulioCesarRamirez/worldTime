import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BiHome } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import moment from "moment-timezone";

import { DAYS, MOTHS } from "../../utils/const";
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

    return time.format("hh:mm A");
  };
  const getDate = (dateTime) => {
    if (!dateTime) {
      return "";
    }
    const date = new Date(dateTime);

    return `${DAYS[date.getDay()]}, ${
      MOTHS[date.getMonth()]
    } ${date.getDate()}`;
  };

  const getContinent = (timezone) => {
    return timezone ? timezone.split("/")[0] : "";
  };

  const getCity = (timezone) => {
    return timezone ? timezone.split("/")[1].replace("_", " ") : "";
  };

  const removeItem = (item) => {
    const placeToRemove = item.timezone;
    setTimeList(timeList.filter((place) => place.timezone !== placeToRemove));
  };

  const calcDiff = (localTime, comparedTime) => {
    const local = moment.tz(localTime.datetime, localTime.timezone);
    const otheTime = local.clone().tz(comparedTime.timezone);
    const diff = otheTime.format("HH") - local.format("HH");
    return diff < 0 ? diff : `+${diff}`;
  };

  return (
    <div className="CityList">
      {timeList.length > 0 && (
        <Table striped hover>
          <tbody>
            {timeList.map((placeTime, i) => {
              return (
                <tr key={i}>
                  <td className="CityList-icon">
                    <button
                      onClick={() => {
                        removeItem(placeTime);
                      }}
                    >
                      <BsTrash />
                    </button>
                  </td>
                  <td className="CityList-icon">
                    {i === 0 ? (
                      <BiHome />
                    ) : (
                      <p>{calcDiff(timeList[0], placeTime)}</p>
                    )}
                  </td>
                  <td>
                    <h6>{getContinent(placeTime.timezone)}</h6>
                    <p>{getCity(placeTime.timezone)}</p>
                  </td>
                  <td>
                    <h6>{getTime(placeTime)}</h6>
                    <p>{getDate(placeTime.datetime)}</p>
                  </td>
                  <td className="CityList-scroll-x">
                    <HoursList hour={moment.tz(placeTime.datetime, placeTime.timezone).format("HH")}/>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default CityList;
