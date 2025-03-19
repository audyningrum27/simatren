import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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

function Kinerja_gform() {
    const [data, setData] = useState([]);
    const { id_pegawai } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://be-simatren.riset-d3rpla.com/api/data_presensi/formkinerja/${id_pegawai}`);
                const kinerjaData = response.data;
                const monthlyData = processMonthlyData(kinerjaData);
                setData(monthlyData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const processMonthlyData = (kinerjaData) => {
        const months = moment.monthsShort();
        const monthlySummary = months.map((month, index) => {
            const monthNumber = index + 1;
            const year = moment().year();

            const startDate = moment(`${year}-${monthNumber}-01`).startOf('month').format('YYYY-MM-DD');
            const endDate = moment(`${year}-${monthNumber}-01`).endOf('month').format('YYYY-MM-DD');

            const laporanKinerjaCount = kinerjaData.reduce((count, item) => {
                const date = moment(item.date).format('YYYY-MM-DD');
                if (date >= startDate && date <= endDate) {
                    return count + item.HafalanCount;
                }
                return count;
            }, 0);

            return {
                name: month,
                LaporanKinerja: laporanKinerjaCount
            };
        });

        return monthlySummary;
    };

    return (
        <div className="w-[32rem] md:w-full max-[500px]:w-[24rem] h-[22rem] bg-white p-4 shadow-md shadow-gray-400 rounded-sm border border-gray-200 flex flex-col justify-center">
            <strong className="text-gray-700 font-medium">Grafik Kinerja</strong>
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

export default Kinerja_gform;