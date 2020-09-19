import React from "react";
import { mount } from "enzyme";
import HoursList from "./hourList";

describe("HoursList", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<HoursList />);
  });
  it("Renders", () => {
    expect(wrapper).not.toBeNull();
  });
});
