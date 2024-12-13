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
  // Format timestamps and values for the chart
  const formattedData = cryptoData.map((entry) => ({
    formattedTimestamp: new Date(entry.timestamp).toLocaleDateString(),
    value: entry.value,
  }));

  // Prepare chart data and labels
  const chartData = {
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
  };

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
