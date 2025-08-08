// UserForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000").replace(/\/+$/, "") + "/";

export default function UserForm({ initialData = {}, onSubmit, onCancel }) {
    const isAdd = !initialData?.id;

    const [nama, setNama] = useState(initialData.nama || initialData.fullname || "");
    const [gender, setGender] = useState(initialData.gender || "");
    const [email, setEmail] = useState(initialData.email || "");
    const [tanggal, setTanggal] = useState(initialData.tanggal || initialData.birthDate || "");
    const [roleId, setRoleId] = useState(initialData.RoleId || "");
    const [roles, setRoles] = useState([]);

    const [password, setPassword] = useState("");

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(BASE_URL + "v1/role", {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });
                setRoles(res.data.data || []);
            } catch (error) {
                console.error("Gagal fetch role:", error);
            }
        };
        fetchRoles();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            nama,
            gender,
            email,
            tanggal,
            RoleId: roleId,
            ...(isAdd && password ? { password } : {}),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="font-semibold">Nama Lengkap</label>
                <input type="text" className="block w-full border rounded px-3 py-2 mt-1"
                    value={nama} onChange={(e) => setNama(e.target.value)} required />
            </div>

            <div className="mb-3">
                <label className="font-semibold">Tanggal Lahir</label>
                <input type="date" className="block w-full border rounded px-3 py-2 mt-1"
                    value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />
            </div>

            <div className="mb-3">
                <label className="font-semibold">Gender</label>
                <select className="block w-full border rounded px-3 py-2 mt-1"
                    value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="">Pilih Gender</option>
                    <option value="m">Laki-laki</option>
                    <option value="f">Perempuan</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="font-semibold">Email</label>
                <input type="email" className="block w-full border rounded px-3 py-2 mt-1"
                    value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="mb-3">
                <label className="font-semibold">Role</label>
                <select className="block w-full border rounded px-3 py-2 mt-1"
                    value={roleId} onChange={(e) => setRoleId(e.target.value)} required>
                    <option value="">Pilih Role</option>
                    {roles.map((role) => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                </select>
            </div>

            {isAdd && (
                <div className="mb-3">
                    <label className="font-semibold">Password</label>
                    <input
                        type="password"
                        className="block w-full border rounded px-3 py-2 mt-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={isAdd}
                        placeholder="Minimal sesuai policy backend"
                    />
                </div>
            )}

            <div className="flex gap-3 justify-end mt-4">
                <button type="button" onClick={onCancel}
                    className="px-5 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600 transition">
                    Cancel
                </button>
                <button type="submit"
                    className="px-5 py-2 bg-green-700 text-white rounded font-semibold hover:bg-green-800 transition">
                    {isAdd ? "Add" : "Update"}
                </button>
            </div>
        </form>
    );
}
