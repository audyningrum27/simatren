import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

function GrafikPelatihan({ selectedDate }) {
  const [dataPelatihan, setDataPelatihan] = useState([]);

  useEffect(() => {
    fetchDataPelatihan();
  }, [selectedDate]);

  const fetchDataPelatihan = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data_pelatihan/pelatihan-per-bulan');
      const data = response.data;

      console.log('Data pelatihan:', data);

      const currentDate = selectedDate || new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const isFirstHalf = currentMonth < 6;
      const startMonth = isFirstHalf ? 0 : 6;
      const endMonth = isFirstHalf ? 5 : 11;

      const monthlyData = Array.from({ length: 6 }, (_, index) => {
        const month = new Date(currentYear, startMonth + index);
        return {
          name: month.toLocaleString('id-ID', { month: 'short' }),
          Selesai: 0,
          Proses: 0,
          'Belum Dimulai': 0,
        };
      });

      data.forEach(item => {
        const { bulan, selesai, proses, belum_dimulai } = item;

        if (bulan >= startMonth + 1 && bulan <= endMonth + 1) {
          const adjustedIndex = bulan - startMonth - 1;
          monthlyData[adjustedIndex].Selesai += selesai;
          monthlyData[adjustedIndex].Proses += proses;
          monthlyData[adjustedIndex]['Belum Dimulai'] += belum_dimulai; 
        }
      });

      console.log('Mapped Monthly Data:', monthlyData);
      setDataPelatihan(monthlyData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="w-[20rem] md:w-[27rem] h-[22rem] bg-white p-4 shadow-md shadow-gray-400 rounded-sm border border-gray-200 flex flex-col">
      <strong className="text-gray-700 font-medium">Grafik Pelatihan</strong>
      <div className="w-full mt-3 flex-1 text-sm">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={dataPelatihan}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Selesai" fill='rgb(34 197 94)' />
            <Bar dataKey="Proses" fill='rgb(21 168 61)' />
            <Bar dataKey="Belum Dimulai" fill='rgb(21 128 61)' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GrafikPelatihan;