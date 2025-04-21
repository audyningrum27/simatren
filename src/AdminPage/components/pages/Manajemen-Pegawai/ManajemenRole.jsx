import React, { useEffect, useState } from 'react';
import { HiOutlineSearch, HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { HiMiniPlus } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { getPegawaiStatus } from '../../utils/status';

function ManajemenRole() {
	const navigate = useNavigate();
	const [datarole, setDataRole] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const [searchTerm, setSearchTerm] = useState('');

	// Data Dummy
	const dummyData = [
		{ nama_role: 'Guru MA', unit_kerja: 'TPA', fitur_status: 'Aktif' },
		{ nama_role: 'Guru MTs', unit_kerja: 'TPA', fitur_status: 'Aktif' },
		{ nama_role: 'Kaur TA MA', unit_kerja: 'TPA', fitur_status: 'Aktif' },
		{ nama_role: 'Kaur TA MTs', unit_kerja: 'TPA', fitur_status: 'Aktif' },
		{ nama_role: 'Kepala MA', unit_kerja: 'TPA', fitur_status: 'Aktif' },
		{ nama_role: 'Kepala MTs', unit_kerja: 'TPA', fitur_status: 'Aktif' },
		{ nama_role: 'Anggota Security', unit_kerja: 'Non TPA', fitur_status: 'None' },
		{ nama_role: 'Konselor', unit_kerja: 'Non TPA', fitur_status: 'None' },
		{ nama_role: 'Staf Asrama', unit_kerja: 'Non TPA', fitur_status: 'None' },
		{ nama_role: 'Staf TU MA', unit_kerja: 'Non TPA', fitur_status: 'None' },
		{ nama_role: 'Staf TU MTs', unit_kerja: 'Non TPA', fitur_status: 'None' },
	];

	useEffect(() => {
		setDataRole(dummyData); // Gunakan data dummy sebelum fetch data dari database
		fetchDataRole();
	}, []);

	const fetchDataRole = async () => {
		try {
			const response = await fetch('https://be-simatren.riset-d3rpla.com/api/data_role');
			const data = await response.json();
			setDataRole(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const filteredDataRole = datarole.filter((data) =>
		data.nama_role.toLowerCase().includes(searchTerm.toLowerCase()) ||
		data.unit_kerja.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const totalPages = Math.ceil(filteredDataRole.length / itemsPerPage);
	const currentPageData = filteredDataRole.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	const goToPreviousPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const goToNextPage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	return (
		<div>
			<p className="text-xl font-bold px-5">Manage Data Role</p>

			<div className="relative py-4 flex flex-row justify-between items-center w-full md:w-full px-4 md:px-0">
				{/* Search Bar */}
				<div className="relative flex-1 mr-2">
					<HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
					<input
						type="text"
						placeholder="Cari nama role atau unit kerja..."
						className="text-sm bg-gray-100 border border-gray-300 w-full h-10 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-900"
						value={searchTerm}
						onChange={handleSearchChange}
					/>
				</div>
				{/* Tambah Role */}
				<div className="flex items-center">
					<button onClick={() => navigate('/AdminPage/tambah_data_role')} className="font-semibold text-xs text-white bg-green-900 rounded-sm h-10 px-5">
						<HiMiniPlus fontSize={22} className="inline mr-1" /> Tambah Role
					</button>
				</div>
			</div>

			{/* Table */}
			<div className="min-h-[484px] md:w-full w-[34rem] max-[500px]:w-[24rem] overflow-auto border rounded-lg shadow-sm">
				<table className="w-full text-sm text-left text-gray-700 min-w-[900px]">
					<thead className="sticky top-0 bg-white uppercase">
						<tr className='border-b-[1.5px]'>
							<th className="px-4 py-3">No</th>
							<th className="px-4 py-3">Nama Posisi / Role</th>
							<th className="px-4 py-3">Unit Kerja</th>
							<th className="px-4 py-3">Fitur Status</th>
							<th className="px-4 py-3">Aksi</th>
						</tr>
					</thead>
					<tbody className="bg-white">
						{currentPageData.length === 0 ? (
							<tr>
								<td colSpan="10" className="text-center py-4 text-gray-500">Tidak ada riwayat rapat.</td>
							</tr>
						) : (
							currentPageData.map((data, index) => (
								<tr key={index} className="hover:bg-gray-50">
									<td className="px-4 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
									<td className="px-4 py-3">{data.nama_role}</td>
									<td className="px-4 py-3">{data.unit_kerja}</td>
									<td className="px-4 py-3">{getPegawaiStatus(data.fitur_status)}</td>
									<td className="px-4 py-3">
										<button onClick={() => navigate(`/AdminPage/detail_data_role`)} className="font-semibold hover:underline flex items-center">
											Detail <HiChevronRight fontSize={18} className="ml-1" />
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<div className="flex items-center justify-center mt-4 space-x-4">
				<button
					onClick={goToPreviousPage}
					disabled={currentPage === 1}
					className="px-3 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
				>
					<HiChevronLeft fontSize={18} />
				</button>

				{/* sliding window pagination */}
				<div className="flex space-x-1">
					{(() => {
						const visiblePages = 5;
						let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
						let endPage = startPage + visiblePages - 1;

						if (endPage > totalPages) {
							endPage = totalPages;
							startPage = Math.max(1, endPage - visiblePages + 1);
						}

						const pageNumbers = [];
						for (let i = startPage; i <= endPage; i++) {
							pageNumbers.push(i);
						}

						return (
							<>
								{startPage > 1 && (
									<>
										<button
											onClick={() => setCurrentPage(1)}
											className="px-4 py-2 rounded-md font-semibold text-sm bg-gray-200 text-gray-700 hover:bg-gray-300"
										>
											1
										</button>
										<span className="px-2">...</span>
									</>
								)}
								{pageNumbers.map((page) => (
									<button
										key={page}
										className={`px-4 py-2 rounded-md font-semibold text-sm ${currentPage === page
											? 'bg-green-900 text-white'
											: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
											}`}
										onClick={() => setCurrentPage(page)}
									>
										{page}
									</button>
								))}
								{endPage < totalPages && (
									<>
										<span className="px-2">...</span>
										<button
											onClick={() => setCurrentPage(totalPages)}
											className="px-4 py-2 rounded-md font-semibold text-sm bg-gray-200 text-gray-700 hover:bg-gray-300"
										>
											{totalPages}
										</button>
									</>
								)}
							</>
						);
					})()}
				</div>

				<button
					onClick={goToNextPage}
					disabled={currentPage === totalPages}
					className="px-3 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
				>
					<HiChevronRight fontSize={18} />
				</button>
			</div>
		</div>
	);
}

export default ManajemenRole;