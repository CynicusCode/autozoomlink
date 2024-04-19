"use client";
import React, { useState, useEffect } from "react";

const TestLocationComponent = () => {
	const [testLocation, setTestLocation] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/api/jobs/10001");
				const appointmentDetails = await response.json();
				setTestLocation(appointmentDetails.actualLocation.addrEntered);
			} catch (error) {
				console.error("Error fetching appointment details:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<h1>Test Location: {testLocation}</h1>
		</div>
	);
};

export default TestLocationComponent;
