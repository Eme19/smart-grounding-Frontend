import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("#home");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

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

        {/* Desktop links */}
        <ul className="hidden md:flex space-x-8 text-gray-700 ">
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
        <div className="md:hidden bg-white shadow-inner">
          <ul className="flex flex-col space-y-2 px-6 py-4 text-gray-700 text-lg">
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
