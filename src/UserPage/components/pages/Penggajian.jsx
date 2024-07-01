import React, { useEffect, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoDownloadOutline } from "react-icons/io5";
import moment from 'moment-timezone';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import { getStatus } from '../utils/status';
import { formatCurrency } from '../utils/formatCurrency';
import { formatMonth, formatDate } from '../utils/formatDate';

function Penggajian() {
  const [dataGaji, setDataGaji] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
        // bulan_gaji: moment.tz(item.bulan_gaji, 'Asia/Jakarta').format('DD/MM/YYYY')
      }));
      setDataGaji(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredGaji = dataGaji.filter((data) =>
    data.bulan_gaji_formatted.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadPDF = (id) => {
    const rowData = dataGaji.find(row => row.id_gaji === id);
    if (!rowData) return;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [100, 150]
    });
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFont('Courier');

    // Header
    doc.setFontSize(14);
    doc.text(`Slip Gaji`, pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`Bulan: ${rowData.bulan_gaji_formatted}`, 14, 30);
    doc.text(`Tanggal: ${rowData.bulan_gaji_date}`, 14, 40);

    // Body
    doc.setFontSize(10);
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

    // Footer
    doc.setFontSize(10);
    doc.text('Terima kasih atas kerja keras Anda!', 14, yPos + 20);

    doc.save(`Slip Gaji_${rowData.bulan_gaji_formatted}.pdf`);
  };

  return (
    <div>
      <p className="text-xl font-bold px-5">Data Gaji</p>

      <div>
        <div className="relative py-4 w-full justify-between flex flex-row">
          <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="text-sm focus:outline-none active:outline-none bg-gray-200 border border-gray-200 w-full h-10 pl-11 pr-4 rounded-sm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="px-4 text-sm rounded-sm border-[1.5px] border-gray-200 items-center overflow-x-auto">
          <div className="h-96 md:w-full w-[34rem] max-[500px]:w-[24rem] overflow-auto">
            <table className='text-gray-700 min-w-[900px]'>
              <thead className="sticky top-0 bg-white">
                <tr className="border-b-[1.5px]">
                  <td className='font-bold py-4'>No.</td>
                  <td className='font-bold py-4'>Bulan</td>
                  <td className='font-bold py-4'>Tanggal</td>
                  <td className='font-bold py-4'>Gaji Dasar</td>
                  <td className='font-bold py-4'>Tunjangan</td>
                  <td className='font-bold py-4'>Potongan</td>
                  <td className='font-bold py-4'>Total</td>
                  <td className='font-bold py-4'>Status</td>
                  <td className='font-bold py-4'>Action</td>
                </tr>
              </thead>
              <tbody>
                {filteredGaji.map((data, index) => (
                  <tr key={index}>
                    <td className="p-1 pt-2">{index + 1}</td>
                    <td>{data.bulan_gaji_formatted}</td>
                    <td>{data.bulan_gaji_date}</td>
                    <td>{formatCurrency(data.gaji_dasar)}</td>
                    <td>{formatCurrency(data.tunjangan)}</td>
                    <td>{formatCurrency(data.potongan)}</td>
                    <td>{formatCurrency(data.total)}</td>
                    <td>{data.status_gaji ? getStatus(data.status_gaji) : 'Status tidak tersedia'}</td>
                    <td className='font-semibold'>
                      <button onClick={() => downloadPDF(data.id_gaji)} className='flex justify-start items-center'>
                        Download Slip
                        <IoDownloadOutline fontSize={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Penggajian;
