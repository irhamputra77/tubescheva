import NavbarDashboard from '../Components/Dashboard/NavbarDashboard';
import TabNavDashboard from "../Components/Dashboard/TabNavDashboard";
import { Outlet } from "react-router-dom";

export default function DashboardLayouts() {
    return (
        <div className="min-h-screen w-full px-16 bg-[#F5F5F5]">
            <NavbarDashboard />
            <TabNavDashboard />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
