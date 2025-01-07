import { Modal } from "antd";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useState, useEffect } from "react";

ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale);

type ChartModalProps = {
  visible: boolean;
  onClose: () => void;
  cryptoData: { timestamp: string; price: number }[];
  cryptoName: string;
  timeframe: "week" | "month";
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
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (cryptoData.length > 0) {
      const now = new Date();

      const filteredData = cryptoData.filter((entry) => {
        const entryDate = new Date(entry.timestamp);
        const timeDiff = now.getTime() - entryDate.getTime();

        if (timeframe === "week") {
          return timeDiff <= 7 * 24 * 60 * 60 * 1000;
        } else if (timeframe === "month") {
          return timeDiff <= 30 * 24 * 60 * 60 * 1000;
        }
        return false;
      });

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
            backgroundColor: "rgba(75,192,192,0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [cryptoData, cryptoName, timeframe]);

  return (
    <Modal
      title={`${cryptoName} Price Chart`}
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Bar
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
