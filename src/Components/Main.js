import React from "react";
import moment from "moment";

import { Row, Card, Col } from "react-bootstrap";

import Calender from "./Calender";

function Main() {
  let startDate = moment().add(-365, "days");
  let dateRange = [startDate, moment()];

  return (
    <div className="main">
      <Row>
        <Card>
          <Calender range={dateRange} />
        </Card>
      </Row>
    </div>
  );
}

export default Main;
