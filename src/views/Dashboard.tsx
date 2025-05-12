import React, { useEffect, useState, useCallback } from "react";
import { useResponsiveChart } from "../hooks/useResponsiveChart";
import { useGroundingChart, DataPoint } from "../hooks/useGroundingChart";
import api from "../plugins/api";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function Dashboard() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [activeMetric, setActiveMetric] = useState<
    "ground_resistance" | "temperature"
  >("ground_resistance");
  const { containerRef, dimensions } = useResponsiveChart();

  // Fetch data function with debouncing mechanism
  const fetchData = useCallback(async () => {
    try {
      const res = await api.get("/sensor-data/");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching sensor data", error);
    }
  }, []);

  useEffect(() => {
    // Fetch data immediately when the component mounts
    fetchData();

    //Interval for future fetches (every 5 seconds)
    const interval = setInterval(fetchData, 3000); // Change interval to 5 seconds
    return () => clearInterval(interval);
  }, [fetchData]);

  // Initial state of activeMetric from localStorage if available
  useEffect(() => {
    const savedMetric = localStorage.getItem("activeMetric");
    if (savedMetric) {
      setActiveMetric(savedMetric as "ground_resistance" | "temperature");
    }
  }, []);

  // Persist activeMetric to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeMetric", activeMetric);
  }, [activeMetric]);

  // Pass data, activeMetric, and dimensions to the useGroundingChart hook
  useGroundingChart(data, activeMetric, dimensions);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <Navbar />

      <main className="flex-grow max-w-9xl mx-auto p-6 mt-1">
        <div>
          <h1 className="text-3xl font-semibold mb-6 text-center font-poppins">
            <span className="font-medium text-gray-400">[Demo]</span> Real-Time
            Grounding & Resistance Monitor
          </h1>
        </div>

        {/* Metric Selection Buttons */}
        <div className="flex gap-4 mb-4 justify-center">
          <button
            className={`px-4 py-2 rounded font-medium ${
              activeMetric === "ground_resistance"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border"
            }`}
            onClick={() => setActiveMetric("ground_resistance")}
          >
            Ground Resistance
          </button>
          <button
            className={`px-4 py-2 rounded font-medium ${
              activeMetric === "temperature"
                ? "bg-yellow-500 text-white"
                : "bg-white text-yellow-500 border"
            }`}
            onClick={() => setActiveMetric("temperature")}
          >
            Temperature
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chart Panel */}
          <div
            className="w-full px-0 py-0 bg-white rounded-xl shadow-md p-4 sticky lg:top-24"
            ref={containerRef}
          >
            <svg id="chart" className="w-full h-72"></svg>
          </div>

          {/* Latest Reading Table */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              📊 Latest Reading
            </h3>
            {data.slice(-1).map((d, i) => (
              <table
                key={i}
                className="w-full table-auto text-base text-gray-700"
              >
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Metric</th>
                    <th className="px-4 py-2 text-left">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-blue-50">
                    <td className="border px-4 py-2 text-blue-500 font-semibold">
                      Ground Resistance
                    </td>
                    <td className="border px-10 py-2 text-blue-700 font-bold">
                      {d.ground_resistance} Ω
                    </td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border px-4 py-2 text-yellow-600 font-semibold">
                      Temperature
                    </td>
                    <td className="border px-4 py-2 text-yellow-800 font-bold">
                      {d.temperature} °C
                    </td>
                  </tr>
                  <tr className={d.fault_status ? "bg-red-50" : "bg-green-50"}>
                    <td
                      className={`border px-4 py-2 font-semibold ${
                        d.fault_status ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      Fault Status
                    </td>
                    <td
                      className={`border px-4 py-2 font-bold ${
                        d.fault_status ? "text-red-700" : "text-green-700"
                      }`}
                    >
                      {d.fault_status ? "⚠️ YES" : "✅ NO"}
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
