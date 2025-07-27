import React from "react";

export default function DeleteConfirmationModal({ isOpen, onCancel, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-[320px]">
                <h2 className="text-xl font-bold mb-2">Apakah Anda yakin?</h2>
                <p className="text-gray-600 mb-4">Data ini akan hilang dan tidak bisa dikembalikan.</p>
                <div className="flex justify-end gap-3">
                    <button
                        className="bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md"
                        onClick={onCancel}
                    >
                        Batal
                    </button>
                    <button
                        className="bg-[#A83A3A] text-white font-semibold px-4 py-2 rounded-md"
                        onClick={onConfirm}
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}
