import React, { useRef } from "react";
import { FaX } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

const CustomSearchInput = ({
  searchIcon,
  placeholder = "Search placeholder",
  filterValue,
  setFilterValue,
  onSearchChange,
  onClear,
  height = "h-10",
  classNames = "",
  clearButtonColor ="",
}) => {
  const inputRef = useRef(null);

  const handleClear = () => {
    setFilterValue("");
    if (onClear) onClear();
  };

  return (
    <div className={`relative ${height} ${classNames}`}>
      <input
        ref={inputRef}
        type="text"
        value={filterValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded-lg bg-glassl dark:bg-glassd text-gray-800 dark:text-white border-orange-700 dark:border-orange-400 border focus:outline-none ${height} ${classNames} focus:ring-0 focus:border focus:border-orange-700 dark:focus:border-orange-400`}
      /> 
      {searchIcon || (
        <IoSearch className={`absolute right-3 top-1/2 transform -translate-y-1/2 dark:text-glassl text-glassd  ${clearButtonColor}`} />
      )}
      {filterValue && (
        <button
          type="button"
          onClick={handleClear}
          className={`absolute right-10 top-1/2 transform -translate-y-1/2 p-1 flex justify-center items-center rounded-full bg-red-600 dark:bg-red-600 ${clearButtonColor}`}
        >
         <FaX className={`text-[8px] text-white ${clearButtonColor}`} />
        </button>
      )}
    </div>
  );
};

export default CustomSearchInput;