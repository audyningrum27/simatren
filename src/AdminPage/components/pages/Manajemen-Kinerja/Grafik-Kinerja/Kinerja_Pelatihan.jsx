import React, { useState, useEffect } from 'react';
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

function Kinerja_Pelatihan() {
    const [data, setData] = useState([]);
    const { id_pegawai } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/data_pelatihan/pelatihan-per-bulan/${id_pegawai}`)
            .then(response => {
                const results = response.data;

                if (!Array.isArray(results)) {
                    console.error('Expected an array but got:', typeof results);
                    return;
                }
                const formattedData = [];

                for (let i = 0; i < 12; i++) {
                    formattedData.push({ name: new Date(2023, i).toLocaleString('id-ID', { month: 'short' }), Selesai: 0, 'Belum Dimulai': 0, 'Proses': 0 });
                }

                results.forEach(result => {
                    const monthIndex = result.bulan - 1;
                    if (result.status === 'Selesai') {
                        formattedData[monthIndex].Selesai = result.jumlah_pelatihan;
                    } else if (result.status === 'Proses') {
                        formattedData[monthIndex]['Proses'] = result.jumlah_pelatihan;
                    }else if (result.status === 'Belum Dimulai') {
                        formattedData[monthIndex]['Belum Dimulai'] = result.jumlah_pelatihan;
                    }
                });

                setData(formattedData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id_pegawai]);

    return (
        <div className="w-[32rem] md:w-full max-[500px]:w-[24rem] h-[22rem] bg-white p-4 shadow-md shadow-gray-400 rounded-sm border border-gray-200 flex flex-col justify-center">
            <strong className="text-gray-700 font-medium">Pelatihan</strong>
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
                        <Bar dataKey="Selesai" fill='rgb(34 197 94)' />
                        <Bar dataKey="Proses" fill='rgb(21 168 61)' />
                        <Bar dataKey="Belum Dimulai" fill='rgb(21 128 61)' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Kinerja_Pelatihan;