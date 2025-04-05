"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const BlueberryFarmingComparison = () => {
  // Data from our analysis
  const yearlyData = [
    {
      year: 1,
      originalProduction: 22.5, // in tonnes
      importedProduction: 60, // in tonnes
      originalProfit: -11, // in lakhs (showing as negative)
      importedProfit: 364, // in lakhs
      originalCumulativeCashFlow: -836, // in lakhs
      importedCumulativeCashFlow: -1406, // in lakhs
    },
    {
      year: 2,
      originalProduction: 60,
      importedProduction: 120,
      originalProfit: 514,
      importedProfit: 1114,
      originalCumulativeCashFlow: -322,
      importedCumulativeCashFlow: -292,
    },
    {
      year: 3,
      originalProduction: 120,
      importedProduction: 270,
      originalProfit: 1114,
      importedProfit: 2605,
      originalCumulativeCashFlow: 792,
      importedCumulativeCashFlow: 2313,
    },
    {
      year: 4,
      originalProduction: 180,
      importedProduction: 270,
      originalProfit: 1714,
      importedProfit: 2605,
      originalCumulativeCashFlow: 2506,
      importedCumulativeCashFlow: 4918,
    },
    {
      year: 5,
      originalProduction: 180,
      importedProduction: 270,
      originalProfit: 1714,
      importedProfit: 2605,
      originalCumulativeCashFlow: 4220,
      importedCumulativeCashFlow: 7523,
    },
  ];

  const keyMetrics = [
    {
      name: "Initial Investment",
      original: 836, // in lakhs
      imported: 1406, // in lakhs
    },
    {
      name: "Payback Period (Years)",
      original: 2.3,
      imported: 1.94,
    },
    {
      name: "Year 5 ROI (%)",
      original: 503.47,
      imported: 561.04,
    },
    {
      name: "Total 5-Year Profit (Cr)",
      original: 50.45,
      imported: 92.94,
    },
  ];

  return (
    <div className="w-full p-4 space-y-8">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">
          Blueberry Farming Financial Analysis: Traditional vs. Imported Plants
        </h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Key Metrics Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border p-2 text-left">Metric</th>
                  <th className="border p-2 text-right">Traditional Setup</th>
                  <th className="border p-2 text-right">Imported Plants</th>
                  <th className="border p-2 text-right">Difference</th>
                </tr>
              </thead>
              <tbody>
                {keyMetrics.map((metric, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="border p-2 font-medium">{metric.name}</td>
                    <td className="border p-2 text-right">
                      {metric.name.includes("Period")
                        ? `${metric.original.toFixed(2)} years`
                        : metric.name.includes("ROI")
                        ? `${metric.original.toFixed(2)}%`
                        : `₹${(metric.original / 100).toFixed(2)} Cr`}
                    </td>
                    <td className="border p-2 text-right">
                      {metric.name.includes("Period")
                        ? `${metric.imported.toFixed(2)} years`
                        : metric.name.includes("ROI")
                        ? `${metric.imported.toFixed(2)}%`
                        : `₹${(metric.imported / 100).toFixed(2)} Cr`}
                    </td>
                    <td className="border p-2 text-right">
                      {metric.name.includes("Period")
                        ? `${(metric.original - metric.imported).toFixed(
                            2
                          )} years`
                        : metric.name.includes("ROI")
                        ? `${(metric.imported - metric.original).toFixed(2)}%`
                        : `₹${(
                            (metric.imported - metric.original) /
                            100
                          ).toFixed(2)} Cr`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Annual Production</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  label={{
                    value: "Year",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis
                  label={{
                    value: "Production (tonnes)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip formatter={(value) => `${value} tonnes`} />
                <Legend />
                <Bar
                  dataKey="originalProduction"
                  name="Traditional Setup"
                  fill="#8884d8"
                />
                <Bar
                  dataKey="importedProduction"
                  name="Imported Plants"
                  fill="#82ca9d"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Annual Profit</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  label={{
                    value: "Year",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis
                  label={{
                    value: "Profit (₹ Lakhs)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip formatter={(value) => `₹${value} Lakhs`} />
                <Legend />
                <Bar
                  dataKey="originalProfit"
                  name="Traditional Setup"
                  fill="#8884d8"
                />
                <Bar
                  dataKey="importedProfit"
                  name="Imported Plants"
                  fill="#82ca9d"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Cumulative Cash Flow</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="year"
                label={{ value: "Year", position: "insideBottom", offset: -5 }}
              />
              <YAxis
                label={{
                  value: "Cash Flow (₹ Lakhs)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip formatter={(value) => `₹${value} Lakhs`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="originalCumulativeCashFlow"
                name="Traditional Setup"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="importedCumulativeCashFlow"
                name="Imported Plants"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">
          Financial Analysis Summary
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            The imported plants model requires a higher initial investment
            (₹14.06 Cr vs ₹8.36 Cr) but delivers significantly accelerated
            returns.
          </li>
          <li>
            Payback period is reduced by 0.36 years (approximately 4.3 months)
            with imported plants.
          </li>
          <li>
            By Year 5, the imported plants model generates 52% higher annual
            profits (₹26.05 Cr vs ₹17.14 Cr).
          </li>
          <li>
            The total 5-year profit advantage is ₹42.49 Cr with the imported
            plants model.
          </li>
          <li>
            Production stabilizes at 270 tonnes annually with imported plants vs
            180 tonnes with traditional setup.
          </li>
          <li>
            The imported plants model reaches full production capacity by Year
            3, while the traditional model reaches it in Year 4.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlueberryFarmingComparison;
