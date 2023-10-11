import React from 'react'
import LoadBarChart from '../components/LoadBarChart';
import LoadPieChart from '../components/LoadPieChart';
import Widget from '../components/Widget';

const HomePage = () => {
  return (
    <div className='m-5'>
      <div className="flex p-5 gap-5 mb-10">
        <Widget type="Hotels" />
        <Widget type="Sales" />
        <Widget type="Revenue" />
      </div>
      <div className="flex items-center gap-16">
        <LoadBarChart />
        <LoadPieChart />
      </div>
    </div>
  )
}

export default HomePage

