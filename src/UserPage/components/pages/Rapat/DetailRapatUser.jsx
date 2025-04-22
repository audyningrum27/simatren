import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStatus } from '../../utils/status';

const DetailRapatUser = () => {
    const navigate = useNavigate();

    // dummy data
    const [formData] = useState({
        judulRapat: 'Rapat Guru MA',
        nomorSurat: '0000111112222227777777',
        pelaksana: 'Unit Guru & Staff MA',
        ruangRapat: 'Ruang 2 Gedung MA',
        tanggalRapat: '23 November 2024',
        waktuRapat: '09:00',
        agendaRapat: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        teksNotulen: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        linkNotulen: 'https://projects.d3ifcool.org/mahasiswa/data-pa',
        fileNotulen: 'hello.pdf',
        Status: 'Hadir'
    });

    return (
        <div>
            <p className="text-xl font-bold px-5 mb-4">Detail Rapat</p>

            <div className="bg-white border rounded-lg shadow-md p-4 mb-8">
                <dl className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-x-4 gap-y-2">
                    <dt className="font-semibold">Judul Rapat</dt>
                    <dd>{formData.judulRapat}</dd>
                    <dt className="font-semibold">Nomor Surat</dt>
                    <dd>{formData.nomorSurat}</dd>
                    <dt className="font-semibold">Pelaksana</dt>
                    <dd>{formData.pelaksana}</dd>
                    <dt className="font-semibold">Tanggal Rapat</dt>
                    <dd>{formData.tanggalRapat}</dd>
                    <dt className="font-semibold">Waktu Rapat</dt>
                    <dd>{formData.waktuRapat}</dd>
                    <dt className="font-semibold">Agenda Rapat</dt>
                    <dd>{formData.agendaRapat}</dd>
                    <dt className="font-semibold">Teks Notulen</dt>
                    <dd>{formData.teksNotulen}</dd>
                    <dt className="font-semibold">Link Notulen</dt>
                    <dd>
                        <a href={formData.linkNotulen} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                            {formData.linkNotulen}
                        </a>
                    </dd>
                    <dt className="font-semibold">File Notulen</dt>
                    <dd className="flex items-center gap-2 flex-wrap">
                        {formData.fileNotulen && (
                            <button className="bg-gray-300 hover:bg-green-900 hover:text-white font-semibold py-1 px-3 rounded-sm">
                                Unduh File
                            </button>
                        )}
                        {formData.fileNotulen}
                    </dd>
                    <dt className='font-semibold'>Kehadiran</dt>
                    <dd>{getStatus(formData.Status)}</dd>
                </dl>
            </div>

            <div className="flex justify-end px-5 mb-4">
                <button
                    onClick={() => navigate('/UserPage/histori_rapat')}
                    className="w-28 text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5"
                >
                    Selesai
                </button>
            </div>
        </div>
    );
};

export default DetailRapatUser;