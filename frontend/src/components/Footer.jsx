// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-center p-6 mt-12 text-gray-500 text-sm">
      <p>
        © {currentYear} Film Finder | Created by Ash M with the help of Google Gemini.
      </p>
    </footer>
  );
};

export default Footer;