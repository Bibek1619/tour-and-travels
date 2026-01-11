import React from "react";

const AuthModal = ({ open, onClose, children, title }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center pt-[300px] backdrop-blur-[3px] "
      onClick={onClose}
    >
      <div
        className="bg-[#ffff] rounded-2xl shadow-2xl w-full max-w-md p-6 relative  max-h-[90vh] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        {/* Title */}
        {/* <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">{title}</h2> */}

        {/* Children (Login / SignUp forms) */}
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default AuthModal;