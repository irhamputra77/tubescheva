// RoleForm.jsx
import React, { useState, useEffect } from "react";

export default function RoleForm({ initialData = {}, onSubmit, onCancel, submitLabel = "Add", loading, error }) {
    const [nama, setNama] = useState("");

    useEffect(() => {
        setNama(initialData?.name || initialData?.nama || "");
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name: nama });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="font-semibold">Nama Role</label>
                <input
                    type="text"
                    className="block w-full border rounded px-3 py-2 mt-1"
                    value={nama}
                    onChange={e => setNama(e.target.value)}
                    required
                />
            </div>
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <div className="flex gap-3 justify-end mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600 transition"
                    disabled={loading}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-5 py-2 bg-green-700 text-white rounded font-semibold hover:bg-green-800 transition"
                    disabled={loading}
                >
                    {loading ? "Saving..." : submitLabel}
                </button>
            </div>
        </form>
    );
}
