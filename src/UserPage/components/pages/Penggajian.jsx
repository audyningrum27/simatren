import React, { useEffect, useState } from 'react';
import { HiOutlineSearch, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { IoDownloadOutline } from "react-icons/io5";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import { getStatus } from '../utils/status';
import { formatCurrency } from '../utils/formatCurrency';
import { formatMonth, formatDate } from '../utils/formatDate';

function Penggajian() {
  const [dataGaji, setDataGaji] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchDataGaji();
  }, []);

  const fetchDataGaji = async () => {
    try {
      const token = localStorage.getItem('token');
      const id_pegawai = localStorage.getItem('id_pegawai');
      if (!id_pegawai) {
        console.error('id_pegawai is undefined');
        return;
      }
      const response = await axios.get(`http://localhost:5000/api/data_gaji/gaji/${id_pegawai}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data.map(item => ({
        ...item,
        bulan_gaji_formatted: formatMonth(item.bulan_gaji),
        bulan_gaji_date: formatDate(item.bulan_gaji)
      }));
      setDataGaji(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

  const filteredGaji = dataGaji.filter((data) =>
    data.bulan_gaji_formatted.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGaji.length / itemsPerPage);
  const currentPageData = filteredGaji.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const BoxWrapper = ({ children, isActive, onClick }) => (
    <button
      className={`rounded-sm px-2.5 py-1 flex-1 border-none flex items-center text-xs font-semibold ${isActive ? 'bg-green-900 text-white' : 'hover:bg-green-900'
        }`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  const downloadPDF = (selectedRows) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [100, 150]
    });

    selectedRows.forEach((id, index) => {
      const rowData = dataGaji.find(row => row.id_gaji === id);
      if (!rowData) return;

      if (index > 0) doc.addPage();
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.setFont('Courier');

      doc.setFontSize(14);
      doc.text(`Slip Gaji`, pageWidth / 2, 20, { align: 'center' });

      doc.setFontSize(10);
      doc.text(`Bulan: ${rowData.bulan_gaji_formatted}`, 14, 30);
      doc.text(`Tanggal: ${rowData.bulan_gaji_date}`, 14, 40);

      let yPos = 50;
      const lineHeight = 10;
      const labelXPos = 14;
      const colonXPos = 50;
      const valueXPos = 55;

      const addTextRow = (label, value) => {
        doc.text(label, labelXPos, yPos);
        doc.text(':', colonXPos, yPos);
        doc.text(value, valueXPos, yPos);
        yPos += lineHeight;
      };

      addTextRow('Nama Pegawai', rowData.nama_pegawai);
      addTextRow('NIP', rowData.nip);
      addTextRow('Gaji Dasar', `${formatCurrency(rowData.gaji_dasar)}`);
      addTextRow('Tunjangan', `${formatCurrency(rowData.tunjangan)}`);
      addTextRow('Potongan', `${formatCurrency(rowData.potongan)}`);
      addTextRow('Total', `${formatCurrency(rowData.total)}`);
      addTextRow('Status Gaji', rowData.status_gaji);

      doc.setFontSize(10);
      doc.text('Terima kasih atas kerja keras Anda!', 14, yPos + 20);
    });

    doc.save('Slip_Gaji.pdf');
    setSelectMode(false);
    setSelectedRows([]);
  };

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
  };

  const downloadAllPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [100, 150]
    });

    dataGaji.forEach((rowData, index) => {
      if (!rowData) return;

      if (index > 0) doc.addPage();
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.setFont('Courier');

      doc.setFontSize(14);
      doc.text(`Slip Gaji`, pageWidth / 2, 20, { align: 'center' });

      doc.setFontSize(10);
      doc.text(`Bulan: ${rowData.bulan_gaji_formatted}`, 14, 30);
      doc.text(`Tanggal: ${rowData.bulan_gaji_date}`, 14, 40);

      let yPos = 50;
      const lineHeight = 10;
      const labelXPos = 14;
      const colonXPos = 50;
      const valueXPos = 55;

      const addTextRow = (label, value) => {
        doc.text(label, labelXPos, yPos);
        doc.text(':', colonXPos, yPos);
        doc.text(value, valueXPos, yPos);
        yPos += lineHeight;
      };

      addTextRow('Nama Pegawai', rowData.nama_pegawai);
      addTextRow('NIP', rowData.nip);
      addTextRow('Gaji Dasar', `${formatCurrency(rowData.gaji_dasar)}`);
      addTextRow('Tunjangan', `${formatCurrency(rowData.tunjangan)}`);
      addTextRow('Potongan', `${formatCurrency(rowData.potongan)}`);
      addTextRow('Total', `${formatCurrency(rowData.total)}`);
      addTextRow('Status Gaji', rowData.status_gaji);

      doc.setFontSize(10);
      doc.text('Terima kasih atas kerja keras Anda!', 14, yPos + 20);
    });

    doc.save('Slip_Gaji_All.pdf');
  };

  return (
    <div>
      <p className="text-xl font-bold px-5">Data Gaji</p>

      <div className="relative py-4 w-full justify-between flex flex-col md:flex-row">
        <div className="relative flex flex-1 mb-4 md:mb-0 mr-4">
          <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="text-sm focus:outline-none active:outline-none bg-gray-200 border border-gray-200 w-full h-10 pl-11 pr-4 rounded-sm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex flex-row gap-2 font-semibold text-xs">
          <button
            onClick={selectMode ? () => downloadPDF(selectedRows) : toggleSelectMode}
            className='px-4 py-2 bg-green-900 text-white rounded'
            disabled={selectMode && selectedRows.length === 0}
          >
            {selectMode ? 'Download Selected' : 'Pilih Download'}
          </button>
          <button
            onClick={downloadAllPDF}
            className='px-4 py-2 bg-green-900 text-white rounded'
          >
            Download All
          </button>
        </div>
      </div>

      <div className="px-4 text-sm rounded-sm border-[1.5px] border-gray-200 items-center overflow-x-auto">
        <div className="h-96 md:w-full w-[34rem] max-[500px]:w-[24rem] overflow-auto">
          <table className='text-gray-700 min-w-[900px]'>
            <thead className="sticky top-0 bg-white">
              <tr className="border-b-[1.5px]">
                {selectMode && <td className='font-bold py-4'>Select</td>}
                <td className='font-bold py-4'>No.</td>
                <td className='font-bold py-4'>Bulan</td>
                <td className='font-bold py-4'>Tanggal</td>
                <td className='font-bold py-4'>Gaji Dasar</td>
                <td className='font-bold py-4'>Tunjangan</td>
                <td className='font-bold py-4'>Potongan</td>
                <td className='font-bold py-4'>Total</td>
                <td className='font-bold py-4'>Status</td>
                {!selectMode && <td className='font-bold py-4'>Action</td>}
              </tr>
            </thead>
            <tbody>
              {currentPageData.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center py-4">
                    Tidak ada data gaji untuk ditampilkan.
                  </td>
                </tr>
              )}
              {currentPageData.map((data, index) => (
                <tr key={data.id_gaji}>
                  {selectMode && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(data.id_gaji)}
                        onChange={() => handleRowSelect(data.id_gaji)}
                      />
                    </td>
                  )}
                  <td className="p-1 pt-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{data.bulan_gaji_formatted}</td>
                  <td>{data.bulan_gaji_date}</td>
                  <td>{formatCurrency(data.gaji_dasar)}</td>
                  <td>{formatCurrency(data.tunjangan)}</td>
                  <td>{formatCurrency(data.potongan)}</td>
                  <td>{formatCurrency(data.total)}</td>
                  <td>{data.status_gaji ? getStatus(data.status_gaji) : 'Status tidak tersedia'}</td>
                  {!selectMode && (
                    <td className='font-semibold'>
                      <button onClick={() => downloadPDF([data.id_gaji])} className='flex justify-start items-center'>
                        Download Slip
                        <IoDownloadOutline fontSize={18} />
                      </button>
                    </td>
                  )}
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
  );
}

export default Penggajian;