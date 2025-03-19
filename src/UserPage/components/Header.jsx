import { useState, useEffect } from 'react';
import { MdNotifications } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const Header = ({ isOpen, setIsOpen }) => {
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const idPegawai = localStorage.getItem('id_pegawai');

  useEffect(() => {
    const socket = io('https://be-simatren.riset-d3rpla.com');

    socket.on('notification', (notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchNotifications = async () => {
    if (!idPegawai) return;
    try {
      const response = await axios.all([
        axios.get(`https://be-simatren.riset-d3rpla.com/api/data_notifikasi/notifikasi-cuti/${idPegawai}`),
        axios.get(`https://be-simatren.riset-d3rpla.com/api/data_notifikasi/notifikasi-pelatihan/${idPegawai}`),
        axios.get(`https://be-simatren.riset-d3rpla.com/api/data_notifikasi/notifikasi-acc-pelatihan/${idPegawai}`)
      ]);

      const cutiNotifications = response[0].data;
      const pelatihanNotifications = response[1].data;
      const accPelatihanNotifications = response[2].data;

      setNotifications([
        ...cutiNotifications.filter(n => n.status !== 'read'),
        ...pelatihanNotifications.filter(n => n.status !== 'read'),
        ...accPelatihanNotifications.filter(n => n.status !== 'read')
      ]);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    if (!isDropdownOpen) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 2000);

      return () => clearInterval(interval);
    }
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleNotificationClick = async (notification) => {
    try {
      let endpoint, path;

      if (notification.category === 'cuti') {
        endpoint = `https://be-simatren.riset-d3rpla.com/api/data_notifikasi/notifikasi-cuti/${notification.id_notifikasi}`;
        path = '/UserPage/histori_cuti';
      } else if (notification.category === 'pelatihan') {
        endpoint = `https://be-simatren.riset-d3rpla.com/api/data_notifikasi/notifikasi-pelatihan/${notification.id_notifikasi}`;
        path = '/UserPage/jadwal_pelatihan_pegawai';
      } else if (notification.category === 'acc-pelatihan') {
        endpoint = `https://be-simatren.riset-d3rpla.com/api/data_notifikasi/notifikasi-acc-pelatihan/${notification.id_notifikasi}`;
        path = '/UserPage/histori_pelatihan_pegawai';
      }

      await axios.put(endpoint);

      setNotifications(prevNotifications =>
        prevNotifications.filter(n => n.id_notifikasi !== notification.id_notifikasi)
      );

      navigate(path);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Error updating notification status:', error);
    }
  };


  return (
    <div>
      <div className="text-gray-400 bg-white shadow-md h-14 px-4 flex items-center w-full">
        <button onClick={() => setIsOpen((prev) => !prev)} className="text-gray-400 md:hidden">
          <FaBars className="w-6 h-6" />
        </button>
        <div className="md:w-full w-[34rem] max-[500px]:w-[23rem]">
          <div className="ml-auto flex items-center justify-center box-border h-6 w-8 border-2 border-green-900 rounded-md shadow-md shadow-gray-400 cursor-pointer relative">
            <button onClick={toggleDropdown} className="relative">
              <MdNotifications className="icon-gray-200" />
              {notifications.some((n) => n.status === 'unread') && (
                <div className="absolute -top-2 -right-3 h-4 w-4 bg-red-500 rounded-full text-white text-[0.6rem] flex items-center justify-center">
                  {notifications.filter((n) => n.status === 'unread').length}
                </div>
              )}
            </button>
            {isDropdownOpen && (
              <div className="absolute top-10 right-0 bg-white border border-green-900 rounded-md shadow-lg z-10 w-[30rem]">
                <ul className="list-none p-2">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <li
                        key={notification.id_notifikasi}
                        className="px-2 border-b last:border-b-0 truncate text-xs cursor-pointer"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        {notification.message}
                      </li>
                    ))
                  ) : (
                    <li className="px-2 text-gray-500">Tidak ada notifikasi</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
