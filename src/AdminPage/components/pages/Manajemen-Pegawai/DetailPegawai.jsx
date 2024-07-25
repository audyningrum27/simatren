import React, { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { PiEmptyBold } from "react-icons/pi";
import { getPegawaiStatus } from "../../utils/status";
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment-timezone';

export default function DetailPegawai() {
    const navigate = useNavigate()
    const { id_pegawai } = useParams();
    const [pegawai, setPegawai] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupEdit, setShowPopupEdit] = useState(false);

    useEffect(() => {
        fetchPegawaiDetail();
    }, [id_pegawai]);

    const fetchPegawaiDetail = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/data_pegawai/pegawai/${id_pegawai}`);
            const data = await response.json();
            if (data.tanggal_lahir) {
                const tanggalLahir = moment.utc(data.tanggal_lahir).tz('Asia/Jakarta');
                const formattedDate = tanggalLahir.format('YYYY-MM-DD');
                data.tanggal_lahir = formattedDate;
            }
            setPegawai(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEditClick = async () => {
        if (isEditable) {
            try {
                const updatedPegawai = { ...pegawai };
                if (pegawai.tanggal_lahir) {
                    updatedPegawai.tanggal_lahir = moment(pegawai.tanggal_lahir).format('YYYY-MM-DD');
                }
                console.log('Updating pegawai:', updatedPegawai);

                const response = await fetch(`http://localhost:5000/api/data_pegawai/pegawai/${id_pegawai}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedPegawai),
                });
                const data = await response.json();
                if (response.ok) {
                    setShowPopupEdit(true);
                } else {
                    console.error('Error updating data:', data.error);
                }
            } catch (error) {
                console.error('Error updating data:', error);
            }
        }
        setIsEditable(!isEditable);
    };

    useEffect(() => {
        if (showPopupEdit) {
            const timer = setTimeout(() => {
                setShowPopupEdit(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showPopupEdit]);

    const handleDeleteClick = () => {
        setIsDeleting(true);
    };

    const confirmDelete = async () => {
        try {
            await fetch(`http://localhost:5000/api/data_pegawai/pegawai/${id_pegawai}`, {
                method: 'DELETE',
            });
            setShowPopup(true);
            setIsDeleting(false);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
                navigate('/AdminPage/manajemen_pegawai');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showPopup]);

    const cancelDelete = () => {
        setIsDeleting(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPegawai((prevPegawai) => ({ ...prevPegawai, [name]: value }));
    };

    if (!pegawai) return <p>Loading...</p>;

    const viewKartuKeluarga = () => {
        const url = `http://localhost:5000/api/data_pegawai/pegawai/view-kk/${id_pegawai}`;
        window.open(url, '_blank');
    };

    return (
        <div className="px-5">
            <span className="text-2xl text-gray-950 font-semibold flex justify-center mb-5">Detail Pegawai</span>

            <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col justify-between'>
                <div className="box-border rounded-sm border border-gray-200 flex-1 shadow-lg overflow-auto">
                    <div className="flex flex-col md:flex-row">
                        <div className="box-border relative md:w-1/5 h-56 bg-gray-300 justify-center items-center flex flex-col rounded-sm mx-10 mt-6">
                            <div className="relative flex flex-col justify-center items-center border border-gray-400 rounded-full w-24 h-24">
                                {pegawai.foto_profil ? (
                                    <img
                                        src={`data:image/${pegawai.foto_profil.type};base64,${pegawai.foto_profil.data}`}
                                        alt="Foto Profil"
                                        className="border border-gray-400 rounded-full w-24 h-24"
                                    />
                                ) : (
                                    <FaUserCircle className="text-8xl text-gray-500" />
                                )}
                            </div>
                            <p className="mt-2 text-sm">{pegawai.nama_pegawai}</p>
                            <p className="mt-2 text-sm">{pegawai.nip}</p>
                            <div className="flex flex-row w-56 justify-center mt-5">
                                <p className="px-2 text-sm">Status :</p>
                                <p>{getPegawaiStatus(pegawai.status_kepegawaian)}</p>
                            </div>
                        </div>

                        <div className="flex-1">
                            <table className='w-full border-separate p-5 text-gray-950 text-sm'>
                                <tbody>
                                    <tr>
                                        <td>Nama Lengkap</td>
                                        <td className="p-2">:</td>
                                        <td className="px-2 border border-gray-400 rounded-md">
                                            <input
                                                type="text"
                                                name="nama_pegawai"
                                                value={pegawai.nama_pegawai}
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Nomor Induk Pegawai</td>
                                        <td className="p-2">:</td>
                                        <td className="px-2 border border-gray-400 rounded-md">
                                            <input
                                                type="text"
                                                name="nip"
                                                value={pegawai.nip}
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tempat, Tanggal Lahir</td>
                                        <td className="p-2">:</td>
                                        <td className="flex items-center gap-2">
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    name="tempat_lahir"
                                                    value={pegawai.tempat_lahir}
                                                    readOnly={!isEditable}
                                                    onChange={handleChange}
                                                    className={`w-full border border-gray-400 rounded-md px-2 py-2 bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                                                />
                                            </div>
                                            <div className="flex-none w-1/3">
                                                <input
                                                    type="date"
                                                    name="tanggal_lahir"
                                                    value={pegawai.tanggal_lahir}
                                                    readOnly={!isEditable}
                                                    onChange={handleChange}
                                                    className={`w-full border border-gray-400 rounded-md px-2 py-2 bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Jenis Kelamin</td>
                                        <td className="p-2">:</td>
                                        <td className="px-2 border border-gray-400 rounded-md">
                                            <select
                                                name="jenis_kelamin"
                                                value={pegawai.jenis_kelamin}
                                                disabled={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                                            >
                                                <option value="Laki-laki">Laki-laki</option>
                                                <option value="Perempuan">Perempuan</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Alamat</td>
                                        <td className="p-2">:</td>
                                        <td className="px-2 border border-gray-400 rounded-md">
                                            <input
                                                type='text'
                                                name="alamat"
                                                value={pegawai.alamat}
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Nomor Telepon</td>
                                        <td className="p-2">:</td>
                                        <td className="px-2 border border-gray-400 rounded-md">
                                            <input
                                                type="text"
                                                name="no_telp"
                                                value={pegawai.no_telp || ''}
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td className="p-2">:</td>
                                        <td className="px-2 border border-gray-400 rounded-md">
                                            <input
                                                type="email"
                                                name="email"
                                                value={pegawai.email || ''}
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Posisi</td>
                                        <td className="p-2">:</td>
                                        <td className="px-2 border border-gray-400 rounded-md">
                                            <select
                                                name="role"
                                                value={pegawai.role || ''}
                                                disabled={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                                            >
                                                <option value="Guru">Guru</option>
                                                <option value="TPA">TPA</option>
                                                <option value="Non TPA">Non TPA</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Status BPJS</td>
                                        <td className="p-2">:</td>
                                        <td className="px-2 border border-gray-400 rounded-md">
                                            <select
                                                name="status_bpjs"
                                                value={pegawai.status_bpjs}
                                                disabled={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                                            >
                                                <option value="Aktif">Aktif</option>
                                                <option value="Nonaktif">Nonaktif</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Status Perkawinan</td>
                                        <td className="p-2">:</td>
                                        <td className="px-2 border border-gray-400 rounded-md">
                                            <select
                                                name="status_kawin"
                                                value={pegawai.status_kawin}
                                                disabled={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full border-none bg-transparent focus:outline-none ${isEditable ? 'bg-white' : ''}`}
                                            >
                                                <option value="Belum Menikah">Belum Menikah</option>
                                                <option value="Menikah">Menikah</option>
                                                <option value="Cerai">Cerai</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Data Keluarga</td>
                                        <td className="p-2">:</td>
                                        <td className='font-semibold'>
                                            {pegawai.kartu_keluarga ? (
                                                <button
                                                    className='flex justify-start items-center bg-green-500 px-3 py-1 rounded-sm'
                                                    onClick={viewKartuKeluarga}
                                                >
                                                    <MdOutlineRemoveRedEye fontSize={16} className='mr-1' />
                                                    Lihat
                                                </button>
                                            ) : (
                                                <div>
                                                    <button
                                                        className='flex justify-start items-center bg-gray-300 px-3 py-1 rounded-sm text-gray-700'
                                                        disabled
                                                    >
                                                        <PiEmptyBold fontSize={16} className='mr-1' />
                                                        Belum ada data
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex flex-row gap-6 justify-end px-5 md:w-[100%] w-[90%] mx-auto mb-5">
                        <button
                            type="button"
                            onClick={handleEditClick}
                            className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            {isEditable ? 'Simpan' : 'Edit'}
                        </button>
                        <button
                            type="button"
                            onClick={handleDeleteClick}
                            className="w-28 text-black bg-red-500 hover:bg-red-700 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Hapus
                        </button>
                    </div>
                </div>

                {isDeleting && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-5 rounded-lg shadow-lg text-sm">
                            <p className="mb-4">Apakah Anda yakin ingin menghapus data ini?</p>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={cancelDelete}
                                    className="mr-4 px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white font-semibold text-green-900 p-5 rounded-md shadow-lg">
                            <p>Data pegawai berhasil dihapus.</p>
                        </div>
                    </div>
                )}

                {showPopupEdit && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white font-semibold text-green-900 p-5 rounded-md shadow-lg">
                            <p>Data pegawai berhasil diperbarui.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}