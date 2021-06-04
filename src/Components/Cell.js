import React from "react";

import { Tooltip, OverlayTrigger } from "react-bootstrap";

const Cell = ({ cellData, onCellClick }) => {
  const { numberOfChanges, date, changesMade } = cellData;

  const setColor = (value) => {
    if (value < 5) {
      return "#dce0e5";
    } else if (value < 7) {
      return "#fda08b";
    } else if (value <= 7 || value < 9) {
      return "#fc8d72";
    } else if (value <= 9 || value < 12) {
      return "#fc7759";
    } else if (value <= 12 || value < 16) {
      return "#fc6340";
    }
  };
  let style = {
    backgroundColor: setColor(numberOfChanges),
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip">{`${numberOfChanges} changes at ${props}`}</Tooltip>
  );
  return (
    <OverlayTrigger placement="top" overlay={renderTooltip(date)}>
      <div
        className="calender-cells-cell"
        style={style}
        onClick={onCellClick}
      ></div>
    </OverlayTrigger>
  );
};

export default Cell;
