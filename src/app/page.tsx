"use client";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Charts from "../components/Charts";
import AreaChartPlot from "@/components/AreaChartPlot";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const sampleData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4000 },
  { name: "May", value: 6000 },
];

const pieData = [
  { name: "Stocks", value: 40 },
  { name: "Bonds", value: 25 },
  { name: "Crypto", value: 15 },
  { name: "Real Estate", value: 20 },
];

const colors = ["#8884d8", "#FA8072", "#AF69EE", "#3DED97"];

const Home: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow ml-64 relative">
        <Navbar />
        <Charts />
        <AreaChartPlot data={[]} />

        {/* Bar Chart Section */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Bar Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sampleData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart Section */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Pie Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default Home;
