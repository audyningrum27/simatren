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

const Grafik_Presensi = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id_pegawai = localStorage.getItem('id_pegawai');

        if (!id_pegawai) {
            console.error('id_pegawai is undefined');
            return;
        }

        const fetchData = async () => {
            try {
                const id_pegawai = localStorage.getItem('id_pegawai');
                if (!id_pegawai) {
                    console.error('id_pegawai is undefined');
                    return;
                }
        
                const presensiResponse = await axios.get(`http://localhost:5000/api/data_presensi/presensi/daily/${id_pegawai}`);
                const presensiData = presensiResponse.data;
        
                const cutiResponse = await axios.get(`http://localhost:5000/api/data_cuti/cuti/approved/${id_pegawai}`);
                const cutiData = cutiResponse.data;
        
                const monthlyData = processMonthlyData(presensiData, cutiData);
                setData(monthlyData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };                

        fetchData();
    }, []);

    const processMonthlyData = (presensiData, cutiData) => {
        const months = moment.monthsShort();
        const monthlySummary = months.map((month, index) => {
            const monthNumber = index + 1;
            const year = moment().year(); 
    
            const startDate = moment(`${year}-${monthNumber}-01`).startOf('month').format('YYYY-MM-DD');
            const endDate = moment(`${year}-${monthNumber}-01`).endOf('month').format('YYYY-MM-DD');
    
            const presensiCount = presensiData.reduce((count, item) => {
                const date = moment(item.date).format('YYYY-MM-DD');
                if (date >= startDate && date <= endDate) {
                    return count + item.Hadir;
                }
                return count;
            }, 0);
    
            const cutiCount = cutiData.reduce((count, item) => {
                const cutiStartDate = moment(`${item.tahun}-${item.bulan}-01`).startOf('month').format('YYYY-MM-DD');
                const cutiEndDate = moment(cutiStartDate).endOf('month').format('YYYY-MM-DD');
                if (cutiStartDate >= startDate && cutiEndDate <= endDate) {
                    return count + item.jumlah_cuti;
                }
                return count;
            }, 0);
    
            return {
                name: month,
                Hadir: presensiCount,
                Cuti: cutiCount
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
                        <Bar dataKey="Hadir" fill='rgb(21 128 61)' />
                        <Bar dataKey="Cuti" fill='rgb(34 197 94)' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Grafik_Presensi;
