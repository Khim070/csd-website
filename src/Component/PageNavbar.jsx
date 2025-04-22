import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { API_ENDPOINTS } from "../Service/APIconfig";
// import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import axios from "axios";

const PageNavbar = () => {
    const [dropdown, setDropdown] = useState(null);
    const [menus, setMenus] = useState([]);
    // const { t } = useTranslation();
    const location = useLocation();

    // Refs for dropdowns
    const aboutDropdownRef = useRef(null);
    const programDropdownRef = useRef(null);
    const campusLifeDropdownRef = useRef(null);
    const academicsResearchDropdownRef = useRef(null);

    // Close dropdown if the user clicks outside
    useEffect(() => {
        const handleClickOutside = (event) => {
        const dropdowns = [
            aboutDropdownRef,
            programDropdownRef,
            campusLifeDropdownRef,
            academicsResearchDropdownRef,
        ];
        const isOutside = dropdowns.every(
            (ref) => !ref.current?.contains(event.target)
        );
        if (isOutside) setDropdown(null);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        axios.get(API_ENDPOINTS.getMenu)
          .then((res) => {
            const data = res.data?.data || [];
            const selectedLang = 1; // 1 for english, 2 for khmer
            const filteredMenus = data
              .filter(menu => menu.lang === selectedLang)
              .filter(display => display.display === 1)
              .sort((a, b) => b.menu_order - a.menu_order); // desc
            setMenus(filteredMenus);
          })
          .catch((err) => {
            console.error("Error fetching menu data:", err);
          });
    }, []);

    // Toggle dropdown visibility
    const toggleDropdown = (menu) => setDropdown(dropdown === menu ? null : menu);

    // Desktop dropdown menu structure
    const desktopDropdown = (menu, ref, items) => (
        <div
        ref={ref}
        className="relative hidden lg:block"
        onMouseEnter={() => setDropdown(menu)}
        onMouseLeave={() => setDropdown(null)}
        >
        <button className="flex items-center uppercase">
            {/* {t(`menu.${menu}`)} <FiChevronDown className="inline ml-2" /> */}
            {`${menu}`} <FiChevronDown className="inline ml-2" />
        </button>
        {dropdown === menu && (
            <motion.div
            className="absolute left-0 mt-0 bg-white shadow-md rounded-md py-2 w-52 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            >
            {items.map(([path, text]) => (
                <Link
                key={path}
                to={path}
                className={`block px-4 py-2 hover:text-red-900 ${location.pathname === path ? "text-red-900 font-bold" : ""
                    }`}
                onClick={() => setDropdown(null)}
                >
                {/* {t(`menu.${text}`)} */}
                {`${text}`}
                </Link>
            ))}
            </motion.div>
        )}
        </div>
    );

    return (
        <nav className="container mx-auto relative xl:flex xl:space-x-6 text-sm 2xl:text-base">
          <div className={`lg:flex space-x-6 uppercase`}>
            {menus
              .filter(menu => menu.menup_id === null)
              .map((menu) => {
                const isActive = location.pathname === `/${menu.title.toLowerCase()}`;
                const hasChildren = menu.children && menu.children.length > 0;
                return (
                  <div
                    key={menu.menu_id}
                    className="relative hidden lg:block"
                    onMouseEnter={() => setDropdown(menu.title)}
                    onMouseLeave={() => setDropdown(null)}
                  >
                    <button
                      className={`flex items-center uppercase hover:text-red-900 ${
                        isActive ? "text-red-900 font-bold" : ""
                      }`}
                    >
                      {menu.title}
                      {hasChildren && <FiChevronDown className="inline ml-2" />}
                    </button>
                    {hasChildren && dropdown === menu.title && (
                      <motion.div
                        className="absolute left-0 mt-0 bg-white shadow-md rounded-md py-2 w-52 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {menu.children.map(child => (
                          <Link
                            key={child.menu_id}
                            to={`/${child.title.toLowerCase()}`}
                            className={`block px-4 py-2 hover:text-red-900 ${
                              location.pathname === `/${child.title.toLowerCase()}`
                                ? "text-red-900 font-bold"
                                : ""
                            }`}
                            onClick={() => setDropdown(null)}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}
          </div>
        </nav>
    );
};

export default PageNavbar