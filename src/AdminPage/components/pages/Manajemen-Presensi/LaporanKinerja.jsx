import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LaporanKinerja = () => {
    const { id_presensi } = useParams();
    const [presensi, setDataPresensi] = useState(null);

    useEffect(() => {
        fetchLaporanKinerja();
    }, [id_presensi]);

    const fetchLaporanKinerja = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/data_presensi/presensi/laporan_kinerja/${id_presensi}`);
            const data = await response.json();
            setDataPresensi(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (!presensi) {
        return <div>Loading...</div>;
    }

    return (
        <div className="px-5">
            <span className="text-2xl text-gray-950 font-semibold flex justify-center mb-5">Laporan Kinerja</span>

            <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col justify-between'>
                <div className="box-border rounded-sm border border-gray-200 flex-1 shadow-lg overflow-auto">
                    <div className="flex flex-col md:flex-row">
                        <div className="flex-1">
                            <table className='w-full border-separate p-5 text-gray-950 text-sm'>
                                <tbody>
                                    <tr>
                                        <td className='w-1/4'>Hafalan Surah Al-Qur'an</td>
                                        <td className="p-2 w-8">:</td>
                                        <td className="px-2 border border-gray-400 rounded-md">
                                            <input
                                                type="text"
                                                name="hafalan"
                                                value={presensi.hafalan}
                                                className="w-full border-none bg-transparent focus:outline-none"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='w-1/4'>Amal Kebaikan</td>
                                        <td className="p-2 w-8">:</td>
                                        <td className="px-2 border border-gray-400 rounded-md">
                                            <input
                                                type="text"
                                                name="amalan_baik"
                                                value={presensi.amalan_baik}
                                                className="w-full border-none bg-transparent focus:outline-none"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='w-1/4'>Kegiatan Rutin</td>
                                        <td className="p-2 w-8">:</td>
                                        <td className="px-2 border border-gray-400 rounded-md">
                                            <input
                                                type="text"
                                                name="kegiatan_rutin"
                                                value={presensi.kegiatan_rutin}
                                                className="w-full border-none bg-transparent focus:outline-none"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='w-1/4'>Penyelesaian Masalah</td>
                                        <td className="p-2 w-8">:</td>
                                        <td className="px-2 border border-gray-400 rounded-md">
                                            <input
                                                type="text"
                                                name="penyelesaian_masalah"
                                                value={presensi.penyelesaian_masalah}
                                                className="w-full border-none bg-transparent focus:outline-none"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='w-1/4'>Inisiatif atau Proyek Terlaksana</td>
                                        <td className="p-2 w-8">:</td>
                                        <td className="px-2 border border-gray-400 rounded-md">
                                            <input
                                                type="text"
                                                name="inisiatif_proyek"
                                                value={presensi.inisiatif_proyek}
                                                className="w-full border-none bg-transparent focus:outline-none"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LaporanKinerja;
