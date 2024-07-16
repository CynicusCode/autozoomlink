//page.tsx
import AutoLinkGenerator from "./components/Link-Generator/AutoLinkGenerator";
import { Navbar } from "./components/shared/Navbar";
import React from "react";

const page = () => {
	return (
		<>
			<Navbar />
			<div className="flex justify-center items-center pt-32">
				<AutoLinkGenerator />
			</div>
		</>
	);
};

export default page;
