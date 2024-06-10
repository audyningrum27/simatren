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

const dataKinerja = [
  { name: "Jul", Penurunan: 17, Kenaikan: 83 },
  { name: "Ags", Penurunan: 55, Kenaikan: 45 },
  { name: "Sep", Penurunan: 67, Kenaikan: 33 },
  { name: "Okt", Penurunan: 28, Kenaikan: 72 },
  { name: "Nov", Penurunan: 73, Kenaikan: 27 },
  { name: "Des", Penurunan: 25, Kenaikan: 75 },
]

function GrafikKinerja() {
  return (
    <div className="w-[20rem] md:w-[27rem] h-[22rem] bg-white p-4 shadow-md shadow-gray-400 rounded-sm border border-gray-200 flex flex-col">
      <strong className="text-gray-700 font-medium">Grafik Kinerja</strong>
      <div className="w-full mt-3 flex-1 text-sm">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={dataKinerja}
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
            <Bar dataKey="Kenaikan" fill='rgb(21 128 61)' />
            <Bar dataKey="Penurunan" fill='rgb(34 197 94)' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default GrafikKinerja;
