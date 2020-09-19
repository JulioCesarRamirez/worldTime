import React, { useState } from "react";
import Mexico from "../../mock/cities.json";
import "./searchBox.scss";

const SearchBox = (props) => {
  const [places, setPlaces] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleLangChange = (ev) => {
    if (ev.target.value.length > 2) {
      let regex = new RegExp(ev.target.value, "i");
      const placeFound = Mexico.cities.filter((place) =>
        place.toLocaleLowerCase().match(regex)
      );
      setPlaces(placeFound);
    } else setPlaces([]);
  };

  const placeSelected = (place) => {
    props.zoneTyped(place);
    setPlaces([]);
    setSearchInput("");
  };

  const converPlace = (place) => {
    let [continent, city] = place.split("/");
    if (city) city = city.replace("_", " ");
    return [continent, city].join(", ");
  };

  return (
    <div className="SearcBox">
      <input
        type="text"
        onKeyUp={handleLangChange}
        onChange={({ target }) => setSearchInput(target.value)}
        value={searchInput}
        placeholder="Find place or timezone - Press ↩"
      />
      {places.length > 0 && (
        <ul>
          {places.map((place, i) => {
            return (
              <li key={i} onClick={() => placeSelected(place)}>
                {converPlace(place)}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
