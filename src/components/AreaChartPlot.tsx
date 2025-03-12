"use client";

import { useState, useEffect, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define TypeScript Interface for Stock Data
interface StockData {
  year: number;
  Stock1: number;
  Stock2: number;
}

// Fetch Random Stock Data with Proper Typing
const fetchStockData = async (): Promise<StockData[]> => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false"
    );
    const data: { current_price: number }[] = await response.json();

    return data.map((item, index) => ({
      year: 2016 + index, // Simulated years
      Stock1: item.current_price * (1 + Math.random() * 0.2), // Random fluctuation
      Stock2: item.current_price * (1 - Math.random() * 0.2),
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const AreaChartPlot = () => {
  const [data, setData] = useState<StockData[]>([]);

  // Use useCallback to memoize the function
  const loadData = useCallback(async () => {
    const fetchedData = await fetchStockData();
    setData(fetchedData);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Stock Price Comparison
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorStock1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorStock2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Stock1"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorStock1)"
          />
          <Area
            type="monotone"
            dataKey="Stock2"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorStock2)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartPlot;
