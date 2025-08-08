import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function TabNavDashboard() {
    const location = useLocation();
    const navigate = useNavigate();

    let activeTab = "users";
    const path = location.pathname;

    if (path.startsWith("/dashboard/users")) activeTab = "users";
    else if (path.startsWith("/dashboard/child")) activeTab = "child";
    else if (path.startsWith("/dashboard/artikel")) activeTab = "artikel";
    else if (path.startsWith("/dashboard/foods")) activeTab = "foods";
    else if (path.startsWith("/dashboard/role")) activeTab = "role";
    else if (path.startsWith("/dashboard/kategori")) activeTab = "kategori";

    return (
        <div className="flex justify-center mt-2 h-12">
            <div className="flex rounded-full border border-[#4CAF50] bg-green-50 overflow-hidden">
                <button
                    className={`flex items-center text-2xl px-7 py-3 transition-all rounded-full duration-200 focus:outline-none ${activeTab === 'users' ? 'bg-[#C8E6C9] text-[#39833C]' : 'bg-green-50 text-[#39833C]'}`}
                    onClick={() => navigate('/dashboard/users')}
                >
                    <Icon icon="bi:people-fill" width="32" height="32" className="mr-2" color="#204225" />
                    Data Pengguna
                </button>
                <button
                    className={`flex items-center text-2xl px-7 py-3 transition-all rounded-full duration-200 focus:outline-none ${activeTab === 'child' ? 'bg-[#C8E6C9] text-[#39833C]' : 'bg-green-50 text-[#39833C]'}`}
                    onClick={() => navigate('/dashboard/child')}
                >
                    <Icon icon="mdi:list-box" width="32" height="32" className="mr-2" color="#204225" />
                    Data Anak
                </button>
                <button
                    className={`flex items-center text-2xl px-7 py-3 transition-all rounded-full duration-200 focus:outline-none ${activeTab === 'artikel' ? 'bg-[#C8E6C9] text-[#39833C]' : 'bg-green-50 text-[#39833C]'}`}
                    onClick={() => navigate('/dashboard/artikel')}
                >
                    <Icon icon="mdi:list-box" width="32" height="32" className="mr-2" color="#204225" />
                    Artikel
                </button>
                <button
                    className={`flex items-center text-2xl px-7 py-3 transition-all rounded-full duration-200 focus:outline-none ${activeTab === 'foods' ? 'bg-[#C8E6C9] text-[#39833C]' : 'bg-green-50 text-[#39833C]'}`}
                    onClick={() => navigate('/dashboard/foods')}
                >
                    <Icon icon="mdi:apple" width="32" height="32" className="mr-2" color="#204225" />
                    Data Makanan
                </button>
                <button
                    className={`flex items-center text-2xl px-7 py-3 transition-all rounded-full duration-200 focus:outline-none ${activeTab === 'role' ? 'bg-[#C8E6C9] text-[#39833C]' : 'bg-green-50 text-[#39833C]'}`}
                    onClick={() => navigate('/dashboard/role')}
                >
                    <Icon icon="mdi:emoticon-happy" width="32" height="32" className="mr-2" color="#204225" />
                    Role
                </button>
                <button
                    className={`flex items-center text-2xl px-7 py-3 transition-all rounded-full duration-200 focus:outline-none ${activeTab === 'kategori' ? 'bg-[#C8E6C9] text-[#39833C]' : 'bg-green-50 text-[#39833C]'}`}
                    onClick={() => navigate('/dashboard/kategori')}
                >
                    <Icon icon="mdi:list-box" width="32" height="32" className="mr-2" color="#204225" />
                    Kategori
                </button>
            </div>
        </div>
    );
}
