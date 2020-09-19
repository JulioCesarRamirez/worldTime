import React, { useState } from "react";
import Mexico from "../../mock/cities.json";
import "./searchBox.scss"

const SearchBox = (props) => {
  const [places, setPlaces] = useState([]);

  const handleLangChange = (ev) => {
    let regex = new RegExp(ev.target.value, "i");
    const placeFound = Mexico.cities.filter((place) =>
      place.toLocaleLowerCase().match(regex)
    );
    setPlaces(placeFound);
  };

  const placeSelected = (place) => {
    props.zoneTyped(place);
    setPlaces([]);
  };

  const converPlace = (place) => {
    let [continent, city] = place.split("/");
    if (city) city = city.replace("_", " ");
    return [continent, city].join(", ");
  };

  return (
    <div className="SearcBox">
      <input type="text" onChange={handleLangChange} />
      {places.length > 0 && (
        <ul>
          {places.map((place, i) => {
            return (
              <li key={i}>
                <button onClick={() => placeSelected(place)}>
                  {converPlace(place)}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
