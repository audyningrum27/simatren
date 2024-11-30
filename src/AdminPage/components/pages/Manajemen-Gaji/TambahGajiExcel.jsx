import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoDownload } from "react-icons/go";
import axios from 'axios';

const TambahGajiExcel = () => {
    const [file, setFile] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            alert('Please upload a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://backend.simatren.space/api/data_gaji/import-gaji', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setPopupMessage(response.data.message);
            setShowPopup(true);
            setTimeout(() => navigate('/AdminPage/manajemen_gaji'), 2000);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file.');
        }
    };

    const handleDownloadTemplate = async () => {
        try {
            const response = await axios.get('https://backend.simatren.space/api/data_gaji/download-template', {
                responseType: 'blob', 
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'template_data_gaji.xlsx'); 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); 
        } catch (error) {
            console.error('Error downloading template:', error);
            alert('Failed to download template.');
        }
    };

    return (
        <div className="px-5">
            <span className="text-2xl text-gray-950 font-semibold flex justify-center">Tambah Data Gaji Excel</span>

            <div className='md:w-[70%] w-[100%] mx-auto h-full flex flex-col py-5 justify-between'>
                <div className="relative rounded-sm box-border border border-gray-200 shadow-lg shadow-gray-500 p-10">
                    {/* Button Download Template */}
                    <div className="flex justify-center md:justify-start mb-4">
                        <button
                            type="button"
                            onClick={handleDownloadTemplate}
                            className="flex flex-row w-fit text-black bg-gray-100 border border-gray-400 focus:outline-none rounded-md text-sm px-1.5 py-1.5 text-center"
                        >
                            Download Template
                            <GoDownload fontSize={18} className='ml-1'/>
                        </button>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td className="p-2 text-sm">File Excel<span className="text-red-600">*</span></td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            <input
                                                type="file"
                                                accept=".xlsx"
                                                onChange={handleFileChange}
                                                className="p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
                                                required
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-row px-3 justify-end gap-4 mx-auto">
                            <button
                                type="button"
                                onClick={() => navigate('/AdminPage/manajemen_gaji')}
                                className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white font-semibold text-green-900 p-5 rounded-md shadow-lg">
                        <p>Data Gaji Berhasil Ditambahkan!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TambahGajiExcel;