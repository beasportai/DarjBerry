"use client";

import React, { useState } from "react";
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

const BlueberryThreeScenarioAnalysis = () => {
  const [activeTab, setActiveTab] = useState("financial");

  const researchQuestion = {
    title: "Hydroponic Blueberry Farming",
    date: "04/04/2025",
    premise: [
      "Blueberries are linked to better cognition, memory, and overall cellular health.",
      "Rich antioxidant content, particularly anthocyanins, help reduce oxidative stress.",
      "Bryan Johnson, longevity expert, recommends 50g of Blueberries daily in the Protocol diet.",
      "Market price for imported blueberries ranges from ₹940 to ₹1,539.54 per kg.",
      "India has become a leading importer, with imports surging from near-zero in 2009 to 1,900 tonnes in 2020.",
      "India produces around 700-800 tons of fresh blueberries annually.",
    ],
    opportunity:
      "Build a high-tech hydroponic Blueberry Farm of the tastiest varieties, including Emerald, Jewel, and Biloxi.",
    solution:
      "Import mature blueberry plants from Peru. Grow them in India in a climate-controlled hydroponic farm setup.",
  };

  // Financial data for three scenarios from our analysis
  const yearlyData = [
    {
      year: 1,
      originalProduction: 22.5, // in tonnes
      imported25Production: 60, // in tonnes
      imported3Production: 120, // in tonnes
      originalProfit: -11, // in lakhs (showing as negative)
      imported25Profit: 364, // in lakhs
      imported3Profit: 964, // in lakhs
      originalCumulativeCashFlow: -836, // in lakhs
      imported25CumulativeCashFlow: -1338, // in lakhs
      imported3CumulativeCashFlow: -1530, // in lakhs
    },
    {
      year: 2,
      originalProduction: 60,
      imported25Production: 120,
      imported3Production: 234,
      originalProfit: 514,
      imported25Profit: 1114,
      imported3Profit: 2241,
      originalCumulativeCashFlow: -322,
      imported25CumulativeCashFlow: -224,
      imported3CumulativeCashFlow: -566,
    },
    {
      year: 3,
      originalProduction: 120,
      imported25Production: 216,
      imported3Production: 234,
      originalProfit: 1114,
      imported25Profit: 2065,
      imported3Profit: 2241,
      originalCumulativeCashFlow: 792,
      imported25CumulativeCashFlow: 1841,
      imported3CumulativeCashFlow: 1675,
    },
    {
      year: 4,
      originalProduction: 180,
      imported25Production: 216,
      imported3Production: 234,
      originalProfit: 1714,
      imported25Profit: 2065,
      imported3Profit: 2241,
      originalCumulativeCashFlow: 2506,
      imported25CumulativeCashFlow: 3906,
      imported3CumulativeCashFlow: 3916,
    },
    {
      year: 5,
      originalProduction: 180,
      imported25Production: 216,
      imported3Production: 234,
      originalProfit: 1714,
      imported25Profit: 2065,
      imported3Profit: 2241,
      originalCumulativeCashFlow: 4220,
      imported25CumulativeCashFlow: 5971,
      imported3CumulativeCashFlow: 6157,
    },
  ];

  const keyMetrics = [
    {
      name: "Initial Investment (₹)",
      original: 83600000, // 8.36 Cr
      year25: 133800000, // 13.38 Cr
      year3: 153000000, // 15.30 Cr
    },
    {
      name: "Payback Period (Years)",
      original: 2.3,
      year25: 1.87,
      year3: 1.25,
    },
    {
      name: "Total 5-Year Profit (₹)",
      original: 504500000, // 50.45 Cr
      year25: 767400000, // 76.74 Cr
      year3: 992800000, // 99.28 Cr
    },
    {
      name: "Year 5 ROI (%)",
      original: 503.47,
      year25: 473.34,
      year3: 549.02,
    },
    {
      name: "Max Annual Production (tonnes)",
      original: 180,
      year25: 216,
      year3: 234,
    },
  ];

  // Format currency values
  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} Lakh`;
    } else {
      return `₹${value.toFixed(2)}`;
    }
  };

  return (
    <div className="w-full p-4 space-y-6">
      {/* Research Question and Hypothesis */}
      <div className="bg-blue-50 p-4 rounded-lg shadow border border-blue-200">
        <h2 className="text-xl font-bold mb-2">{researchQuestion.title}</h2>
        <h4 className="text-lg font-semibold mb-1">{researchQuestion.date}</h4>

        <h4 className="font-medium mt-3 mb-1">Premise:</h4>
        <ul className="list-disc pl-6 space-y-1 mb-3">
          {researchQuestion.premise.map((point, i) => (
            <li key={i} className="text-sm">
              {point}
            </li>
          ))}
        </ul>

        <h4 className="font-medium mt-3 mb-1">Opportunity:</h4>
        <p className="text-sm mb-2">{researchQuestion.opportunity}</p>

        <h4 className="font-medium mt-3 mb-1">Proposed Solution:</h4>
        <p className="text-sm">{researchQuestion.solution}</p>

        <p className="text-sm mt-3 mb-1">
          What we are most excited about is that the payback period is
          significantly reduced when importing mature plants from Peru.
        </p>
      </div>

      {/* Tabs for different analyses */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("financial")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "financial"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Financial Analysis
          </button>
          <button
            onClick={() => setActiveTab("production")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "production"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Production Analysis
          </button>
          <button
            onClick={() => setActiveTab("cashflow")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "cashflow"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Cash Flow Analysis
          </button>
        </nav>
      </div>

      {/* Key Metrics Table - Always visible */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3">
          Key Financial Metrics Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border p-2 text-left">Metric</th>
                <th className="border p-2 text-right">Traditional Setup</th>
                <th className="border p-2 text-right">2.5-Year Plants</th>
                <th className="border p-2 text-right">3-Year Plants</th>
              </tr>
            </thead>
            <tbody>
              {keyMetrics.map((metric, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="border p-2 font-medium">{metric.name}</td>
                  <td className="border p-2 text-right">
                    {metric.name.includes("Period")
                      ? `${metric.original.toFixed(2)} years`
                      : metric.name.includes("ROI")
                      ? `${metric.original.toFixed(2)}%`
                      : metric.name.includes("Production")
                      ? `${metric.original} tonnes`
                      : formatCurrency(metric.original)}
                  </td>
                  <td className="border p-2 text-right">
                    {metric.name.includes("Period")
                      ? `${metric.year25.toFixed(2)} years`
                      : metric.name.includes("ROI")
                      ? `${metric.year25.toFixed(2)}%`
                      : metric.name.includes("Production")
                      ? `${metric.year25} tonnes`
                      : formatCurrency(metric.year25)}
                  </td>
                  <td className="border p-2 text-right">
                    {metric.name.includes("Period")
                      ? `${metric.year3.toFixed(2)} years`
                      : metric.name.includes("ROI")
                      ? `${metric.year3.toFixed(2)}%`
                      : metric.name.includes("Production")
                      ? `${metric.year3} tonnes`
                      : formatCurrency(metric.year3)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "financial" && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">
            Annual Profit Comparison
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="year"
                label={{ value: "Year", position: "insideBottom", offset: -5 }}
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
                dataKey="imported25Profit"
                name="2.5-Year Plants"
                fill="#82ca9d"
              />
              <Bar
                dataKey="imported3Profit"
                name="3-Year Plants"
                fill="#ffc658"
              />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6">
            <h4 className="font-medium mb-2">Annual Profit Breakdown</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Year</th>
                    <th className="border p-2">Traditional Setup</th>
                    <th className="border p-2">2.5-Year Plants</th>
                    <th className="border p-2">3-Year Plants</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyData.map((data) => (
                    <tr key={data.year}>
                      <td className="border p-2 text-center">{data.year}</td>
                      <td className="border p-2 text-right">
                        {data.originalProfit < 0
                          ? `-₹${Math.abs(data.originalProfit / 100).toFixed(
                              2
                            )} Lakh`
                          : `₹${(data.originalProfit / 100).toFixed(2)} Cr`}
                      </td>
                      <td className="border p-2 text-right">{`₹${(
                        data.imported25Profit / 100
                      ).toFixed(2)} Cr`}</td>
                      <td className="border p-2 text-right">{`₹${(
                        data.imported3Profit / 100
                      ).toFixed(2)} Cr`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "production" && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">
            Annual Production Comparison
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="year"
                label={{ value: "Year", position: "insideBottom", offset: -5 }}
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
                dataKey="imported25Production"
                name="2.5-Year Plants"
                fill="#82ca9d"
              />
              <Bar
                dataKey="imported3Production"
                name="3-Year Plants"
                fill="#ffc658"
              />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6">
            <h4 className="font-medium mb-2">Production Highlights</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                The traditional setup takes 4 years to reach maximum production
                of 180 tonnes.
              </li>
              <li>
                With 2.5-year imported plants, maximum production of 216 tonnes
                is reached by Year 3.
              </li>
              <li>
                With 3-year imported plants that fruit immediately, maximum
                production of 234 tonnes is reached in Year 1.
              </li>
              <li>
                Total 5-year production: Traditional (562.5 tonnes), 2.5-Year
                Plants (732 tonnes), 3-Year Plants (1,056 tonnes).
              </li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "cashflow" && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Cumulative Cash Flow</h3>
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
                dataKey="imported25CumulativeCashFlow"
                name="2.5-Year Plants"
                stroke="#82ca9d"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="imported3CumulativeCashFlow"
                name="3-Year Plants"
                stroke="#ffc658"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-6">
            <h4 className="font-medium mb-2">Cash Flow & Payback Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-3 rounded-md border border-purple-200">
                <h5 className="font-medium text-purple-800 mb-1">
                  Traditional Setup
                </h5>
                <p className="text-sm mb-1">
                  Initial Investment: {formatCurrency(keyMetrics[0].original)}
                </p>
                <p className="text-sm mb-1">
                  Payback Period: {keyMetrics[1].original.toFixed(2)} years
                </p>
                <p className="text-sm">Breaks even during: Year 3</p>
              </div>

              <div className="bg-green-50 p-3 rounded-md border border-green-200">
                <h5 className="font-medium text-green-800 mb-1">
                  2.5-Year Plants
                </h5>
                <p className="text-sm mb-1">
                  Initial Investment: {formatCurrency(keyMetrics[0].year25)}
                </p>
                <p className="text-sm mb-1">
                  Payback Period: {keyMetrics[1].year25.toFixed(2)} years
                </p>
                <p className="text-sm">Breaks even during: Year 2</p>
              </div>

              <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                <h5 className="font-medium text-yellow-800 mb-1">
                  3-Year Plants
                </h5>
                <p className="text-sm mb-1">
                  Initial Investment: {formatCurrency(keyMetrics[0].year3)}
                </p>
                <p className="text-sm mb-1">
                  Payback Period: {keyMetrics[1].year3.toFixed(2)} years
                </p>
                <p className="text-sm">Breaks even during: Year 2</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conclusion section - always visible */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">
          Financial Analysis Summary
        </h3>
        <div className="p-3 bg-blue-50 rounded-md border border-blue-200 mb-4">
          <p className="text-sm">
            While all three scenarios show strong profitability, the mature
            plant options offer substantial advantages in terms of earlier
            returns and higher total profits despite higher initial investments.
          </p>
        </div>

        <h4 className="font-medium mb-2">Key Findings</h4>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>
            The 3-year plant option provides the fastest payback at 1.25 years,
            nearly a full year sooner than the traditional approach.
          </li>
          <li>
            Total 5-year profit with 3-year plants (₹99.28 Cr) is almost double
            that of the traditional setup (₹50.45 Cr).
          </li>
          <li>
            The traditional setup generates losses in Year 1, while both
            imported plant options are profitable from Year 1.
          </li>
          <li>
            The additional investment for 3-year plants vs. 2.5-year plants
            (₹1.92 Cr) yields an additional ₹22.54 Cr in 5-year profits.
          </li>
          <li>
            All three options have excellent long-term ROI (470%), with the
            3-year plants option showing the highest at 549%.
          </li>
        </ul>

        <h4 className="font-medium mt-4 mb-2">Recommendations</h4>
        <div className="bg-green-50 p-3 rounded-md border border-green-200">
          <p className="text-sm font-medium text-green-800">
            The 3-year plants option offers the optimal combination of early
            production, fastest payback, and highest total profit, making it the
            recommended approach despite the higher initial investment
            requirement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlueberryThreeScenarioAnalysis;
