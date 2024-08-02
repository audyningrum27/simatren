import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

const RoleStafDapur = () => {
    const { id_presensi } = useParams();
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const [isFriday, setIsFriday] = useState(false);
    const [formData, setFormData] = useState({
        masakNasi: false,
        masakLauk: false,
        membuatBubur: false,
        kontrolKompor: false,
        cekNasiSisa: false,
        cuciAlatMasak: false,
        distribusiLauk: false,
        jumatBersih: false,
        gantiSupirLibur: false,
    });

    useEffect(() => {
        const fetchTanggalPresensi = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/data_presensi/presensi/${id_presensi}`);
                const tanggalPresensi = response.data.tanggal_presensi;
                const dayOfWeek = moment(tanggalPresensi).format('dddd');
                setIsFriday(dayOfWeek === 'Friday');
            } catch (error) {
                console.error('Error fetching tanggal presensi:', error);
            }
        };

        fetchTanggalPresensi();
    }, [id_presensi]);

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
            const response = await axios.post(`http://localhost:5000/api/role/ceklis-harian/non-tpa/${id_presensi}`, {
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
                                                name="masakNasi"
                                                checked={formData.masakNasi}
                                                onChange={handleChange}
                                                className="p-2 mr-2 w-4 h-4"
                                            />
                                            <span className="text-sm">Memasak nasi</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                name="masakLauk"
                                                checked={formData.masakLauk}
                                                onChange={handleChange}
                                                className="p-2 mr-2 w-4 h-4"
                                            />
                                            <span className="text-sm">Memasak lauk dan sayur</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                name="membuatBubur"
                                                checked={formData.membuatBubur}
                                                onChange={handleChange}
                                                className="p-2 mr-2 w-4 h-4"
                                            />
                                            <span className="text-sm">Membuat bubur</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                name="kontrolKompor"
                                                checked={formData.kontrolKompor}
                                                onChange={handleChange}
                                                className="p-2 mr-2 w-4 h-4"
                                            />
                                            <span className="text-sm">Mengontrol kompor dan gas sebelum dan sesudah dipakai</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                name="cekNasiSisa"
                                                checked={formData.cekNasiSisa}
                                                onChange={handleChange}
                                                className="p-2 mr-2 w-4 h-4"
                                            />
                                            <span className="text-sm">Mengecek nasi sisa makan malam dan perabot di ruang makan</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                name="cuciAlatMasak"
                                                checked={formData.cuciAlatMasak}
                                                onChange={handleChange}
                                                className="p-2 mr-2 w-4 h-4"
                                            />
                                            <span className="text-sm">Mencuci peralatan masak nasi & membersihkan area tempat kerja</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                name="distribusiLauk"
                                                checked={formData.distribusiLauk}
                                                onChange={handleChange}
                                                className="p-2 mr-2 w-4 h-4"
                                            />
                                            <span className="text-sm">Membantu pendistribusian nasi dan lauk </span>
                                        </td>
                                    </tr>
                                    {isFriday && (
                                        <>
                                            <tr>
                                                <td className="p-2 flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="jumatBersih"
                                                        checked={formData.jumatBersih}
                                                        onChange={handleChange}
                                                        className="p-2 mr-2 w-4 h-4"
                                                    />
                                                    <span className="text-sm">Melakukan Jum'at bersih</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-2 flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="gantiSupirLibur"
                                                        checked={formData.gantiSupirLibur}
                                                        onChange={handleChange}
                                                        className="p-2 mr-2 w-4 h-4"
                                                    />
                                                    <span className="text-sm">Menggantikan supir apabila supir libur</span>
                                                </td>
                                            </tr>
                                        </>
                                    )}
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

export default RoleStafDapur;
