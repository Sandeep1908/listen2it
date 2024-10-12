import { Bar } from "react-chartjs-2";
import axiosInstance from "../axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const fetchWeeklyExpenses = async () => {
  const response = await axiosInstance.get("/expense/weekly-stats");
  return response.data.message;
};

const WeeklyStats = () => {
  const { data: weeklyExpenses, isLoading } = useQuery({
    queryKey: ["weeklyExpenses"],
    queryFn: fetchWeeklyExpenses,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const labels = weeklyExpenses?.map((expense) => {
    const date = moment(expense.date);
    return date.isSame(moment(), "day")
      ? "Today"
      : date.isSame(moment().subtract(1, "day"), "day")
      ? "Yesterday"
      : date.format("Do MMM");
  });

  const essentialsData = weeklyExpenses?.map((expense) => expense.Essential);
  const nonEssentialsData = weeklyExpenses?.map(
    (expense) => expense.NonEssential
  );
  const totalData = essentialsData?.map(
    (value, index) => value + nonEssentialsData[index]
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Essentials",
        data: essentialsData,
        backgroundColor: "#26AE60",
        datalabels: {
          align: "center",
          anchor: "center",
          color: "#0B4824",
          formatter: (value) => {
            return value > 0 ? value : "";
          },
          font: {
            weight: "400",
            size: "9px",
          },
        },
      },
      {
        label: "Non-Essentials",
        data: nonEssentialsData,
        backgroundColor: "#F1C94B",
        datalabels: {
          align: "bottom",
          anchor: "end",
          color: "#7C6215",
          formatter: (value) => {
            return value > 0 ? value : "";
          },
          font: {
            weight: "400",
            size: "9px",
          },
          border: {
            radius: "100px",
          },
        },
      },
      {
        label: "Total",
        data: totalData,
        type: "bar",
        backgroundColor: "rgba(0,0,0,0)",
        datalabels: {
          align: "bottom",
          anchor: "bottom",

          color: "#8796A9",
          formatter: (value) => {
            return value > 0 ? `Total: ₹${value}` : "";
          },
          font: {
            weight: "400",
            size: "10px",
          },
        },
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
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        stepSize: 250,
        ticks: {
          callback: function (value) {
            if (value >= 1000) {
              return `${value / 1000}k`;
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <div className="max-w-4xl h-full mx-auto p-3 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold  ">Last Week</h1>
      <div className="w-full h-full  flex justify-center items-center">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default WeeklyStats;
