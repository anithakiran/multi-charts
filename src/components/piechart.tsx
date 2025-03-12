"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const PieChartPlot = () => {
  const colors = [
    "#8884d8",
    "#FA8072",
    "#AF69EE",
    "#3DED97",
    "#3AC7EB",
    "#F9A603",
  ];

  const data = [
    { name: "Stocks", value: 4000 },
    { name: "Bonds", value: 3000 },
    { name: "Crypto", value: 2000 },
    { name: "Real Estate", value: 5000 },
    { name: "Commodities", value: 2500 },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Portfolio Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
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
  );
};

export default PieChartPlot;
