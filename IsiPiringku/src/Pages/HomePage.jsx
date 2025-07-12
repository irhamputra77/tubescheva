import React from "react";
import MainLayout from "../layouts/MainLayout";
import HeroSection from "../Sections/HeroSection";
import ArticleSection from "../Sections/ArticleSection";
import MockupSection from "../Sections/MockupSection";

const HomePage = () => {
	return (
		<MainLayout>
			<HeroSection />
			<ArticleSection />
			<MockupSection />
		</MainLayout>
	);
};

export default HomePage;
