import React from "react";
import "./index.css";
import { Routes, Route, Navigate} from "react-router-dom";

// Pages
import HomePage from "./Pages/HomePage";
import ArticlePage from "./Pages/ArticlePage";
import LoginPage from "./Pages/LoginPage";

// Dashboard Layout & Sections
import DashboardLayouts from "./layouts/DashboardLayouts";
import UserDataSection from "./Components/Dashboard/UserDataSection";
import ArtikelSection from "./Components/Dashboard/ArtikelSection";
import DataAnakSection from "./Components/Dashboard/DataAnakSection";
import FoodDataSection from "./Components/Dashboard/FoodDataSection";
import RoleDataSection from "./Components/Dashboard/RoleDataSection";
import KategoriDataSection from "./Components/Dashboard/KategoriDataSection";
import UserDetailsDashboard from "./layouts/DetailUserLayouts";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/artikel/:id" element={<ArticlePage />} />

			<Route path="/dashboard" element={<DashboardLayouts />}>
				<Route index element={<Navigate to="users" replace />} />
				<Route path="users" element={<UserDataSection />} />
				<Route path="foods" element={<FoodDataSection />} />
				<Route path="role" element={<RoleDataSection />} />
				   <Route path="kategori" element={<KategoriDataSection />} />
			</Route>

			<Route path="/userDetails" element={<UserDetailsDashboard />}>
				<Route index element={<DataAnakSection />} />
				<Route path="artikel" element={<ArtikelSection />} />
			</Route>
		</Routes>
	);
}
