import React from 'react'
import useFetch from '../hooks/useFetch';
import Loader from './Loader';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const LoadBarChart = () => {
  const { data, loading, error } = useFetch('/admin/barchart');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const chartData = data?.map((item, index) => ({
    id: index + 1,
    label: months[item._id.month - 1],
    sales: item.totalSales
  }));

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader/>
        </div>
      ) : error ? (
          <div className="flex items-center justify-center h-full">
            {error}
          </div>
        ) : data ? (
            <div className="">
              <h1 className="font-bold mb-5">Total Sales</h1>
              <BarChart width={600} height={300} data={chartData}>
                <XAxis dataKey="label" stroke="#8884d8" />
                <YAxis />
                <Tooltip wrapperStyle={{ width: 140, backgroundColor: '#ccc' }} />
                <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="sales" fill="#8884d8" barSize={30} />
              </BarChart>
            </div>
          ) : (
              <div className="flex items-center justify-center h-full">
                No data
              </div>
      )}
    </div>
  )
}

export default LoadBarChart
