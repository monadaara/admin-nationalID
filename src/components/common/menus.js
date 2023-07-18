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
];
