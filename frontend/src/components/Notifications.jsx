// src/components/Notification.jsx
import React from "react";

const Notification = ({ message, show }) => {
  return (
    <div
      className={`fixed top-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-lg transition-all duration-500
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}
        bg-green-500 text-white font-semibold z-[200]`}
    >
      {message}
    </div>
  );
};

export default Notification;