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
  cryptoData: { timestamp: string; value: number }[];
  cryptoName: string;
};

const ChartModal = ({
  visible,
  onClose,
  cryptoData,
  cryptoName,
}: ChartModalProps) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: `${cryptoName} Price (USD)`,
        data: [],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    if (cryptoData.length > 0) {
      const formattedData = cryptoData.map((entry) => {
        const date = new Date(entry.timestamp);
        const formattedTimestamp = `${date.getFullYear()}-${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}`;
        return {
          formattedTimestamp,
          value: entry.value,
        };
      });

      setChartData({
        //@ts-expect-error
        labels: formattedData.map((entry) => entry.formattedTimestamp),
        datasets: [
          {
            label: `${cryptoName} Price (USD)`,
            //@ts-expect-error
            data: formattedData.map((entry) => entry.value),

            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            tension: 0.4,
          },
        ],
      });
    }
  }, [cryptoData, cryptoName]);

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
