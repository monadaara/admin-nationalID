import {
  FaHome,
  FaUser,
  FaCog,
  FaChevronDown,
  FaChevronUp,
  FaLayerGroup,
} from "react-icons/fa";
import { BsFingerprint } from "react-icons/bs";

export const menu = [
  {
    id: 1,
    icon: FaHome,
    title: "Dashboard",
    link: "/",
    children: [],
    isOpen: false,
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
  },
  {
    id: 3,
    icon: FaHome,
    title: "Applicants",
    link: "/applicants",
    children: [],
    isOpen: false,
  },
  {
    id: 34,
    icon: FaHome,
    title: "ID's",
    link: "#",
    children: [
      {
        id: "c1",
        icon: FaHome,
        title: "Unapproved IDs",
        link: "/unapproved_ids",
      },
      {
        id: "c2",
        icon: BsFingerprint,
        title: "Upproved IDs",
        link: "/upproved_ids",
      },
    ],
    isOpen: false,
  },
  {
    id: 3,
    icon: FaHome,
    title: "Users",
    link: "/users",
    children: [],
    isOpen: false,
  },
  {
    id: 3,
    icon: FaHome,
    title: "Reports",
    link: "#",
    children: [],
    isOpen: false,
  },
  {
    id: 3,
    icon: FaHome,
    title: "Setting",
    link: "/setting",
    children: [],
    isOpen: false,
  },
];
