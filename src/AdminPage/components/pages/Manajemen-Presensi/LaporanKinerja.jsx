import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LaporanKinerja = () => {
    const { id_presensi } = useParams();
    const [presensi, setDataPresensi] = useState(null);
    const [roleData, setRoleData] = useState(null);
    const [roleGuru, setRoleGuru] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const laporanResponse = await fetch(`http://localhost:5000/api/data_presensi/presensi/laporan_kinerja/${id_presensi}`);
                const laporanData = await laporanResponse.json();

                const roleResponse = await fetch(`http://localhost:5000/api/role/laporan-kinerja/non-tpa/${id_presensi}`);
                const roleData = await roleResponse.json();

                const roleGuruResponse = await fetch(`http://localhost:5000/api/role/laporan-kinerja/guru/${id_presensi}`);
                const roleGuru = await roleGuruResponse.json();

                setDataPresensi(laporanData);
                setRoleData(roleData);
                setRoleGuru(roleGuru);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id_presensi]);

    const isChecked = (value) => value === 'ya';

    if (!presensi || !roleData || !roleGuru) {
        return <div>Loading...</div>;
    }

    return (
        <div className="px-5">
            <span className="text-2xl text-gray-950 font-semibold flex justify-center mb-5">Laporan Kinerja</span>

            <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col justify-between'>
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="box-border w-full md:w-1/2 mr-0 md:mr-2 mb-4 md:mb-0 rounded-sm border border-gray-200 flex-1 shadow-lg overflow-auto">
                        <div className="p-5">
                            {presensi.role === 'Non TPA' ? (
                                <ul className="list-none">
                                    <li className="p-2 flex items-center justify-between">
                                        <span className="text-sm">Memasak nasi</span>
                                        <input
                                            type="checkbox"
                                            name="masakNasi"
                                            className="p-2 w-4 h-4 flex-shrink-0"
                                            checked={isChecked(roleData.masak_nasi)}
                                            readOnly
                                        />
                                    </li>
                                    <li className="p-2 flex items-center justify-between">
                                        <span className="text-sm">Memasak lauk dan sayur</span>
                                        <input
                                            type="checkbox"
                                            name="masakLauk"
                                            className="p-2 w-4 h-4 flex-shrink-0"
                                            checked={isChecked(roleData.masak_lauk)}
                                            readOnly
                                        />
                                    </li>
                                    <li className="p-2 flex items-center justify-between">
                                        <span className="text-sm">Membuat bubur</span>
                                        <input
                                            type="checkbox"
                                            name="membuatBubur"
                                            className="p-2 w-4 h-4 flex-shrink-0"
                                            checked={isChecked(roleData.membuat_bubur)}
                                            readOnly
                                        />
                                    </li>
                                    <li className="p-2 flex items-center justify-between">
                                        <span className="text-sm">Mengontrol kompor dan gas sebelum dan sesudah dipakai</span>
                                        <input
                                            type="checkbox"
                                            name="kontrolKompor"
                                            className="p-2 w-4 h-4 flex-shrink-0"
                                            checked={isChecked(roleData.kontrol_kompor)}
                                            readOnly
                                        />
                                    </li>
                                    <li className="p-2 flex items-center justify-between">
                                        <span className="text-sm">Mengecek nasi sisa makan malam dan perabot di ruang makan</span>
                                        <input
                                            type="checkbox"
                                            name="cekNasiSisa"
                                            className="p-2 w-4 h-4 flex-shrink-0"
                                            checked={isChecked(roleData.cek_nasi_sisa)}
                                            readOnly
                                        />
                                    </li>
                                    <li className="p-2 flex items-center justify-between">
                                        <span className="text-sm">Mencuci peralatan masak nasi & membersihkan area tempat kerja</span>
                                        <input
                                            type="checkbox"
                                            name="cuciAlatMasak"
                                            className="p-2 w-4 h-4 flex-shrink-0"
                                            checked={isChecked(roleData.cuci_alat_masak)}
                                            readOnly
                                        />
                                    </li>
                                    <li className="p-2 flex items-center justify-between">
                                        <span className="text-sm">Membantu pendistribusian nasi dan lauk</span>
                                        <input
                                            type="checkbox"
                                            name="distribusiLauk"
                                            className="p-2 w-4 h-4 flex-shrink-0"
                                            checked={isChecked(roleData.distribusi_lauk)}
                                            readOnly
                                        />
                                    </li>
                                    <li className="p-2 flex items-center justify-between">
                                        <span className="text-sm">Melakukan Jum'at bersih</span>
                                        <input
                                            type="checkbox"
                                            name="jumatBersih"
                                            className="p-2 w-4 h-4 flex-shrink-0"
                                            checked={isChecked(roleData.jumat_bersih)}
                                            readOnly
                                        />
                                    </li>
                                    <li className="p-2 flex items-center justify-between">
                                        <span className="text-sm">Menggantikan supir apabila supir libur</span>
                                        <input
                                            type="checkbox"
                                            name="gantiSupirLibur"
                                            className="p-2 w-4 h-4 flex-shrink-0"
                                            checked={isChecked(roleData.ganti_supir_libur)}
                                            readOnly
                                        />
                                    </li>
                                </ul>
                            ) : presensi.role === 'Guru' || presensi.role === 'TPA' ? (
                                <ul className="list-none">
                                    <li className="p-2 flex items-center justify-between">
                                        <span className="text-sm">Menyusun rencana pembelajaran</span>
                                        <input
                                            type="checkbox"
                                            name="menyusunRencana"
                                            className="p-2 w-4 h-4 flex-shrink-0"
                                            checked={isChecked(roleGuru.menyusun_rencana)}
                                            readOnly
                                        />
                                    </li>
                                    <li className="p-2 flex items-center justify-between">
                                        <span className="text-sm">Menyiapkan materi ajar dan sumber belajar</span>
                                        <input
                                            type="checkbox"
                                            name="menyiapkanMateri"
                                            className="p-2 w-4 h-4 flex-shrink-0"
                                            checked={isChecked(roleGuru.menyiapkan_materi)}
                                            readOnly
                                        />
                                    </li>
                                    <li className="p-2 flex items-center justify-between">
                                        <span className="text-sm">Mengajar sesuai dengan jadwal dan rencana pelajaran</span>
                                        <input
                                            type="checkbox"
                                            name="sesuaiJadwal"
                                            className="p-2 w-4 h-4 flex-shrink-0"
                                            checked={isChecked(roleGuru.sesuai_jadwal)}
                                            readOnly
                                        />
                                    </li>
                                    <li className="p-2 flex items-center justify-between">
                                        <span className="text-sm">Mengisi catatan kehadiran siswa</span>
                                        <input
                                            type="checkbox"
                                            name="catatKehadiran"
                                            className="p-2 w-4 h-4 flex-shrink-0"
                                            checked={isChecked(roleGuru.catat_kehadiran)}
                                            readOnly
                                        />
                                    </li>
                                    <li className="p-2 flex items-center justify-between">
                                        <span className="text-sm">Menilai hasil pekerjaan siswa, seperti tugas, kuis, dan ujian</span>
                                        <input
                                            type="checkbox"
                                            name="menilaiTugas"
                                            className="p-2 w-4 h-4 flex-shrink-0"
                                            checked={isChecked(roleGuru.menilai_tugas)}
                                            readOnly
                                        />
                                    </li>
                                    <li className="p-2 flex items-center justify-between">
                                        <span className="text-sm">Mencatat kemajuan siswa selama proses belajar</span>
                                        <input
                                            type="checkbox"
                                            name="catatKemajuan"
                                            className="p-2 w-4 h-4 flex-shrink-0"
                                            checked={isChecked(roleGuru.catat_kemajuan)}
                                            readOnly
                                        />
                                    </li>
                                    <li className="p-2 flex items-center justify-between">
                                        <span className="text-sm">Mengikuti pelatihan atau workshop untuk pengembangan professional</span>
                                        <input
                                            type="checkbox"
                                            name="mengikutiPelatihan"
                                            className="p-2 w-4 h-4 flex-shrink-0"
                                            checked={isChecked(roleGuru.mengikuti_pelatihan)}
                                            readOnly
                                        />
                                    </li>
                                </ul>
                            ) : null}
                        </div>
                    </div>

                    <div className="box-border w-full md:w-1/2 ml-auto rounded-sm border border-gray-200 flex-1 shadow-lg overflow-auto">
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
        </div>
    )
};

export default LaporanKinerja;
