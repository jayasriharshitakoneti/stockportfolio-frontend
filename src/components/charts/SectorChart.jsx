import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SectorChart = ({ holdings }) => {
  const sectorTotals = {};
  holdings.forEach((h) => {
    const sector = h.sector || "Unknown";
    const value = parseFloat(h.total_value);
    sectorTotals[sector] = (sectorTotals[sector] || 0) + value;
  });

  const labels = Object.keys(sectorTotals);
  const values = Object.values(sectorTotals);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Value",
        data: values,
        backgroundColor: [
          "#3498db",
          "#2ecc71",
          "#f39c12",
          "#e74c3c",
          "#9b59b6",
          "#1abc9c",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h3 style={{ textAlign: "center" }}>Sector-wise Investment</h3>
      <Pie data={data} />
    </div>
  );
};

export default SectorChart;
