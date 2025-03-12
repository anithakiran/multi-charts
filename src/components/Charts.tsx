"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

// Define Type for Data
interface ChartData {
  name: string;
  returns: number;
  sales: number;
  subscriptions: number;
}

// Sample Data
const data: ChartData[] = [
  { name: "Jan", returns: 30000, sales: 25000, subscriptions: 15000 },
  { name: "Feb", returns: 32000, sales: 27000, subscriptions: 16000 },
  { name: "Mar", returns: 34000, sales: 29000, subscriptions: 17000 },
  { name: "Apr", returns: 37000, sales: 31000, subscriptions: 18000 },
  { name: "May", returns: 40000, sales: 33000, subscriptions: 20000 },
];

// Reusable Stat Box Component
const StatBox = ({
  title,
  value,
  percentage,
}: {
  title: string;
  value: number;
  percentage: string;
}) => (
  <div className="flex flex-col items-center p-4 bg-gray-800 shadow rounded-lg">
    <p className="text-gray-300 font-semibold">{title}</p>
    <p className="py-2 text-xl font-bold text-white">
      ${value.toLocaleString()}
    </p>
    <p className={`text-${percentage.startsWith("-") ? "red" : "green"}-400`}>
      {percentage.startsWith("-") ? "" : "+"}
      {percentage}%
    </p>
  </div>
);

const Charts: React.FC = () => {
  // Calculate Percentage Change
  const calcPercentage = (key: keyof ChartData): string => {
    if (data.length < 2) return "0";
    const firstValue = data[0][key];
    const lastValue = data[data.length - 1][key];
    return (((lastValue - firstValue) / firstValue) * 100).toFixed(1);
  };

  return (
    <>
      {/* Top Stats Section */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 m-4">
          <StatBox
            title="Total Returns"
            value={data[data.length - 1].returns}
            percentage={calcPercentage("returns")}
          />
          <StatBox
            title="Total Sales"
            value={data[data.length - 1].sales}
            percentage={calcPercentage("sales")}
          />
          <StatBox
            title="Total Subscriptions"
            value={data[data.length - 1].subscriptions}
            percentage={calcPercentage("subscriptions")}
          />
          <StatBox
            title="Total Revenue"
            value={
              data[data.length - 1].returns +
              data[data.length - 1].sales +
              data[data.length - 1].subscriptions
            }
            percentage={calcPercentage("returns")}
          />
        </div>
      </section>

      {/* Two Large Charts */}
      <section className="flex flex-wrap my-4 px-4 gap-4">
        <div className="w-full md:w-1/2 h-[300px] bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-white mb-2">Returns Over Time</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="returns"
                stroke="#00ff00"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full md:w-1/2 h-[300px] bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-white mb-2">Sales Over Time</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#ff9900"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Three Smaller Charts */}
      <section className="flex flex-wrap my-4 px-4 gap-4">
        <div className="w-full sm:w-1/3 h-[250px] bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-white mb-2">Subscriptions</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="subscriptions" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full sm:w-1/3 h-[250px] bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-white mb-2">Revenue</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="returns" fill="#00ff00" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full sm:w-1/3 h-[250px] bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-white mb-2">Sales vs Returns</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#ff9900"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="returns"
                stroke="#00ff00"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  );
};

export default Charts;
