import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import useFetch from '../hooks/useFetch';
import Loader from './Loader';

const LoadPieChart = () => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const { data:pieData, loading, error } = useFetch('admin/piechart');
  const data = pieData?.map((item, index) => ({
    name: item._id,
    value: item.count,
  }));

  return (
    <div className="flex h-full justify-between flex-col">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      ) : error ? (
          <div className="flex items-center justify-center h-full">
            {error}
          </div>
        ) : data ? (
            <div className="">
              <h1 className="font-bold">Booking Status</h1>
              <div className="flex items-center justify-between gap-2 text-sm">
                <ResponsiveContainer width="99%" height={300}>
                  <PieChart>
                    <Tooltip
                      contentStyle={{ background: "white", borderRadius: "5px" }}
                    />
                    <Pie
                      data={data}
                      innerRadius={"70%"}
                      outerRadius={"90%"}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.map((item,index) => (
                        <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between gap-2 text-sm">
                {data.map((item,index) => (
                  <div className="flex flex-col gap-2 items-center" key={item.name}>
                    <div className="flex gap-2 items-center">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span>{item.name}</span>
                    </div>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
              <div className="flex items-center justify-center h-full">
                No data
              </div>
      )}
    </div>
  );
};

export default LoadPieChart;


