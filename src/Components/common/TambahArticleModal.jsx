import React, { useState } from "react";

export default function TambahArtikelModal({ isOpen, onClose, onUpload }) {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [status, setStatus] = useState("PENDING");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpload({ judul, deskripsi, status });
    setJudul("");
    setDeskripsi("");
    setStatus("PENDING");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-[450px] max-w-full">
        <h2 className="text-lg font-bold mb-4 text-center">Tambah Artikel</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Judul Artikel</label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Deskripsi</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              rows={5}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none ${
                status === "POST"
                  ? "bg-green-100 text-green-800"
                  : status === "PENDING"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <option value="POST">POST</option>
              <option value="PENDING">PENDING</option>
              <option value="CANCEL">CANCEL</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
