// DoughnutChart.js
import { useRef } from "react";
import { Doughnut } from "react-chartjs-2";

import axiosInstance from "../axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchMonthlyExpenses = async () => {
  const response = await axiosInstance.get("/expense/monthly-stas");
  return response?.data?.message;
};

const DoughnutChart = () => {
  const chartRef = useRef(null);

  const {
    data: monthlyExpenses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["monthlyExpenses"],
    queryFn: fetchMonthlyExpenses,
  });

  const labels = monthlyExpenses
    ? monthlyExpenses.map((item) => item.category)
    : [];
  const totalData = monthlyExpenses
    ? monthlyExpenses.map((item) => item.totalAmount)
    : [];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Expense Distribution",
        data: totalData,
        backgroundColor: [
          "#4CAF50",  
          "#FFC107",  
          "#BDBDBD",  
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        formatter: (value, ctx) => {
          const total = ctx.chart.data.datasets[0].data.reduce(
            (acc, val) => acc + val,
            0
          );
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
        color: "#fff",
        font: {
          weight: "bold",
        },
      },
    },
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading expenses.</p>;

  return (
    <div className="w-full h-full bg-white shadow-xl rounded-lg flex flex-col justify-center items-center p-3">
      <h1 className="text-xl w-full font-bold">This Month</h1>
      <div className=" max-w-72 w-full  h-[90%]  m-auto flex justify-between items-center ">
        <Doughnut data={chartData} options={options} ref={chartRef} />
        <div id="custom-legend" className="ml-5">
          {labels.map((label, index) => (
            <div key={index} className="flex items-center mb-4">
              <span
                className="inline-block w-5 h-5 mr-2 rounded-sm"
                style={{
                  backgroundColor: chartData.datasets[0].backgroundColor[index],
                }}
              />
              <div className="w-full">
                <div className="text-sm text-gray-500">{label}</div>
                <div className="font-bold text-xs text-gray-700">
                  ₹{totalData[index].toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
