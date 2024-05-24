import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend 
} from 'recharts'

const data = [
	{ name: 'Guru', value: 540 },
	{ name: 'TPA', value: 620 },
	{ name: 'Non TPA', value: 210 }
]

const RADIAN = Math.PI / 180
const COLORS = ['rgb(20 83 45)', 'rgb(21 128 61)', 'rgb(34 197 94)']

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5
	const x = cx + radius * Math.cos(-midAngle * RADIAN)
	const y = cy + radius * Math.sin(-midAngle * RADIAN)

	return (
		<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	)
}

export default function KategoriPegawaiChart() {
	return (
		<div className="w-[20rem] md:w-[27rem] h-[22rem] bg-white p-4 shadow-md shadow-gray-400 rounded-sm border border-gray-200 flex flex-col">
			<strong className="text-gray-700 font-medium">Kategori Pegawai</strong>
			<div className="mt-3 w-full flex-1 text-xs">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart width={400} height={300}>
						<Pie
							data={data}
							cx="50%"
							cy="45%"
							labelLine={false}
							label={renderCustomizedLabel}
							outerRadius={105}
							fill="#8884d8"
							dataKey="value"
						>
							{data.map((_, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Legend/>
					</PieChart>
				</ResponsiveContainer>
			</div>
      <div>
        
      </div>
		</div>
	)
}