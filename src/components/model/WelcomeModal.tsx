import React from "react";

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[60] transition-opacity duration-300 ease-in-out animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-lg animate-fadeIn">
        <h2 className="text-xl font-bold mb-4">Welcome to SGD</h2>
        <p className="text-gray-700 mb-4">
          The Smart Grounding Dashboard (SGD) provides real-time insights into
          ground resistance monitoring using simulated sensor data.
        </p>
        <p className="text-gray-700 mb-4">
          The frontend is built with <strong>React (TypeScript)</strong>,{" "}
          <strong>D3.js</strong>, and <strong>Tailwind CSS</strong>. The backend
          uses <strong>FastAPI (Python)</strong> to simulate live sensor feeds
          and serve data via RESTful APIs.
        </p>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
