"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Define the type for stock data
interface StockData {
  name: string; // Month
  high: number;
  low: number;
}

const BarChartPlot: React.FC = () => {
  const [data, setData] = useState<StockData[]>([]);

  useEffect(() => {
    // Function to fetch stock data (random API for simulation)
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          "https://api.coindesk.com/v1/bpi/historical/close.json?currency=USD"
        );
        const jsonData = await response.json();

        const rawData = jsonData.bpi;
        const formattedData: StockData[] = Object.entries(rawData).map(
          ([date, price]) => ({
            name: new Date(date).toLocaleString("default", { month: "short" }), // Convert to Month
            high: Number(price) + Math.floor(Math.random() * 500), // Simulated high
            low: Number(price) - Math.floor(Math.random() * 500), // Simulated low
          })
        );

        setData(formattedData.slice(-7)); // Take last 7 months for display
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-white text-lg font-semibold mb-2">
        Stock Highs & Lows
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Bar dataKey="high" fill="#82ca9d" name="High Price" />
          <Bar dataKey="low" fill="#FA8072" name="Low Price" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartPlot;
