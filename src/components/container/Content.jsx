import React, { useEffect, useState } from "react";
import "./Content.scss";
import { Container, Row, Col, Card } from "react-bootstrap";
import SearchBox from "../searchBox/searchBox";
import CityList from "../cityList/cityList";

const Content = () => {
  const [item, setItem] = useState();

  const selected = (zone) => {
    const [continent, city] = zone.split("/");
    fetch(`http://worldtimeapi.org/api/timezone/${continent}/${city}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((timePlace) => {
        setItem(timePlace);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    let isSubscribed = true;
    fetch(`http://worldtimeapi.org/api/ip`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((timePlace) => {
        if (isSubscribed) {
          setItem(timePlace);
        }
      })
      .catch((error) => console.log(error));
    return () => isSubscribed = false;
  }, []);

  return (
    <div className="Content">
      <Container fluid>
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Body>
                <Card.Title>World time</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Row>
                  <Col>
                    <SearchBox
                      zoneTyped={(zone) => {
                        selected(zone);
                      }}
                    />
                  </Col>
                </Row>
                <Row>{item && <CityList item={item} />}</Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Content;
