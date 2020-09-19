import React, { useEffect, useState } from "react";
import "./Content.scss";
import { Container, Row, Col, Card, Alert, Button } from "react-bootstrap";
import SearchBox from "../searchBox/searchBox";
import CityList from "../cityList/cityList";

const Content = () => {
  const [state, setState] = useState({ item: [], error: false });

  const selected = (zone) => {
    const [continent, city] = zone.split("/");
    fetch(`http://worldtimeapi.org/api/timezone/${continent}/${city}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((timePlace) => {
        if (timePlace.error) setState({ item: [], error: true });
        else setState({ item: timePlace, error: false });
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
          setState({ item: timePlace, error: false });
        }
      })
      .catch((error) => console.log(error));
    return () => (isSubscribed = false);
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center Content">
      <Container fluid>
        {
          <Alert show={state.error} variant="danger" className="error">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>Unkown location</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => setState({ item: [], error: false })}
                variant="outline-danger"
              >
                Close me!
              </Button>
            </div>
          </Alert>
        }
        <Row>
          <Col xs={12} className="container">
            <label className="col-md-12 text-center title">WorldtimeLite</label>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <SearchBox
                      zoneTyped={(zone) => {
                        selected(zone);
                      }}
                    />
                  </Col>
                </Row>
                <Row>{state.item && <CityList item={state.item} />}</Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Content;
