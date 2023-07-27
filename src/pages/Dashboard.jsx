import React from "react";
import { useQuery } from "react-query";
import {
  application_by_status,
  appointment_report,
  top_center,
  weekly_report,
} from "../service/dashboard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  BarElement,
  Legend
);

export const baroptions = {
  plugins: {
    title: {
      display: true,
      text: "Applications by status",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Pre-registration",
    },
  },
};

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["weekly_report"],
    queryFn: weekly_report,
  });
  const { data: barData, isLoading: barIsLoading } = useQuery({
    queryKey: ["appByStatus"],
    queryFn: application_by_status,
  });
  const { data: pieData, isLoading: pieIsLoading } = useQuery({
    queryKey: ["appointemntByStatus"],
    queryFn: appointment_report,
  });
  const { data: chartData, isLoading: chartIsLoading } = useQuery({
    queryKey: ["top_center"],
    queryFn: top_center,
  });

  const labels = !isLoading && data?.map((item) => item.date);
  const counts = !isLoading && data?.map((data) => data.count);

  const chartdata = {
    labels,
    datasets: [
      {
        label: "Number of pre-registrations",
        data: counts,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const getStatusCounts = (status) => {
    return (
      !barIsLoading &&
      barData?.map((weekData) => {
        const statusData = weekData.data.find((item) => item.status === status);
        return statusData ? statusData.count : 0;
      })
    );
  };

  const barlabels = !barIsLoading && barData?.map((item) => item.week_start);

  const bardata = {
    labels: barlabels,
    datasets: [
      {
        label: "Pending appointment",
        data: getStatusCounts("Pending appointment"),
        backgroundColor: "#9ca3af",
      },
      {
        label: "Booked",
        data: getStatusCounts("Booked"),
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Expired",
        data: getStatusCounts("Expired"),
        backgroundColor: "rgb(53, 162, 235)",
      },
      {
        label: "Canceled",
        data: getStatusCounts("Canceled"),
        backgroundColor: "#f87171",
      },
    ],
  };

  const pieLabels = !pieIsLoading && pieData.map((item) => item.status);
  const pieCounts = !pieIsLoading && pieData.map((item) => item.count);

  const pieChartData = {
    labels: pieLabels,
    datasets: [
      {
        data: pieCounts,
        backgroundColor: [
          "rgb(75, 192, 192)",
          "rgba(255, 99, 132, 0.6)",
          "rgb(53, 162, 235)",
          "#f87171",
        ],
      },
    ],
  };

  const chartLabels =
    !chartIsLoading && chartData.map((item) => item.center_name);
  const chart_data = !chartIsLoading && chartData.map((item) => item.count);

  const chartDataConfig = {
    labels: chartLabels,
    datasets: [
      {
        label: "Top 10 Centers",
        data: chart_data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const chartOptions = {
    indexAxis: "y", // Display the bars horizontally
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="grid grid-cols-2 gap-10 mt-10">
      <div className="rounded-lg shadow-lg px-3 py-3">
        <Line options={options} data={chartdata} />
      </div>
      <div className="rounded-lg shadow-lg px-3 py-3">
        <Bar options={baroptions} data={bardata} />
      </div>
      <div className="rounded-lg shadow-lg px-3 py-3">
        <Pie
          options={{
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Appointment Status",
              },
            },
          }}
          data={pieChartData}
        />
      </div>
      <div className="rounded-lg shadow-lg px-3 py-3">
        <Bar data={chartDataConfig} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
