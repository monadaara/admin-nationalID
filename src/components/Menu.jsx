import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCog,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { menu } from "../components/common/menus";

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

  const renderMenuItem = (menuItem) => {
    return (
      <li key={menuItem.id} className="py-2">
        <NavLink
          onClick={() => toggleSubMenu(menuItem.id)}
          className="flex items-center hover:text-bluelight"
          to={menuItem.link}
        >
          {<menuItem.icon className="text-white" />}
          <span className="ml-2">{menuItem.title}</span>
          {menuItem.children?.length > 0 && (
            <button className="ml-auto focus:outline-none">
              {menuItem.isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          )}
        </NavLink>
        {menuItem.isOpen && menuItem.children?.length > 0 && (
          <ul className="pl-4">
            {menuItem.children?.map((child) => renderMenuItem(child))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className=" bg-slate-700 text-white h-screen w-64 py-4 px-6">
      <ul>{menuItems.map((menuItem) => renderMenuItem(menuItem))}</ul>
    </div>
  );
};

export default Menu;
