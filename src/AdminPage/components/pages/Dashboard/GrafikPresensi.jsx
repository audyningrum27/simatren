import moment from 'moment-timezone';
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

const GrafikPresensi = ({ selectedDate }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
  
        // Fetch data kehadiran
        const presensiResponse = await fetch(`https://be-simatren.riset-d3rpla.com/api/data_presensi/presensi/daily?date=${formattedDate}`);
        if (!presensiResponse.ok) {
          throw new Error('Failed to fetch data presensi');
        }
        const presensiData = await presensiResponse.json();
        console.log('Presensi Data:', presensiData);
  
        // Fetch data cuti
        const cutiResponse = await fetch(`https://be-simatren.riset-d3rpla.com/api/data_cuti/cuti/approved?date=${formattedDate}`);
        if (!cutiResponse.ok) {
          throw new Error('Failed to fetch data cuti');
        }
        const cutiData = await cutiResponse.json();
        console.log('Cuti Data:', cutiData);
  
        const today = new Date(selectedDate);
        const startDate = new Date(today.setDate(today.getDate() - today.getDay() + 1));
        const endDate = new Date(today.setDate(startDate.getDate() + 4))
  
        const dateRange = createWeeklyDateRange(startDate, endDate);
  
        const presensiDataMap = presensiData.reduce((acc, item) => {
          const localDate = moment(item.date).tz('Asia/Jakarta').format('YYYY-MM-DD');
          acc[localDate] = item.Hadir;
          return acc;
        }, {});
  
        const cutiDataMap = cutiData.reduce((acc, item) => {
          let currentDate = moment(item.tanggal_mulai).tz('Asia/Jakarta');
          const endDate = moment(item.tanggal_selesai).tz('Asia/Jakarta');
          
          while (currentDate <= endDate) {
            const dateString = currentDate.format('YYYY-MM-DD');
            acc[dateString] = (acc[dateString] || 0) + 1;
            currentDate = currentDate.add(1, 'days');
          }
          return acc;
        }, {});
  
        console.log('Presensi Data Map:', presensiDataMap); 
        console.log('Cuti Data Map:', cutiDataMap); 
  
        const formattedData = dateRange.map(date => {
          const dateString = moment(date).tz('Asia/Jakarta').format('YYYY-MM-DD');
          return {
            name: moment(date).tz('Asia/Jakarta').format('ddd, D MMM'),
            Hadir: presensiDataMap[dateString] || 0,
            Cuti: cutiDataMap[dateString] || 0
          };
        });
  
        console.log('Formatted Data:', formattedData); 
  
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [selectedDate]);
  
  const createWeeklyDateRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

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
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" interval={0} tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Hadir" fill='rgb(21 128 61)' />
            <Bar dataKey="Cuti" fill='rgb(220, 0, 0)' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrafikPresensi;
