import React, { useState } from "react";
import moment from "moment";

import changes from "./Data/changes.json";
import changesOn26 from "./Data/26-11-2020.json";
import changesOn7 from "./Data/07-01-2021.json";
import Cell from "./Cell";
import WeekDay from "./WeekDay";
import Month from "./Month";

const colorRange = ["#dce0e5", "#fda08b", "#fc8d72", "#fc7759", "#fc6340"];

const Calender = ({ range }) => {
  const [clickedCell, setClickedCell] = useState({
    date: null,
    change: [],
    number: 0,
  });

  let days = Math.abs(range[0].diff(range[1], "days"));
  let cells = Array.from(new Array(days));
  let weekDays = Array.from(new Array(7));
  let months = Array.from(new Array(Math.floor(days / 7)));

  let startDate = range[0];

  const showDetails = (date, number, change) => {
    setClickedCell({ date: date, change: change, number: number });
  };

  return (
    <div className="calender">
      <h1 className="title">Change Heat Map</h1>
      <div className="calender-months">
        {months.map((item, index) => (
          <Month key={index} index={index} startDate={startDate} />
        ))}
      </div>
      <div className="calender-body">
        <div className="calender-weekdays">
          {weekDays.map((item, index) => (
            <WeekDay key={index} index={index} startDate={startDate} />
          ))}
        </div>

        <div className="calender-cells">
          {cells.map((item, index) => {
            let date = moment(startDate).add(index, "day");
            let cellData = {
              numberOfChanges: "0",
              date: moment(date).format("MMMM Do YYYY"),
              changesMade: {},
            };
            let object = changes.counts;
            (function () {
              Object.keys(object).find((key) => {
                if (key === moment(date).format("YYYY-MM-DD")) {
                  cellData.numberOfChanges = object[key];
                  if (key === "2020-11-26") {
                    cellData.changesMade = changesOn26;
                  } else if (key === "2021-01-07") {
                    cellData.changesMade = changesOn7;
                  } else {
                    cellData.changesMade = [
                      {
                        type: "ADDED",
                        date: "2020-11-26",
                        holderId: "ABC",
                        productId: "3ed59e50-572d-4883-ad0a-2282c786506e",
                        description:
                          "ABC added a new Residential Mortgages product named ABC Product 3",
                      },
                    ];
                  }
                }
              });
            })();

            return (
              <Cell
                key={index}
                index={index}
                cellData={cellData}
                onCellClick={() =>
                  showDetails(
                    cellData.date,
                    cellData.numberOfChanges,
                    cellData.changesMade
                  )
                }
              />
            );
          })}
        </div>
      </div>
      <div className="calender-footer">
        <div className="footer-label">Less</div>

        {colorRange.map((item, index) => (
          <div
            key={index}
            className="calender-cells-cell"
            style={{ backgroundColor: item }}
          ></div>
        ))}

        <div className="footer-label">More</div>
      </div>
      <div className="details">
        {clickedCell.number <= 0 ? (
          <h2>Select a box to view changes for that date</h2>
        ) : (
          <>
            <h2>{`Showing ${clickedCell.number} changes that occured ${clickedCell.date}`}</h2>
            <ul>
              {clickedCell.change.map((item, index) => {
                return (
                  <li key={index} className="list-item">
                    {item.description}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Calender;
