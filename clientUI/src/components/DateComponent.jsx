import React, { useEffect, useRef, useState, } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import { addDays } from 'date-fns';

const DateComponent = () => {
  const refOne = useRef(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(),3),
      key: 'selection'
    }
  ]);
  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };
  return (
    <div>
      <div className="text-gray-400 hidden lg:flex" onClick={() => setOpen(open => !open)}>
        {`${format(date[0].startDate, "dd/MM/yyyy")} - ${format(date[0].endDate, "dd/MM/yyyy")}`}                  
      </div>
      <div ref={refOne} className='absolute top-9 -right-56'>
        {open &&
        <DateRange
          editableDateInputs={true}
          onChange={item => setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
          minDate={new Date()}
          months={2}
          direction='horizontal'
          className=" bg-white p-2 rounded-md shadow-md mt-2"
        />
        }
      </div>  
    </div>
  )
}

export default DateComponent
