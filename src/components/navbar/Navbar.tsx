import React, { useState, useEffect, useRef } from "react";

const mockData = [
  "Real-Time Grounding Monitor",
  "Real-Time Resistance Monitor",
  "Grounding & Resistance Analytics",
  "Real-Time Earthing System",
  "Resistance Measurement Dashboard",
  "Live Grounding Status",
  "RT Grounding & Resistance Report",
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("#home");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
    } else {
      setSuggestions(
        mockData.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center space-x-3">
          {/* Icon */}
          <div className="text-black/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <g strokeLinecap="round" strokeLinejoin="round">
                <path d="m13 11l5-5m1 1l-2-2l2.5-1.5l1 1z" />
                <path d="M4.025 8.975a3.5 3.5 0 0 1-.79-3.74l1.422 1.422h2v-2L5.235 3.235a3.5 3.5 0 0 1 4.529 4.53l6.47 6.471a3.5 3.5 0 0 1 4.53 4.529l-1.421-1.422h-2v2l1.422 1.422a3.5 3.5 0 0 1-4.53-4.528L7.763 9.765a3.5 3.5 0 0 1-3.738-.79" />
                <path d="m12.203 14.5l-5.604 5.604a1.35 1.35 0 0 1-1.911 0l-.792-.792a1.35 1.35 0 0 1 0-1.911L9.5 11.797" />
              </g>
            </svg>
          </div>
          {/* Title */}
          <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-900 to-gray-900 bg-clip-text">
            SGD
          </h1>
        </div>

        <div ref={wrapperRef} className="relative w-1/2">
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM21 21l-4.35-4.35"
            />
          </svg>

          {showDropdown && suggestions.length > 0 && (
  <ul className="absolute top-full left-0 mt-2 w-full md:w-96 lg:w-1/2 bg-white border rounded-md shadow-lg max-h-58 overflow-y-auto z-50">
              {suggestions.map((item, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => {
                    setQuery(item);
                    setShowDropdown(false);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex space-x-8 text-gray-700">
          <li>
            <a
              href="#home"
              onClick={() => handleLinkClick("#home")}
              className={`hover:text-blue-600 transition-colors font-semibold  ${
                activeLink === "#home" ? " text-blue-600" : ""
              }`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={() => handleLinkClick("#about")}
              className={`hover:text-blue-600 transition-colors font-semibold ${
                activeLink === "#about" ? " text-blue-600" : ""
              }`}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={() => handleLinkClick("#contact")}
              className={`hover:text-blue-600 transition-colors font-semibold ${
                activeLink === "#contact" ? " text-blue-600" : ""
              }`}
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute md:hidden w-full bg-white shadow-inner  z-40">
          <ul className="flex flex-col ml-2 space-y-2 px-6 py-4 text-gray-700 text-lg">
            <li>
              <a
                href="#"
                onClick={() => handleLinkClick("#home")}
                className={`block hover:text-blue-600 transition-colors font-semibold ${
                  activeLink === "#home" ? " text-blue-600" : ""
                }`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={() => handleLinkClick("#about")}
                className={`block hover:text-blue-600 transition-colors font-semibold ${
                  activeLink === "#about" ? " text-blue-600" : ""
                }`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={() => handleLinkClick("#contact")}
                className={`block hover:text-blue-600 transition-colors font-semibold ${
                  activeLink === "#contact" ? " text-blue-600" : ""
                }`}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
