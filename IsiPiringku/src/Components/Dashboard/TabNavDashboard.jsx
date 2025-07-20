import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function TabNavDashboard() {
    const location = useLocation();
    const navigate = useNavigate();

    let activeTab = "dashboard";
    const path = location.pathname;

    if (path === "/dashboard") activeTab = "dashboard";
    // Semua path berikut dianggap tab 'users' (pengguna)
    else if (
        path.startsWith("/dashboard/users") ||
        path.startsWith("/dashboard/artikel") ||
        path.startsWith("/dashboard/anak")
    ) {
        activeTab = "users";
    }
    else if (path.startsWith("/dashboard/foods")) activeTab = "foods";

    return (
        <div className="flex mt-2 h-12">
            <div className="flex rounded-full border border-[#4CAF50] bg-green-50 overflow-hidden">
                <button
                    className={`flex items-center text-2xl px-7 py-3 rounded-full transition-all duration-200 focus:outline-none ${activeTab === 'dashboard' ? 'bg-[#C8E6C9] text-[#39833C]' : 'bg-green-50 text-[#39833C]'}`}
                    onClick={() => navigate('/dashboard')}
                >
                    <Icon icon="bi:bar-chart-fill" width="32" height="32" className="mr-2" color="#204225" />
                    Dashboard
                </button>
                <button
                    className={`flex items-center text-2xl px-7 py-3 transition-all rounded-full duration-200 focus:outline-none ${activeTab === 'users' ? 'bg-[#C8E6C9] text-[#39833C]' : 'bg-green-50 text-[#39833C]'}`}
                    onClick={() => navigate('/dashboard/users')}
                >
                    <Icon icon="bi:people-fill" width="32" height="32" className="mr-2" color="#204225" />
                    Data Pengguna
                </button>
                <button
                    className={`flex items-center text-2xl px-7 py-3 transition-all rounded-full duration-200 focus:outline-none ${activeTab === 'foods' ? 'bg-[#C8E6C9] text-[#39833C]' : 'bg-green-50 text-[#39833C]'}`}
                    onClick={() => navigate('/dashboard/foods')}
                >
                    <Icon icon="mdi:apple" width="32" height="32" className="mr-2" color="#204225" />
                    Data Makanan
                </button>
            </div>
        </div>
    );
}
