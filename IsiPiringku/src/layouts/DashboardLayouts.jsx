import NavbarDashboard from '../Components/Dashboard/NavbarDashboard';
import TabNavDashboard from "../Components/Dashboard/TabNavDashboard";

export default function DashboardLayouts({ children, activeTab, setActiveTab }) {
    return (
        <div className="min-h-screen w-full px-16 font-sans bg-[#F5F5F5]">
            <NavbarDashboard />
            <TabNavDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
            <main>
                {children}
            </main>
        </div >
    );
}
