import React from "react";
import "./index.css";
import MainDashboardSection from './Components/Dashboard/MainDashboardSection';
import HomePage from "./Pages/HomePage";
import { Routes, Route } from "react-router-dom";
import DashboardLayouts from './layouts/DashboardLayouts';
import ArticlePage from "./Pages/ArticlePage";
import UserDataSection from "./Components/Dashboard/UserDataSection";
import ArtikelSection from "./Components/Dashboard/ArtikelSection";
import DataAnakSection from "./Components/Dashboard/DataAnakSection";
import FoodDataSection from './Components/Dashboard/FoodDataSection';

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/artikel/:id" element={<ArticlePage />} />
			<Route path="/dashboard" element={<DashboardLayouts />}>
				<Route index element={<MainDashboardSection />} />
				<Route path="users" element={<UserDataSection />} />
				<Route path="foods" element={<FoodDataSection />} />
				<Route path="artikel" element={<ArtikelSection />} />
				<Route path="anak" element={<DataAnakSection />} />
			</Route>
		</Routes>
	);
}