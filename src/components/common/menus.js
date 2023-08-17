import {
  FaHome,
  FaUser,
  FaCog,
  FaChevronDown,
  FaChevronUp,
  FaLayerGroup,
} from "react-icons/fa";
import { BsFingerprint } from "react-icons/bs";
import { TbFingerprintOff, TbReportSearch } from "react-icons/tb";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { MdBlurOff } from "react-icons/md";

export const menu = [
  {
    id: 1,
    icon: FaHome,
    title: "Dashboard",
    link: "/",
    children: [],
    isOpen: false,
    role: ["admin", "supervisor"],
  },
  {
    id: 2,
    icon: FaLayerGroup,
    title: "Resources",
    link: "#",
    children: [
      {
        id: "c1",
        icon: FaHome,
        title: "centers",
        link: "/centers",
      },
      {
        id: "c2",
        icon: BsFingerprint,
        title: "Devices",
        link: "/devices",
      },
    ],
    isOpen: false,
    role: ["admin"],
  },
  {
    id: 3,
    icon: FaHome,
    title: "Applicants",
    link: "/applicants",
    children: [],
    isOpen: false,
    role: ["admin", "supervisor", "enroller", "reviewer"],
  },
  {
    id: 3222,
    icon: MdBlurOff,
    title: "Suspected",
    link: "/suspected",
    children: [],
    isOpen: false,
    role: ["admin", "supervisor", "reviewer"],
  },
  {
    id: "c1",
    icon: BsFingerprint,
    title: "Unapproved IDs",
    link: "/unapproved_ids",
    children: [],
    isOpen: false,
    role: ["admin", "supervisor", "reviewer"],
  },
  {
    id: "c2",
    icon: BsFingerprint,
    title: "national ID",
    link: "#",
    children: [
      {
        id: "a2",
        icon: BsFingerprint,
        title: "Approved IDs",
        link: "/approved_ids",
      },
      {
        id: "a3",
        icon: BsFingerprint,
        title: "Renew ID",
        link: "/renew_id",
      },
      {
        id: "a4",
        icon: BsFingerprint,
        title: "Remodify ID",
        link: "/remodify_id",
      },
    ],
    isOpen: false,
    role: ["admin", "supervisor"],
  },
  {
    id: "c3",
    icon: TbFingerprintOff,
    title: "Lost IDs",
    link: "/lost_id",
    children: [],
    isOpen: false,
    role: ["admin", "supervisor", "enroller", "reviewer"],
  },

  {
    id: 30,
    icon: FaUsers,
    title: "Users",
    link: "/users",
    children: [],
    isOpen: false,
    role: ["admin"],
  },
  {
    id: 322,
    icon: TbReportSearch,
    title: "Reports",
    link: "#",
    children: [
      {
        id: "c2",
        icon: BiSolidUserDetail,
        title: "Centers by users",
        link: "/center_by_users",
      },
      {
        id: "c2",
        icon: BiSolidUserDetail,
        title: "Centers by Appointments",
        link: "/center_by_appointements",
      },
    ],
    isOpen: false,
    role: ["admin"],
  },
];
