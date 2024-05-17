import React, { useEffect, useRef } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";

const DateComponent = ({ setOpen, dates, setDates }) => {
  const refOne = useRef(null);
  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
    return () => {
      document.removeEventListener("click", hideOnClickOutside, true);
    };
  }, []);
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };
  return (
    <div ref={refOne}>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setDates([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={dates}
        minDate={new Date()}
        months={2}
        direction="horizontal"
        className=" bg-white p-2 rounded-md shadow-md mt-2"
      />
    </div>
  );
};

export default DateComponent;
