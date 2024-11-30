import React, { useEffect, useState } from 'react';
import { HiOutlineSearch, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { HiMiniPlus } from "react-icons/hi2";
import { getPegawaiStatus } from '../../utils/status';
import { useNavigate } from 'react-router-dom';

function ManajemenPegawai() {
    const [dataPegawai, setDataPegawai] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        fetchDataPegawai();
    }, []);

    const fetchDataPegawai = async () => {
        try {
            const response = await fetch('https://backend.simatren.space/api/data_pegawai/pegawai');
            const data = await response.json();
            setDataPegawai(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredPegawai = dataPegawai.filter((data) =>
        data.nama_pegawai.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.nip.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPegawai.length / itemsPerPage);
    const currentPageData = filteredPegawai.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const BoxWrapper = ({ children, isActive, onClick }) => (
        <button
            className={`rounded-sm px-2.5 py-1 flex-1 border-none flex items-center text-xs font-semibold ${
                isActive ? 'bg-green-900 text-white' : 'hover:bg-green-900'
            }`}
            onClick={onClick}
        >
            {children}
        </button>
    );

    return (
        <div>
            <p className="text-xl font-bold px-5">Manajemen Pegawai</p>
            <div>
                <div className="relative py-4 flex flex-row justify-between items-center w-full md:w-full px-4 md:px-0">
                    <div className="relative flex-1 mr-2">
                        <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="text-sm focus:outline-none active:outline-none bg-gray-200 border border-gray-200 w-full h-10 pl-11 rounded-sm"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="flex items-center">
                        <button onClick={() => navigate('/AdminPage/tambah_data_pegawai')} className="font-semibold text-xs text-white bg-green-900 rounded-sm h-10 px-10">
                            <HiMiniPlus fontSize={22} className="inline mr-1" /> Tambah Pegawai
                        </button>
                    </div>
                </div>

                <div className="px-4 text-sm rounded-sm border-[1.5px] border-gray-200 items-center overflow-x-auto">
                    <div className="h-96 md:w-full w-[34rem] max-[500px]:w-[24rem] overflow-auto">
                        <table className='text-gray-700 min-w-[900px]'>
                            <thead className="sticky top-0 bg-white">
                                <tr className="border-b-[1.5px]">
                                    <td className='font-bold py-4'>No.</td>
                                    <td className='font-bold py-4'>NIP</td>
                                    <td className='font-bold py-4'>Nama Pegawai</td>
                                    <td className='font-bold py-4'>Jenis Kelamin</td>
                                    <td className='font-bold py-4'>Role</td>
                                    <td className='font-bold py-4'>Status</td>
                                    <td className='font-bold py-4'>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageData.map((data, index) => (
                                    <tr key={index}>
                                        <td className="p-1 pt-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{data.nip}</td>
                                        <td>{data.nama_pegawai}</td>
                                        <td>{data.jenis_kelamin}</td>
                                        <td className='pr-4'>{data.unit_kerja}</td>
                                        <td>{getPegawaiStatus(data.status_kepegawaian)}</td>
                                        <td className='font-semibold'>
                                            <button onClick={() => navigate(`/AdminPage/detail_pegawai/${data.id_pegawai}`)} className='flex justify-start items-center'>
                                                Detail
                                                <HiChevronRight fontSize={18} className='ml-1' />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='py-2 justify-end flex flex-row items-center'>
                    <button onClick={goToPreviousPage} disabled={currentPage === 1}><HiChevronLeft fontSize={18} className='mr-2' /></button>
                    <div className='flex gap-4'>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <BoxWrapper
                                key={index}
                                isActive={currentPage === index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </BoxWrapper>
                        ))}
                    </div>
                    <button onClick={goToNextPage} disabled={currentPage === totalPages}><HiChevronRight fontSize={18} className='ml-2' /></button>
                </div>
            </div>
        </div>
    );
}

export default ManajemenPegawai;