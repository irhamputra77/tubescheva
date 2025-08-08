import React from "react";

export default function BaseModal({ show, title, children, onClose }) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
                {children}
            </div>
        </div>
    );
}
