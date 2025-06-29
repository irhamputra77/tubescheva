import logo from '../assets/Logo Tulisan Bawah 1.png';
import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import MainDashboardSection from '../Components/FoodDataSection';
import UserDataSection from '../Components/MainDashboardSection';
import FoodDataSection from '../Components/UserDataSection';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    return (
        <>
            <div className="min-h-screen font-sans " style={{ backgroundColor: "#EDF7EE" }}>
                <nav className="flex items-center justify-between px-8 py-4" >
                    <div className="flex items-center space-x-3">
                        <img
                            src={logo}
                            alt="Isi Piringku"
                            className=""
                        />
                    </div>
                    <div className="flex-1 mx-10">
                        <div className="flex items-center bg-[#C8E6C9] rounded-2xl px-4">
                            <Icon icon="ic:round-search" width="32" height="32" color="#9bd4a0" className="mr-2" />
                            <input
                                type="text"
                                placeholder="Search Anything..."
                                className="w-full bg-transparent py-3 px-2 text-green-700 placeholder:text-[#9bd4a0] focus:outline-none text-2xl italic"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-8">
                        <button>
                            <Icon icon="iconoir:bell-notification-solid" width="40" height="40" color="#204225" />
                        </button>
                        <button>
                            <Icon icon="mdi:cog" width="40" height="40" color="#204225" />
                        </button>
                        <div className="flex items-center space-x-2">
                            <Icon icon="mdi:account-circle" width="40" height="40" color="#204225" />
                            <span className="text-green-900">User</span>
                        </div>
                    </div>
                </nav>

                <div className="flex pl-10 mt-2 h-12">
                    <div className="flex rounded-full border border-[#4CAF50] bg-green-50 overflow-hidden">
                        <button
                            className={`flex items-center text-2xl px-7 py-3 rounded-full transition-all duration-200 focus:outline-none ${activeTab === 'dashboard' ? 'bg-[#C8E6C9] text-[#39833C]' : 'bg-green-50 text-[#39833C]'}`}
                            onClick={() => setActiveTab('dashboard')}
                        >
                            <Icon icon="bi:bar-chart-fill" width="32" height="32" className="mr-2" color="#204225" />
                            Dashboard
                        </button>
                        <button
                            className={`flex items-center text-2xl px-7 py-3 transition-all rounded-full duration-200 focus:outline-none ${activeTab === 'users' ? 'bg-[#C8E6C9] text-[#39833C]' : 'bg-green-50 text-[#39833C]'}`}
                            onClick={() => setActiveTab('users')}
                        >
                            <Icon icon="bi:people-fill" width="32" height="32" className="mr-2" color="#204225" />
                            Data Pengguna
                        </button>
                        <button
                            className={`flex items-center text-2xl px-7 py-3 transition-all rounded-full duration-200 focus:outline-none ${activeTab === 'foods' ? 'bg-[#C8E6C9] text-[#39833C]' : 'bg-green-50 text-[#39833C]'}`}
                            onClick={() => setActiveTab('foods')}
                        >
                            <Icon icon="mdi:apple" width="32" height="32" className="mr-2" color="#204225" />
                            Data Makanan
                        </button>
                    </div>
                </div>
                {activeTab === 'dashboard' && <MainDashboardSection />}
                {activeTab === 'users' && <UserDataSection />}
                {activeTab === 'foods' && <FoodDataSection />}
            </div>
        </>
    );
}