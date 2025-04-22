import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { IoMdSearch } from "react-icons/io";

const PageSearch = ({ onToggle, data }) => {
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef(null);

    const toggleSearch = () => {
        onToggle(); // Toggle search state in Header component
        if (!inputRef.current) return;
        if (!inputRef.current.value) {
        setQuery(""); // Clear input when closing
        }
        setTimeout(() => inputRef.current?.focus(), 10); // Focus the input when opened
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setQuery(""); // Clear the search input
        }
        };

        const handleEscape = (e) => {
        if (e.key === "Escape") {
            setQuery(""); // Clear the search input
        }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const [filteredData, setFilteredData] = useState([]);

    // Update filtered data when searchTerm changes
    useEffect(() => {
        if (!data || !Array.isArray(data)) {
        setFilteredData([]); // Ensure filteredData is always an array
        return;
        }

        const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchTerm, data]);

    return (
        <div className="relative flex flex-col justify-center items-center w-full" ref={containerRef}>
        <motion.div
            className="relative flex items-center w-full min-w-[300px] max-w-6xl"
            layout
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {/* Input Field */}
            <motion.div className="relative flex items-center w-full">
            <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-lg border bg-white border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-800"
            />
            <div className="text-2xl absolute right-6 text-gray-500">
                <IoMdSearch />
            </div>
            </motion.div>
        </motion.div>

        {/* Search Results (Same width as input field) */}
        {query && (
            <div className="absolute top-14 w-full min-w-[300px] max-w-6xl bg-gray-50 border border-gray-300 rounded-lg shadow-md max-h-60 overflow-y-auto z-50">
            <div className="w-full">
                {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                    <div
                    key={index}
                    className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                    >
                    {item.name}
                    </div>
                ))
                ) : (
                <div className="px-4 py-2 text-gray-500">No results found</div>
                )}
            </div>
            </div>
        )}
        </div>
    );
    };

export default PageSearch