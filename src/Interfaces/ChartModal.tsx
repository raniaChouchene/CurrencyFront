import { Modal } from "antd";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { useState, useEffect } from "react";

// Register chart.js components
ChartJS.register(
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

type ChartModalProps = {
  visible: boolean;
  onClose: () => void;
  cryptoData: { timestamp: string; price: number }[]; // Adjusted for price field
  cryptoName: string;
  timeframe: "week" | "month"; // New prop for selecting timeframe
};

const ChartModal = ({
  visible,
  onClose,
  cryptoData,
  cryptoName,
  timeframe,
}: ChartModalProps) => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: `${cryptoName} Price (USD)`,
        data: [] as number[],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    if (cryptoData.length > 0) {
      // Get the current date
      const now = new Date();

      // Filter based on timeframe (week or month)
      const filteredData = cryptoData.filter((entry) => {
        const entryDate = new Date(entry.timestamp);
        const timeDiff = now.getTime() - entryDate.getTime();

        // Check if the entry is within the selected timeframe
        if (timeframe === "week") {
          console.log(
            `Week filter - Entry: ${entry.timestamp}, TimeDiff: ${timeDiff}, Now: ${now}`
          );
          return timeDiff <= 7 * 24 * 60 * 60 * 1000; // 7 days
        } else if (timeframe === "month") {
          console.log(
            `Month filter - Entry: ${entry.timestamp}, TimeDiff: ${timeDiff}, Now: ${now}`
          );
          return timeDiff <= 30 * 24 * 60 * 60 * 1000; // 30 days
        }
        return false;
      });

      // Log the filtered data for debugging
      console.log("Filtered Data:", filteredData);

      // Format data for chart
      const formattedData = filteredData.map((entry) => {
        const date = new Date(entry.timestamp);
        const formattedTimestamp = `${date.getFullYear()}-${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

        return {
          formattedTimestamp,
          value: entry.price,
        };
      });

      setChartData({
        labels: formattedData.map((entry) => entry.formattedTimestamp),
        datasets: [
          {
            label: `${cryptoName} Price (USD)`,
            data: formattedData.map((entry) => entry.value),
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            tension: 0.4,
          },
        ],
      });
    }
  }, [cryptoData, cryptoName, timeframe]); // Add 'timeframe' to dependency array

  return (
    <Modal
      title={`${cryptoName} Price Chart`}
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: `${cryptoName} Price Over Time`,
            },
          },
          scales: {
            x: {
              type: "category",
              title: {
                display: true,
                text: "Time",
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
              },
            },
            y: {
              title: {
                display: true,
                text: "Price (USD)",
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default ChartModal;
