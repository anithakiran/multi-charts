"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Fetch Random Stock Data
const fetchStockData = async () => {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false");
    const data = await response.json();

    return data.map((item: any, index: number) => ({
      year: 2016 + index, // Random years
      Stock1: item.current_price * (1 + Math.random() * 0.2), // Random fluctuation
      Stock2: item.current_price * (1 - Math.random() * 0.2),
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const AreaChartPlot = () => {
  const [data, setData] = useState<{ year: number; Stock1: number; Stock2: number }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchStockData();
      setData(fetchedData);
    };
    loadData();
  }, []);

  return (
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
        <Area type="monotone" dataKey="Stock1" stroke="#8884d8" fillOpacity={1} fill="url(#colorStock1)" />
        <Area type="monotone" dataKey="Stock2" stroke="#82ca9d" fillOpacity={1} fill="url(#colorStock2)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartPlot;
