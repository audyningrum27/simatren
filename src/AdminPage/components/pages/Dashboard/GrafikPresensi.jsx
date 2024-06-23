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
    name: "17 Juni",
    Hadir: 120,
    Cuti: 3
  },
  {
    name: "18 Juni",
    Hadir: 121,
    Cuti: 2
  },
  {
    name: "19 Juni",
    Hadir: 118,
    Cuti: 7
  },
  {
    name: "20 Juni",
    Hadir: 118,
    Cuti: 20
  },
  {
    name: "21 Juni",
    Hadir: 120,
    Cuti: 50
  }
]

function GrafikPresensi() {
  return (
    <div className="w-[20rem] md:w-[27rem] h-[22rem] bg-white p-4 shadow-md shadow-gray-400 rounded-sm border border-gray-200 flex flex-col">
      <strong className="text-gray-700 font-medium">Grafik Presensi</strong>
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

export default GrafikPresensi;
