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
import moment from 'moment';

function GrafikKinerja() {
  const [dataKinerja, setDataKinerja] = useState([]);

  useEffect(() => {
    fetchDataKinerja();
  }, []);

  const fetchDataKinerja = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data_presensi/formkinerja/all');
      const data = response.data;

      console.log('Data kinerja:', data);

      const currentYear = moment().year();
      const months = moment.monthsShort();

      const monthlyData = months.map((month, index) => {
        const monthNumber = index + 1;
        const startDate = moment(`${currentYear}-${monthNumber}-01`).startOf('month').format('YYYY-MM-DD');
        const endDate = moment(`${currentYear}-${monthNumber}-01`).endOf('month').format('YYYY-MM-DD');

        const hafalanCount = data.reduce((count, item) => {
          const date = moment(item.date).format('YYYY-MM-DD');
          if (date >= startDate && date <= endDate) {
            return count + item.HafalanCount;
          }
          return count;
        }, 0);

        return {
          name: month,
          LaporanKinerja: hafalanCount
        };
      });

      console.log('Mapped Monthly Data:', monthlyData);
      setDataKinerja(monthlyData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="w-[20rem] md:w-[27rem] h-[22rem] bg-white p-4 shadow-md shadow-gray-400 rounded-sm border border-gray-200 flex flex-col">
      <strong className="text-gray-700 font-medium">Grafik Kinerja</strong>
      <div className="w-full mt-3 flex-1 text-sm">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={dataKinerja}
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
            <Bar 
              dataKey="LaporanKinerja" 
              name="Laporan Kinerja" 
              fill='rgb(21 128 61)' 
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GrafikKinerja;