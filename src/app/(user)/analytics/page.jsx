"use client";
import dynamic from "next/dynamic";

const PieChart = dynamic(() => import("./charts/pieChart"), {
  loading: () => <p>Chart Loading...</p>,
});

const LineChart = dynamic(() => import("./charts/lineChart"), {
  loading: () => <p>Chart Loading...</p>,
});

const AreaChart = dynamic(() => import("./charts/areaChart"), {
  loading: () => <p>Chart Loading...</p>,
});

const BarChart = dynamic(() => import("./charts/barChart"), {
  loading: () => <p>Chart Loading...</p>,
});

// Using react-google-charts
export default function Analytics() {
  return (
    <>
      <div className="text-lg mb-3">Analytics</div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-5 rounded-lg shadow-lg px-4 py-4 bg-white">
          <PieChart />
        </div>
        <div className="col-span-7 rounded-lg shadow-lg px-4 py-4 bg-white">
          <LineChart />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-5">
        <div className="col-span-7 rounded-lg shadow-lg px-4 py-4 bg-white">
          <BarChart />
        </div>
        <div className="col-span-5 rounded-lg shadow-lg px-4 py-4 bg-white">
          <AreaChart />
        </div>
      </div>
    </>
  );
}
