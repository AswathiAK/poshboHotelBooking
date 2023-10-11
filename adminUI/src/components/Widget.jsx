import React from 'react'
import { Link } from "react-router-dom";
import useFetch from '../hooks/useFetch';

const Widget = ({ type }) => {
  let data;
  const { data: hotels } = useFetch('/admin/hotels'); 
  const { data: earnings } = useFetch('/admin/earnings');
  switch (type) {
    case "Hotels":
      data = {
        title: "Hotels",
        isMoney: false,
        link: "View all Hotels", 
        count:hotels?.length
      };
      break;
    case "Sales":
      data = {
        title: "Sales",
        isMoney: true,
        total:earnings?.totalSales
      };
      break;
    case "Revenue":
      data = {
        title: "Revenue",
        isMoney: true,
        total:earnings?.revenue
      };
      break;
    default:
      break;
  }

  return (
    <div className='flex justify-between p-2.5 w-full h-28 rounded-lg shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)]'>
      <div className="flex flex-col justify-between">
        <span className="font-bold text-sm text-gray-700">{data.title}</span>
        <span className="text-xl font-light">
          {data.isMoney ? "Rs. " + (data.total ? data.total.toFixed(2) : '0.00')
            : "Total No. of Properties: " + data.count
          }
        </span>
        <span className="text-sm">
          <Link to={'/hotels'}>
            {data.link}
          </Link>
        </span>
      </div>
      
    </div>
  )
}

export default Widget
