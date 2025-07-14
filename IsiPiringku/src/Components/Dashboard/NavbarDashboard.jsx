import logo from '../../assets/Logo Tulisan Bawah 1.png';
import { Icon } from "@iconify/react";
export default function NavbarDashboard() {
    return (
        <nav className="flex items-center justify-between px-1 pt-3">
            <div className="flex items-center space-x-3">
                <img src={logo} alt="Isi Piringku" />
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
            <div className="flex items-center space-x-6 gap-3">
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
    );
}