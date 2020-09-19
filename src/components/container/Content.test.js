import React from "react";
import { mount } from "enzyme";
import Content from "./Content";

describe("Content", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Content />);
  });
  it("Renders", () => {
    expect(wrapper).not.toBeNull();
  });

});
