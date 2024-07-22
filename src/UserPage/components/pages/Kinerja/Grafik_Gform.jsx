import {
  BarChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts";

const data = [
  {
      name: "Jan",
      Hadir: 25,
      Cuti: 2
  },
  {
      name: "Feb",
      Hadir: 23,
      Cuti: 1
  },
  {
      name: "Mar",
      Hadir: 27,
      Cuti: 0
  },
  {
      name: "Apr",
      Hadir: 15,
      Cuti: 11
  },
  {
      name: "Mei",
      Hadir: 20,
      Cuti: 2
  },
  {
      name: "Jun",
      Hadir: 20,
      Cuti: 6
  },
  {
      name: "Jul",
      Hadir: 27,
      Cuti: 0
  },
  {
      name: "Ags",
      Hadir: 19,
      Cuti: 8
  },
  {
      name: "Sep",
      Hadir: 20,
      Cuti: 6
  },
  {
      name: "Okt",
      Hadir: 17,
      Cuti: 10
  },
  {
      name: "Nov",
      Hadir: 26,
      Cuti: 0
  },
  {
      name: "Des",
      Hadir: 20,
      Cuti: 7
  }
]

function Grafik_Gform() {
  return (
      <div className="w-[32rem] md:w-full max-[500px]:w-[24rem] h-[22rem] bg-white p-4 shadow-md shadow-gray-400 rounded-sm border border-gray-200 flex flex-col justify-center">
          <strong className="text-gray-700 font-medium">Kinerja Pegawai</strong>
          <div className="w-full mt-3 flex-1 text-sm">
              <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                      width={500}
                      height={300}
                      data={data}
                      margin={{
                          top: 20,
                          right: 10,
                          left: -10,
                          bottom: 0
                      }}
                  >
                      <CartesianGrid strokeDasharray="3 3 0 0" vertikal={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Hadir" fill='rgb(21 128 61)' />
                      <Bar dataKey="Cuti" fill='rgb(34 197 94)' />
                  </BarChart>
              </ResponsiveContainer>
          </div>
      </div>
  )
}

export default Grafik_Gform;