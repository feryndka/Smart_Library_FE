"use client";
import CountUp from "react-countup";
import dynamic from "next/dynamic";

const BarChart = dynamic(() => import("./charts/barChart"), {
  loading: () => <p>Chart Loading...</p>,
});

export default function Dashboard() {
  return (
    <>
      <h1 className="text-[36px] font-bold text-center mb-4">
        Laporan Bulanan
      </h1>
      <div className="grid grid-cols-3 gap-6 grid-rows-4">
        <div className="lg:col-span-1 sm:col-span-4 xs:col-span-4">
          <div className="bg-orange-500 rounded-xl shadow-lg hover:scale-105 transition duration-150">
            <div className="ml-2 mx-auto bg-white rounded-xl ">
              <div className="pl-7 py-5">
                <div className="font-semibold mb-4 text-md">Total Peminjaman</div>
                <div className="text-3xl font-semibold">
                  <CountUp start={0} end={400} delay={1} /> pcs
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 sm:col-span-4 xs:col-span-4 ">
          <div className="bg-green-500 rounded-xl shadow-lg hover:scale-105 transition duration-150">
            <div className="ml-2 mx-auto bg-white rounded-xl ">
              <div className="pl-7 py-5">
                <div className="font-semibold mb-4 text-md">Total Denda</div>
                <div className="text-3xl font-semibold">
                  Rp <CountUp start={0} end={1000000} delay={1} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 sm:col-span-4 xs:col-span-4 ">
          <div className="bg-blue-500 rounded-xl shadow-lg hover:scale-105 transition duration-150">
            <div className="ml-2 mx-auto bg-white rounded-xl ">
              <div className="pl-7 py-5">
                <div className="font-semibold mb-4 text-md">Total Anggota</div>
                <div className="text-3xl font-semibold">
                  <CountUp start={0} end={50} delay={1} /> anggota
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:row-start-2 row-end-5 col-span-3 bg-white rounded-xl shadow-lg">
          <div className="px-2 py-2">
            <BarChart />
          </div>
        </div>
        {/* <div className="lg:row-start-1 row-end-5 col-span-1 bg-white rounded-xl shadow-lg"></div> */}
      </div>
    </>
  );
}
