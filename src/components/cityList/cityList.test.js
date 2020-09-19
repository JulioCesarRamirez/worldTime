import React from "react";
import { mount } from "enzyme";
import CityList from "./cityList";

describe("CityList", () => {
  let wrapper;
  const initialProps = {
    item: {
      abbreviation: "PDT",
      client_ip: "138.186.30.152",
      datetime: "2020-09-19T12:48:51.620209-07:00",
      day_of_week: 6,
      day_of_year: 263,
      dst: true,
      dst_from: "2020-03-08T10:00:00+00:00",
      dst_offset: 3600,
      dst_until: "2020-11-01T09:00:00+00:00",
      raw_offset: -28800,
      timezone: "America/Los_Angeles",
      unixtime: 1600544931,
      utc_datetime: "2020-09-19T19:48:51.620209+00:00",
      utc_offset: "-07:00",
      week_number: 38,
    },
  };
  beforeEach(() => {
    wrapper = mount(<CityList {...initialProps} />);
  });
  it("Renders", () => {
    expect(wrapper).not.toBeNull();
  });
  it("show list", () => {
    const ul = wrapper.find("ul");
    expect(ul).toHaveLength(1);
  });
  it("verify item in list", () => {
    const div = wrapper.find("div.col-md-1>h6");
    expect(div).toHaveLength(2);
  });
  it("HourList component should be shown", () => {
    const div = wrapper.find("HoursList");
    expect(div).toHaveLength(1);
  });
});
