import React from "react";
import "./index.css";
import HomePage from "./Pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import ArticlePage from "./Pages/ArticlePage"; 

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			 <Route path="/artikel" element={<ArticlePage />} />
			<Route path="/dashboard" element={<Dashboard />} />
		</Routes>
	);
}
