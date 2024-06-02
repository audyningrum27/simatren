import { FaUser } from "react-icons/fa";
import { TbWallet, TbLogout } from "react-icons/tb";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { VscTools } from "react-icons/vsc";
import { AiOutlineLineChart } from "react-icons/ai";

export const DASHBOARD_SIDEBAR_TOP_LINKS = [
  {
    key: "profil",
    label: "Profil",
    path: "/UserPage",
    icon: <FaUser />
  }
]

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "penggajian",
    label: "Penggajian",
    path: "/UserPage/penggajian",
    icon: <TbWallet />
  },
  {
    key: "cuti",
    label: "Cuti",
    path: "/UserPage/pengajuan_cuti",
    icon: <MdOutlineCalendarMonth />
  },
  {
    key: "pelatihan",
    label: "Pelatihan",
    path: "/UserPage/pelaporan_pelatihan",
    icon: <VscTools />
  },
  {
    key: "grafik_kinerja",
    label: "Grafik Kinerja",
    path: "/UserPage/grafik_kinerja",
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