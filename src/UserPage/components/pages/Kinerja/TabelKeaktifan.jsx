import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TabelKeaktifan() {
    const [presensiData, setPresensiData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const id_pegawai = localStorage.getItem('id_pegawai');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://be-simatren.riset-d3rpla.com/api/data_presensi/formkeaktifan/${id_pegawai}`);
                const formattedData = response.data.map(item => ({
                    ...item,
                    tanggal_presensi: new Date(item.tanggal_presensi)
                }));
                setPresensiData(formattedData);
            } catch (error) {
                console.error('Error fetching presensi data:', error);
            }
        };

        fetchData();
    }, [id_pegawai]);

    const filteredPresensi = presensiData.filter(item => {
        if (!selectedMonth) return true;
        const month = item.tanggal_presensi.getMonth() + 1; 
        return month === parseInt(selectedMonth);
    });

    const countOccurrences = (field) => {
        return filteredPresensi.reduce((count, item) => item[field] ? count + 1 : count, 0);
    };

    return (
        <div>
            <div className="px-4 rounded-sm border-[1.5px] border-gray-200 items-center shadow-md shadow-gray-400">
                <strong className="text-gray-700 font-medium mt-4 block">Keaktifan</strong>
                {/* Dropdown filter bulan */}
                <div className="flex justify-start mt-4 text-sm">
                    <select
                        className="border rounded px-2 py-1"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="01">Januari</option>
                        <option value="02">Februari</option>
                        <option value="03">Maret</option>
                        <option value="04">April</option>
                        <option value="05">Mei</option>
                        <option value="06">Juni</option>
                        <option value="07">Juli</option>
                        <option value="08">Agustus</option>
                        <option value="09">September</option>
                        <option value="10">Oktober</option>
                        <option value="11">November</option>
                        <option value="12">Desember</option>
                    </select>
                </div>

                {/* Tabel Keaktifan */}
                <div className="h-96 md:w-full w-[34rem] max-[500px]:w-[24rem] overflow-auto text-sm">
                    <table className='text-gray-700 min-w-[900px]'>
                        <thead className="sticky top-0 bg-white">
                            <tr className="border-b-[1.5px]">
                                <td className='font-bold py-4'>No.</td>
                                <td className='font-bold py-4'>Pertanyaan</td>
                                <td className='font-bold py-4'>Jumlah Mengisi</td>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPresensi.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center py-4">Tidak ada data untuk ditampilkan</td>
                                </tr>
                            ) : (
                                <>
                                    <tr className="border-b-[1.5px]">
                                        <td className='py-4'>1</td>
                                        <td className='py-4'>Hafalan surah atau ayat Al-Qur'an</td>
                                        <td className='py-4'>{countOccurrences('hafalan')}</td>
                                    </tr>
                                    <tr className="border-b-[1.5px]">
                                        <td className='py-4'>2</td>
                                        <td className='py-4'>Amalan baik yang dilakukan</td>
                                        <td className='py-4'>{countOccurrences('amalan_baik')}</td>
                                    </tr>
                                    <tr className="border-b-[1.5px]">
                                        <td className='py-4'>3</td>
                                        <td className='py-4'>Kegiatan rutin (Shalat dan Puasa)</td>
                                        <td className='py-4'>{countOccurrences('kegiatan_rutin')}</td>
                                    </tr>
                                    <tr className="border-b-[1.5px]">
                                        <td className='py-4'>4</td>
                                        <td className='py-4'>Penyelesaian masalah sehari-hari</td>
                                        <td className='py-4'>{countOccurrences('penyelesaian_masalah')}</td>
                                    </tr>
                                    <tr className="border-b-[1.5px]">
                                        <td className='py-4'>5</td>
                                        <td className='py-4'>Inisiatif atau proyek yang diusulkan untuk pesantren</td>
                                        <td className='py-4'>{countOccurrences('inisiatif_proyek')}</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TabelKeaktifan;
