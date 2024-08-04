import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';

const ScanQR = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [isScanningMasuk, setIsScanningMasuk] = useState(false);
  const [isScanningKeluar, setIsScanningKeluar] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [navigateToHistori, setNavigateToHistori] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [masukDisabled, setMasukDisabled] = useState(false);
  const [keluarDisabled, setKeluarDisabled] = useState(false);

  useEffect(() => {
    if (navigateToHistori) {
      const timer = setTimeout(() => {
        navigate('/UserPage/historipresensi');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [navigateToHistori, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const idPegawai = localStorage.getItem('id_pegawai');
    if (idPegawai) {
      fetch(`http://localhost:5000/api/data_presensi/presensi/status/${idPegawai}`)
        .then(response => response.json())
        .then(data => {
          setMasukDisabled(data.masuk);
          setKeluarDisabled(data.keluar);
        })
        .catch(error => console.error('Error fetching presensi status:', error));
    }
  }, []);

  useEffect(() => {
    if (isScanningMasuk || isScanningKeluar) {
      const interval = setInterval(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          const img = new Image();
          img.src = imageSrc;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const context = canvas.getContext('2d');
            context.drawImage(img, 0, 0, img.width, img.height);
            const imageData = context.getImageData(0, 0, img.width, img.height);
            const code = jsQR(imageData.data, img.width, img.height);
            if (code) {
              if (isScanningMasuk) {
                handleScanMasuk(code.data);
              } else if (isScanningKeluar) {
                handleScanKeluar(code.data);
              }
              setIsScanningMasuk(false);
              setIsScanningKeluar(false);
            }
          };
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isScanningMasuk, isScanningKeluar]);

  const handleScanMasuk = (data) => {
    const idPegawai = localStorage.getItem('id_pegawai');
    if (data && idPegawai) {
      const jakartaTime = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

      fetch(`http://localhost:5000/api/data_presensi/save-presensi/${idPegawai}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'masuk',
          timestamp: jakartaTime,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          setPopupMessage('Presensi Masuk Berhasil');
          setShowPopup(true);
          setNavigateToHistori(true);
        })
        .catch((error) => console.error('Error:', error));
    }
  };

  const handleScanKeluar = (data) => {
    const idPegawai = localStorage.getItem('id_pegawai');
    if (data && idPegawai) {
      const jakartaTime = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

      fetch(`http://localhost:5000/api/data_presensi/save-presensi/${idPegawai}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'keluar',
          timestamp: jakartaTime,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          setPopupMessage('Presensi Keluar Berhasil');
          setShowPopup(true);
          setNavigateToHistori(true);
        })
        .catch((error) => console.error('Error:', error));
    }
  };

  const previewStyle = {
    height: 240,
    width: 370,
    margin: '10px',
  };

  const checkTimeForButton = (start, end) => {
    const now = new Date();
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute);
    const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute);
    return now >= startTime && now <= endTime;
  };

  const isMasukButtonAvailable = checkTimeForButton('00:00', '24:00') && !masukDisabled;
  const isKeluarButtonAvailable = checkTimeForButton('00:00', '24:00') && !keluarDisabled;

  return (
    <div className="px-5">
      <div className="relative w-full flex flex-col md:flex-row items-center justify-between px-5">
        <p className="text-xl font-bold mb-4 md:mb-0">Presensi</p>
        <div className="md:absolute top-0 right-0 mt-2 md:mt-0 md:mr-5">
          <p className="text-lg text-black">
            {currentTime}
          </p>
        </div>
      </div>

      <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col py-5 justify-between'>
        <div className="relative rounded-sm box-border border border-gray-200 shadow-lg shadow-gray-500 p-10 overflow-x-auto">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <button
                  onClick={() => setIsScanningMasuk(true)}
                  disabled={!isMasukButtonAvailable}
                  className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isMasukButtonAvailable
                    ? 'bg-gray-300 text-black cursor-pointer hover:bg-green-900 hover:text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  Scan Masuk
                </button>
                {isScanningMasuk && (
                  <>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      style={previewStyle}
                    />
                    <button
                      onClick={() => setIsScanningMasuk(false)}
                      className="w-full text-black bg-red-500 hover:bg-red-700 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
                    >
                      Batal Scan Masuk
                    </button>
                  </>
                )}
              </div>

              <div className="flex-1">
                <button
                  onClick={() => setIsScanningKeluar(true)}
                  disabled={!isKeluarButtonAvailable}
                  className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isKeluarButtonAvailable
                    ? 'bg-gray-300 text-black cursor-pointer hover:bg-green-900 hover:text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  Scan Keluar
                </button>
                {isScanningKeluar && (
                  <>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      style={previewStyle}
                    />
                    <button
                      onClick={() => setIsScanningKeluar(false)}
                      className="w-full text-black bg-red-500 hover:bg-red-700 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
                    >
                      Batal Scan Keluar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white font-semibold text-green-900 p-5 rounded-md shadow-lg">
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanQR;