import { LinkGenerator } from "@/components/Link-Generator/LinkGenerator";
import { Navbar } from "@/components/shared/Navbar";
import React from "react";

const page = () => {
	return (
		<>
			<Navbar />
			<div className="flex justify-center items-center pt-40">
				<LinkGenerator />
			</div>
		</>
	);
};

export default page;
