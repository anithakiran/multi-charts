"use client";

import { useEffect, useState } from "react";

interface StockMeta {
  currency: string;
  symbol: string;
  exchangeName: string;
  instrumentType: string;
  regularMarketPrice: number;
  previousClose: number;
}

interface StockResult {
  meta: StockMeta;
}

const StockData = () => {
  const [stocks, setStocks] = useState<StockResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://query1.finance.yahoo.com/v8/finance/chart/AAPL") // Fetch Apple stock data
      .then((res) => res.json())
      .then((data) => {
        if (data.chart?.result && data.chart.result[0]?.meta) {
          setStocks(data.chart.result[0]);
        } else {
          setError("Invalid data structure received");
        }
      })
      .catch((err) => {
        console.error("Error fetching stock data:", err);
        setError("Failed to fetch stock data");
      });
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">Stock Data (AAPL)</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : stocks ? (
        <div>
          <p>
            <strong>Latest Price:</strong> $
            {stocks.meta.regularMarketPrice.toFixed(2)}
          </p>
          <p>
            <strong>Previous Close:</strong> $
            {stocks.meta.previousClose.toFixed(2)}
          </p>
          <p>
            <strong>Exchange:</strong> {stocks.meta.exchangeName}
          </p>
          <p>
            <strong>Currency:</strong> {stocks.meta.currency}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default StockData;
