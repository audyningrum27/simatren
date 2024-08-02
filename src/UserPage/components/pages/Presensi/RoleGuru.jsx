import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RoleGuru = () => {
    const { id_presensi } = useParams();
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        menyusunRencana: false,
        menyiapkanMateri: false,
        sesuaiJadwal: false,
        catatKehadiran: false,
        menilaiTugas: false,
        catatKemajuan: false,
        mengikutiPelatihan: false,
    });

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:5000/api/role/ceklis-harian/guru/${id_presensi}`, {
                ...formData
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.message);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                navigate(`/UserPage/lengkapi_presensi/${id_presensi}`);
            }, 2000);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Terjadi kesalahan saat menyimpan data');
        }
    };

    return (
        <div className="px-5">
            <span className="text-2xl text-gray-950 font-semibold flex justify-center">Aktivitas Harian</span>
            <div className='md:w-[60%] w-[100%] mx-auto h-full flex flex-col py-5 justify-between'>
                <div className="relative rounded-sm box-border border border-gray-200 shadow-lg shadow-gray-500 p-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td className="p-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                name="menyusunRencana"
                                                checked={formData.menyusunRencana}
                                                onChange={handleChange}
                                                className="p-2 mr-2 w-4 h-4"
                                            />
                                            <span className="text-sm">Menyusun rencana pembelajaran</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                name="menyiapkanMateri"
                                                checked={formData.menyiapkanMateri}
                                                onChange={handleChange}
                                                className="p-2 mr-2 w-4 h-4"
                                            />
                                            <span className="text-sm">Menyiapkan materi ajar dan sumber belajar</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                name="sesuaiJadwal"
                                                checked={formData.sesuaiJadwal}
                                                onChange={handleChange}
                                                className="p-2 mr-2 w-4 h-4"
                                            />
                                            <span className="text-sm">Mengajar sesuai dengan jadwal dan rencana pelajaran</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                name="catatKehadiran"
                                                checked={formData.catatKehadiran}
                                                onChange={handleChange}
                                                className="p-2 mr-2 w-4 h-4"
                                            />
                                            <span className="text-sm">Mengisi catatan kehadiran siswa</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                name="menilaiTugas"
                                                checked={formData.menilaiTugas}
                                                onChange={handleChange}
                                                className="p-2 mr-2 w-4 h-4"
                                            />
                                            <span className="text-sm">Menilai hasil pekerjaan siswa, seperti tugas, kuis, dan ujian</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                name="catatKemajuan"
                                                checked={formData.catatKemajuan}
                                                onChange={handleChange}
                                                className="p-2 mr-2 w-4 h-4"
                                            />
                                            <span className="text-sm">Mencatat kemajuan siswa selama proses belajar</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                name="mengikutiPelatihan"
                                                checked={formData.mengikutiPelatihan}
                                                onChange={handleChange}
                                                className="p-2 mr-2 w-4 h-4"
                                            />
                                            <span className="text-sm">Mengikuti pelatihan atau workshop untuk pengembangan professional</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-row px-3 justify-center gap-4 mx-auto">
                            <button
                                type="submit"
                                className="w-28 text-black bg-green-900 text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Kirim
                            </button>
                        </div>
                    </form>

                    {showPopup && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white font-semibold text-green-900 px-12 py-5 rounded-md shadow-lg">
                                <p>Aktivitas Harian Berhasil Dikirim</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoleGuru;
