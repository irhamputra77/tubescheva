import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import logo from "../../assets/Logo Tulisan Bawah 1.png";
import TabNavDashboard from "./TabNavDashboard";

function getFromStorage(key) {
    return localStorage.getItem(key) ?? sessionStorage.getItem(key);
}

export default function NavbarDashboard() {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState("User");

    useEffect(() => {
        const storedName = getFromStorage("fullname");
        if (storedName) {
            setFullname(storedName);
        }
    }, []);

    const handleLogout = () => {
        ["token", "fullname", "uid", "user", "token_expires_at"].forEach((k) => {
            localStorage.removeItem(k);
            sessionStorage.removeItem(k);
        });
        navigate("/login");
    };

    return (
        <nav className="flex items-center justify-between gap-3 px-4 py-3">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <img src={logo} alt="Isi Piringku" />
            </div>

            {/* Tabs */}
            <div className="flex-1 px-4">
                <TabNavDashboard />
            </div>

            {/* Nama User + Logout */}
            <div className="flex items-center gap-3">
                <span className="text-green-900 font-medium">{fullname}</span>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
                    <Icon icon="mdi:logout" className="text-lg" />
                    Logout
                </button>
            </div>
        </nav>
    );
}
