import { MdInsertChartOutlined, MdOutlineCalendarMonth } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { TbWallet, TbLogout, TbCalendarMonth } from "react-icons/tb";
import { AiOutlineLineChart } from "react-icons/ai";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/AdminPage",
    icon: <MdInsertChartOutlined />
  },
  {
    key: "manajemen_pegawai",
    label: "Manajemen Pegawai",
    path: "/AdminPage/manajemen_pegawai",
    icon: <HiOutlineUserGroup />
  },
  {
    key: "manajemen_gaji",
    label: "Manajemen Gaji",
    path: "/AdminPage/manajemen_gaji",
    icon: <TbWallet />
  },
  {
    key: "manajemen_presensi",
    label: "Manajemen Presensi",
    path: "/AdminPage/manajemen_presensi",
    icon: <MdOutlineCalendarMonth />
  },
  {
    key: "manajemen_cuti",
    label: "Manajemen Cuti",
    path: "/AdminPage/manajemen_cuti",
    icon: <TbCalendarMonth />
  },
]

export const DASHBOARD_SIDEBAR_KINERJA = [
  {
    key: "manajemen_kinerja",
    label: "Manajemen Kinerja",
    path: "/AdminPage/manajemen_kinerja",
    icon: <AiOutlineLineChart />
  },
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "logout",
    label: "Logout",
    path: "/logout",
    icon: <TbLogout />
  }
]