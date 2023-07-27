import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCog,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { menu } from "../components/common/menus";
import fingerprint from "/fingerprint.png";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    setMenuItems(menu);
  }, []);

  const toggleSubMenu = (itemId) => {
    setMenuItems((prevMenuItems) =>
      prevMenuItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, isOpen: !item.isOpen };
        }
        return item;
      })
    );
  };

  const renderMenuItem = (menuItem, index) => {
    return (
      <li key={index} className="py-2 text-sm">
        <NavLink
          onClick={() => toggleSubMenu(menuItem.id)}
          className="flex items-center hover:text-bluelight"
          to={menuItem.link}
        >
          {<menuItem.icon className="text-white text-xs" />}
          <span className="ml-2">{menuItem.title}</span>
          {menuItem.children?.length > 0 && (
            <button className="ml-auto focus:outline-none">
              {menuItem.isOpen ? (
                <FiChevronRight className="rotate-90" />
              ) : (
                <FiChevronRight />
              )}
            </button>
          )}
        </NavLink>
        {menuItem.isOpen && menuItem.children?.length > 0 && (
          <ul className="pl-4">
            {menuItem.children?.map((child, index) =>
              renderMenuItem(child, index)
            )}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="navbar-container fixed top-0 left-0 h-screen w-[17%] bg-slate-700 text-white overflow-y-auto">
      <nav className="h-full pt-1 px-6">
        <div className="w-full flex justify-center items-center gap-x-4">
          <img className="w-14 " src={fingerprint} alt="" />
          <div>
            <p className="m-0 p-0">National ID</p>
            <p className="m-0 p-0">System</p>
          </div>
        </div>
        <ul className="mt-7">
          {/* Your menu items rendering code */}
          {menuItems.map((menuItem, index) => renderMenuItem(menuItem, index))}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
