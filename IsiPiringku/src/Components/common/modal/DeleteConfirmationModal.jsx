import React from "react";

export default function DeleteConfirmationModal({
    show,
    onClose,
    onDelete,
    loading = false,
    title = "Apakah Anda yakin?",
    message = "Data ini akan hilang dan tidak bisa dikembalikan."
}) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl p-6 w-full max-w-xs shadow-lg">
                <div className="mb-2 text-lg font-bold">{title}</div>
                <div className="mb-4 text-gray-700 text-sm">{message}</div>
                <div className="flex gap-2 justify-end">
                    <button
                        className="px-4 py-2 rounded font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 rounded font-semibold bg-red-500 hover:bg-red-600 text-white"
                        onClick={onDelete}
                        disabled={loading}
                    >
                        {loading ? "Menghapus..." : "Hapus"}
                    </button>
                </div>
            </div>
        </div>
    );
}
