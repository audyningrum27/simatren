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
      const response = await axios.get('http://localhost:5000/api/jadwal_pelatihan/jadwalpelatihan');
      const data = response.data;

      const currentDate = selectedDate || new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      // Determine if we are in the first half or second half of the year
      const isFirstHalf = currentMonth < 6;
      const startMonth = isFirstHalf ? 0 : 6; // January or July
      const endMonth = isFirstHalf ? 5 : 11;  // June or December

      // Initialize monthly data for the selected half of the year
      const monthlyData = Array.from({ length: 6 }, (_, index) => {
        const month = new Date(currentYear, startMonth + index);
        return {
          name: month.toLocaleString('id-ID', { month: 'short' }),
          Pelatihan: 0,
        };
      });

      data.forEach(item => {
        const date = new Date(item.tanggal_mulai);
        const itemMonth = date.getMonth();
        const itemYear = date.getFullYear();

        // Check if the date is within the current year and the correct half-year period
        if (itemYear === currentYear && itemMonth >= startMonth && itemMonth <= endMonth) {
          monthlyData[itemMonth - startMonth].Pelatihan += 1;
        }
      });

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
            width={500}
            height={300}
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
            <Bar dataKey="Pelatihan" fill='rgb(21 128 61)' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GrafikPelatihan;
