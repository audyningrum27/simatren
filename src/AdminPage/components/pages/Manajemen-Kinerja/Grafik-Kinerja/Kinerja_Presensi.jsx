import React, { useEffect, useState } from 'react';
import moment from 'moment';
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
import { useParams } from 'react-router-dom';

const Kinerja_Presensi = () => {
    const [data, setData] = useState([]);
    const { id_pegawai } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const presensiResponse = await axios.get(`https://backend.simatren.space/api/data_presensi/presensi/daily/${id_pegawai}`);
                const presensiData = presensiResponse.data;
        
                const cutiResponse = await axios.get(`https://backend.simatren.space/api/data_cuti/cuti/approved/${id_pegawai}`);
                const cutiData = cutiResponse.data;
        
                const monthlyData = processMonthlyData(presensiData, cutiData);
                setData(monthlyData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };                

        fetchData();
    }, [id_pegawai]);

    const calculateWorkdays = (startDate, endDate) => {
        let count = 0;
        let currentDate = moment(startDate);

        while (currentDate.isSameOrBefore(endDate)) {
            const dayOfWeek = currentDate.isoWeekday();
            if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Hari Senin (1) sampai Jumat (5)
                count++;
            }
            currentDate.add(1, 'days');
        }

        return count;
    };

    const processMonthlyData = (presensiData, cutiData) => {
        const months = moment.monthsShort();
        const year = moment().year(); 

        const monthlySummary = months.map((month, index) => {
            const monthNumber = index + 1;

            const startDate = moment(`${year}-${monthNumber}-01`).startOf('month');
            const endDate = moment(`${year}-${monthNumber}-01`).endOf('month');

            const presensiCount = presensiData.reduce((count, item) => {
                const date = moment(item.date);
                if (date.isBetween(startDate, endDate, null, '[]')) {
                    return count + item.Hadir;
                }
                return count;
            }, 0);
    
            const cutiCount = cutiData.reduce((count, item) => {
                const cutiStartDate = moment(`${item.tahun}-${item.bulan}-01`).startOf('month');
                const cutiEndDate = moment(cutiStartDate).endOf('month');
                if (cutiStartDate.isSameOrAfter(startDate) && cutiEndDate.isSameOrBefore(endDate)) {
                    return count + item.jumlah_cuti;
                }
                return count;
            }, 0);

            const workdays = calculateWorkdays(startDate, endDate);
    
            return {
                name: month,
                Hadir: presensiCount,
                Cuti: cutiCount,
                HariKerja: workdays
            };
        });
    
        return monthlySummary;
    };       
    
    return (
        <div className="w-[32rem] md:w-full max-[500px]:w-[24rem] h-[22rem] bg-white p-4 shadow-md shadow-gray-400 rounded-sm border border-gray-200 flex flex-col justify-center">
            <strong className="text-gray-700 font-medium">Grafik Presensi</strong>
            <div className="w-full mt-3 flex-1 text-sm">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
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
                        <Bar dataKey="HariKerja" name="Hari Kerja" fill='rgb(75, 192, 192)' />
                        <Bar dataKey="Hadir" fill='rgb(21 128 61)' />
                        <Bar dataKey="Cuti" fill='rgb(220, 0, 0)' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Kinerja_Presensi;
