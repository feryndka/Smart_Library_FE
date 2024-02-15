import { Chart } from "react-google-charts";

export const data = [
  ["Month", "Class 10", "Class 11", "Class 12"],
  ["Week 1", 120, 100, 140],
  ["Week 2", 140, 110, 120],
  ["Week 3", 160, 120, 150],
  ["Week 4", 180, 130, 130],
];

export const options = {
  chart: {
    title: "Grafik Peminjaman",
    subtitle: "Class 10, 11, 12: February 2024",
  },
};

export default function App() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
