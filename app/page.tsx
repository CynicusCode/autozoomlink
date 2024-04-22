//page.tsx
import AutoLinkGenerator from "@/components/Link-Generator/AutoLinkGenerator";
import { LinkGenerator } from "@/components/Link-Generator/LinkGenerator"; // Note: This import doesn't seem to be used in this file.
import { Navbar } from "@/components/shared/Navbar";
import React from "react";

const page = () => {
	return (
		<>
			<Navbar />
			<div className="flex justify-center items-center pt-40">
				<AutoLinkGenerator />
			</div>
		</>
	);
};

export default page;
