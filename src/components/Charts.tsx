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

// Define the type for each data point
interface ChartData {
  name: string;
  returns: number;
  sales: number;
  subscriptions: number;
}

const data: ChartData[] = [
  { name: "Jan", returns: 30000, sales: 25000, subscriptions: 15000 },
  { name: "Feb", returns: 32000, sales: 27000, subscriptions: 16000 },
  { name: "Mar", returns: 34000, sales: 29000, subscriptions: 17000 },
  { name: "Apr", returns: 37000, sales: 31000, subscriptions: 18000 },
  { name: "May", returns: 40000, sales: 33000, subscriptions: 20000 },
];

const Charts: React.FC = () => {
  return (
    <>
      {/* Top Stats Section */}
      <section>
        <div className="grid grid-cols-4 gap-4 m-4">
          {[
            { title: "Total Returns", key: "returns" },
            { title: "Total Sales", key: "sales" },
            { title: "Total Subscriptions", key: "subscriptions" },
            { title: "Total Revenue", key: "returns" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-gray-800 shadow rounded-lg"
            >
              <p className="text-gray-300 font-semibold">{item.title}</p>
              <p className="py-2 text-xl font-bold text-white">
                ${data[data.length - 1][item.key as keyof ChartData]}
              </p>
              <p className="text-green-400">
                +
                {data.length > 1
                  ? (
                      ((Number(
                        data[data.length - 1][item.key as keyof ChartData]
                      ) -
                        Number(data[0][item.key as keyof ChartData])) /
                        Number(data[0][item.key as keyof ChartData])) *
                      100
                    ).toFixed(1)
                  : "0"}
                %
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Two Large Charts */}
      <section className="flex my-4 px-4 gap-4">
        <div className="w-1/2 h-[300px] bg-gray-800 rounded-lg shadow p-4">
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

        <div className="w-1/2 h-[300px] bg-gray-800 rounded-lg shadow p-4">
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
      <section className="flex my-4 px-4 gap-4">
        <div className="w-1/3 h-[250px] bg-gray-800 rounded-lg shadow p-4">
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

        <div className="w-1/3 h-[250px] bg-gray-800 rounded-lg shadow p-4">
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

        <div className="w-1/3 h-[250px] bg-gray-800 rounded-lg shadow p-4">
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
