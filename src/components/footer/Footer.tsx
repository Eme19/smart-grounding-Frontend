import React from "react";
import { ReactComponent as GithubIcon } from "../../assets/svg/github.svg"; // Imported GitHub SVG
import { ReactComponent as LinkedInIcon } from "../../assets/svg/linkedin.svg"; // Imported LinkedIn SVG

type FooterProps = {
  className?: string;
};

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();
  const version = "v1.2.3"; // bump as you release
  const lastUpdated = "May 11, 2025"; // can be update dynamically

  return (
    <footer
      className={`${className} bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 py-12`}
    >
      <div className="container mx-auto px-6 lg:px-0 grid grid-cols-1 md:grid-cols-4 gap-8 items-start text-left">
        {/* About */}
        <div id="about">
          <h4 className="text-lg font-semibold text-white mb-2">About</h4>
          <p className="text-sm text-gray-400">
            The Smart Grounding Dashboard (SGD) delivers real-time sensor
            insights for ground resistance monitoring. Built with React, D3.js,
            and Tailwind CSS.
          </p>
        </div>

        {/* Quick Links */}
        <div className=" items-start text-left">
          <h4 className="text-lg font-semibold text-white mb-2">Quick Links</h4>
          <ul className="flex flex-col space-y-1 text-sm">
            <li>
              <a href="/docs" className="hover:text-white transition-colors">
                API Docs
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className=" items-start text-left" id="contact">
          <h4 className="text-lg font-semibold text-white mb-2">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:support@example.com"
                className="hover:text-white transition-colors"
              >
                support@example.com
              </a>
            </li>
            <li className="flex space-x-4 mt-2">
              {/* GitHub Icon */}
              <a
                href="https://github.com/Eme19/smart-grounding-Frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors transform hover:scale-90 duration-200"
                aria-label="GitHub"
              >
                <GithubIcon className="w-5 h-5 fill-current" />
              </a>

              {/* LinkedIn Icon */}
              <a
                href="https://www.linkedin.com/in/emeka-ngwu-83b940291/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors transform hover:scale-90 duration-200"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-5 h-5 fill-current" />
              </a>
            </li>
          </ul>
        </div>

        {/* Version & Copyright */}
        <div className=" items-start text-left">
          <h4 className="text-lg font-semibold text-white mb-2">Info</h4>
          <ul className="text-sm space-y-1">
            <li>
              Version: <span className="font-mono">{version}</span>
            </li>
            <li>Last updated: {lastUpdated}</li>
            <li>&copy; {currentYear} Smart Grounding (SGD)</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
