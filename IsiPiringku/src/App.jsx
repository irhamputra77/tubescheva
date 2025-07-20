import { Routes, Route } from "react-router-dom";
import UserDataSection from "../Components/Dashboard/UserDataSection";
import DataAnakSection from "../Components/Dashboard/DataAnakSection";
import ArtikelSection from "../Components/Dashboard/ArtikelSection";

export default function Dashboard() {
	return (
		<div className="p-4">
			{/* Tambahkan layout dashboard di sini (jika ada navbar/sidebar) */}
			<Routes>
				<Route path="/" element={<UserDataSection />} />
				<Route path="data-anak" element={<DataAnakSection />} />
				<Route path="data-artikel" element={<ArtikelSection />} />
			</Routes>
		</div>
	);
}
