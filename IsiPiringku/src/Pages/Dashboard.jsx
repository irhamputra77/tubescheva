import React, { useState } from 'react';
import DashboardLayouts from '../layouts/DashboardLayouts';
import MainDashboardSection from '../Components/MainDashboardSection';
import UserDataSection from '../Components/UserDataSection';
import FoodDataSection from '../Components/FoodDataSection';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <DashboardLayouts activeTab={activeTab} setActiveTab={setActiveTab}>
            {activeTab === 'dashboard' && <MainDashboardSection />}
            {activeTab === 'users' && <UserDataSection />}
            {activeTab === 'foods' && <FoodDataSection />}
        </DashboardLayouts>
    );
}
