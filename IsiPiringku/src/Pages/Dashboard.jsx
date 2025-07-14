import React, { useState } from 'react';
import DashboardLayouts from '../layouts/DashboardLayouts';
import MainDashboardSection from '../Components/Dashboard/MainDashboardSection';
import UserDataSection from '../Components/Dashboard/UserDataSection';
import FoodDataSection from '../Components/Dashboard/FoodDataSection';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className='bg-[#F5F5F5] '>
            <DashboardLayouts activeTab={activeTab} setActiveTab={setActiveTab}>
                {activeTab === 'dashboard' && <MainDashboardSection />}
                {activeTab === 'users' && <UserDataSection />}
                {activeTab === 'foods' && <FoodDataSection />}
            </DashboardLayouts>
        </div>
    );
}
