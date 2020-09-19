import React from "react";
import { mount } from "enzyme";
import SearchBox from "./searchBox";

describe("SearchBox", () => {
  let wrapper;
  const selected = jest.fn();
  beforeEach(() => {
    wrapper = mount(<SearchBox zoneTyped={selected} />);
  });
  it("Renders", () => {
    expect(wrapper).not.toBeNull();
  });

  it("type a city", () => {
    const input = wrapper.find('input');
    input.simulate('focus');
    input.simulate('change', { target: { value: 'los ang' } })
    expect(wrapper.find("input").instance().value).toEqual("los ang");
  });

});
