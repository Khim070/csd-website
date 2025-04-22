import React, { useState, useRef, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import PageSearch from "./PageSearch";
// import LanguageSwitcherButton from "./home/LanguageSwitcherButton";
// import logo from "../assets/img/rupp.png";
import { FaBars, FaTimes } from "react-icons/fa";
// import { useTranslation } from "react-i18next";
import PageNavbar from "./PageNavbar";

const PageHeader = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const searchContainerRef = useRef(null);
    const mobileMenuRef = useRef(null);
    // const { t, i18n } = useTranslation();
    const location = useLocation();
    // const currentLanguage = i18n.language;

    // Menu configuration
    const menuItems = {
        academics: [
        ["/admissions", "admission"],
        ["/facilities", "facilities"],
        ["/faculty", "faculty"],
        ["/research", "Research"],
        ["/scholars", "Scholarships"],
        ],
        programs: [
        ["/programs/bachelor", "bachelor"],
        ["/programs/master", "master"],
        ["/programs/doctoral", "doctoral"],
        ["/programs/diploma", "diploma"],
        ],
    };

    const toggleMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
        setActiveDropdown(null); // Reset dropdown when toggling mobile menu
    };

    const toggleDropdown = (menu) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };


    const globalData = [
        { name: "Dr. Heng Sovannrith", position: "Assistant Professor" },
        { name: "Asst. Prof. Dr. Chor Chandara", position: "Assistant Professor" },
    ];

    // Close the search bar if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
            setIsSearchOpen(false);
        }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (
            searchContainerRef.current &&
            !searchContainerRef.current.contains(event.target)
        ) {
            setIsSearchOpen(false);
        }
        if (
            mobileMenuRef.current &&
            !mobileMenuRef.current.contains(event.target) &&
            !event.target.closest('.dropdown-toggle')
        ) {
            setIsMobileMenuOpen(false);
            setActiveDropdown(null);
        }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Dropdown component
    const DropdownMenu = ({ menu, items, isMobile = false }) => (
        <div className={`relative ${isMobile ? "w-full" : ""}`}>
        <button
            className={`dropdown-toggle flex items-center uppercase w-full justify-between ${isMobile ? "py-2" : ""}`}
            onClick={() => toggleDropdown(menu)}
        >
            {t(`menu.${menu}`)}
            <FiChevronDown
            className={`ml-2 transition-transform ${activeDropdown === menu ? "rotate-180" : ""}`}
            />
        </button>

        {activeDropdown === menu && (
            <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`${
                isMobile
                ? "relative pl-4 space-y-2 mt-2"
                : "absolute left-0 mt-2 bg-white shadow-md rounded-md py-2 w-52 z-50"
            }`}
            >
            {items.map(([path, text]) => (
                <Link
                key={path}
                to={path}
                className={`block px-4 py-2 hover:text-red-900 ${
                    location.pathname === path ? "text-red-900 font-bold" : ""
                }`}
                onClick={() => {
                    setActiveDropdown(null);
                    if (isMobile) setIsMobileMenuOpen(false);
                }}
                >
                {t(`menu.${text}`)}
                </Link>
            ))}
            </motion.div>
        )}
        </div>
    );

    return (
        <div className="relative bg-white shadow-md">
        {/* Search Bar */}
        {isSearchOpen && (
            <div className="absolute top-0 left-0 w-full bg-red-800 py-4 z-50">
            <div className="max-w-8xl mx-auto px-4 p-4" ref={searchContainerRef}>
                <PageSearch onToggle={() => setIsSearchOpen(!isSearchOpen)} />
            </div>
            </div>
        )}

        {/* Main Header */}
        <div className={`p-4 ${isSearchOpen ? "pt-34" : ""}`}>
            <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-2">
                {/* Logo */}
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                >
                <Link to="/" className="flex items-center space-x-2">
                    <img
                        // src={logo}
                        alt="logo" className="w-14 h-14" />
                    <motion.h2
                    // className={`xl:text-lg font-normal text-sm uppercase hidden sm:block ${
                    //     currentLanguage === "km" ? "font-khmer" : "font-bold"
                    // }`}
                    className={`xl:text-lg font-normal text-sm uppercase hidden sm:block

                    `}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    >
                    {/* {t("Partnerships.Faculty of Science")} <br />
                    {t("Department.Department of Computer Science")} */}
                    {"Faculty of Science"} <br />
                    {"Department of Computer Science"}
                    </motion.h2>
                </Link>
                </motion.div>

            {/* Desktop Navigation and Actions */}
            <div className="flex items-center space-x-4">
            <div className="">
                <div className="hidden xl:block">
                    <PageNavbar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
                </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                {!isSearchOpen && (
                    <motion.button
                    onClick={() => setIsSearchOpen(true)}
                    className="text-gray-600 hover:text-red-800 p-1.5 rounded-full"
                    >
                    <IoMdSearch className="text-3xl" />
                    </motion.button>
                )}
                {/* <LanguageSwitcherButton /> */}
                <button
                    onClick={toggleMenu}
                    className="xl:hidden text-gray-600 hover:text-red-800 p-2"
                >
                    {isMobileMenuOpen ? <FaTimes className="text-3xl" /> : <FaBars className="text-3xl" />}
                </button>
                </div>
            </div>
            </div>
            </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div
            ref={mobileMenuRef}
            className="xl:hidden uppercase fixed top-0 left-0 w-full h-full bg-white shadow-md z-40 overflow-y-auto"
            >
            <div className="p-6 relative">

                {/* Logo */}
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                >
                <Link to="/" className="flex items-center space-x-2">
                    <img src={logo} alt="logo" className="w-14 h-14" />
                    <motion.h2
                    className={`xl:text-lg font-normal text-sm uppercase  ${
                        currentLanguage === "km" ? "font-khmer" : "font-bold"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    >
                    {t("Partnerships.Faculty of Science")} <br />
                    {t("Department.Department of Computer Science")}
                    </motion.h2>
                </Link>
                </motion.div>
                <button
                onClick={toggleMenu}
                className="absolute right-6 top-2 text-gray-600 hover:text-red-800"
                >
                <FaTimes className="text-3xl" />
                </button>

                <div className="flex flex-col space-y-4 mt-10">
                <Link
                    to="/"
                    className="text-gray-600 hover:text-red-900 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {t("menu.home")}
                </Link>
                <DropdownMenu menu="Academics" items={menuItems.academics} isMobile />
                <DropdownMenu menu="programs" items={menuItems.programs} isMobile />
                <Link
                    to="/news&events"
                    className="text-gray-600 hover:text-red-900 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {t("menu.newsEvents")}
                </Link>
                <Link
                    to="/about"
                    className="text-gray-600 hover:text-red-900 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {t("menu.about")}
                </Link>
                <Link
                    to="/contact"
                    className="text-gray-600 hover:text-red-900 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {t("menu.contact")}
                </Link>

                </div>
            </div>
            </div>
        )}
        </div>
    );
    };

export default PageHeader