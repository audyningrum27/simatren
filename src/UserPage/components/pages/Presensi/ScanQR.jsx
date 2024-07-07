import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';

const ScanQR = () => {
  const webcamRef = useRef(null);
  const [isScanningMasuk, setIsScanningMasuk] = useState(false);
  const [isScanningKeluar, setIsScanningKeluar] = useState(false);
  const [scanResultMasuk, setScanResultMasuk] = useState(null);
  const [scanResultKeluar, setScanResultKeluar] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
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
                setScanResultMasuk(code.data);
                handleScanMasuk(code.data);
              } else if (isScanningKeluar) {
                setScanResultKeluar(code.data);
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
    if (data) {
      setScanResultMasuk(data.text);
      console.log(data);
      fetch('http://localhost:5000/api/save-presensi', {  // Pastikan URL sesuai
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          result: data.text,
          type: 'masuk',
          timestamp: new Date().toISOString(),
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
    }
  };

  const handleScanKeluar = (data) => {
    if (data) {
      setScanResultKeluar(data.text);
      console.log(data);
      fetch('http://localhost:5000/api/save-presensi', {  // Pastikan URL sesuai
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          result: data.text,
          type: 'keluar',
          timestamp: new Date().toISOString(),
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => console.log('Success:', data))
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

  const isMasukButtonAvailable = checkTimeForButton('07:00', '24:00');
  const isKeluarButtonAvailable = checkTimeForButton('07:00', '24:00');

  return (
    <div className="px-5">
      <div className="relative w-full flex flex-col md:flex-row items-center justify-between px-5">
        <p className="text-xl font-bold mb-4 md:mb-0">Presensi</p>
        <div className="md:absolute top-0 right-0 mt-2 md:mt-0 md:mr-5">
          <p className="text-lg text-black">
            {currentTime.toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div className='md:w-[100%] w-[90%] mx-auto h-full flex flex-col py-5 justify-between'>
        <div className="relative rounded-sm box-border border border-gray-200 shadow-lg shadow-gray-500 p-10">
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <button
                  onClick={() => setIsScanningMasuk(true)}
                  disabled={!isMasukButtonAvailable}
                  className="w-full text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
                {scanResultMasuk && <p className="text-green-600">Scan Result Masuk: {scanResultMasuk}</p>}
              </div>

              <div className="flex-1">
                <button
                  onClick={() => setIsScanningKeluar(true)}
                  disabled={!isKeluarButtonAvailable}
                  className="w-full text-black bg-gray-300 hover:bg-green-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
                {scanResultKeluar && <p className="text-green-600">Scan Result Keluar: {scanResultKeluar}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanQR;
