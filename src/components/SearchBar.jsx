import React from "react";

const SearchBar = ({ query, setQuery, suggestions, setShowDropdown, showDropdown }) => {
  return (
    <div className="relative w-full mx-4 md:w-1/2">
      <input
        type="text"
        value={query}
        placeholder="Search Real-Time Grounding & Resistance Monitor..."
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        className="w-full border rounded-full bg-gray-100 px-4 py-2 pr-10 outline-none"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 cursor-pointer"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        onClick={() => {}}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM21 21l-4.35-4.35" />
      </svg>

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute mt-2 w-full  bg-white border rounded-md shadow-lg max-h-58 overflow-y-auto z-50">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex justify-between items-center"
              onClick={() => {
                setQuery(item);
                setShowDropdown(false);
              }}
            >
              <span>{item}</span>
              <i className="fa-solid fa-chevron-right text-gray-400"></i>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
