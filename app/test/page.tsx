"use client";
import { useState } from "react";

interface LocationProps {
	addrEntered: string;
}

export default function LocationPage() {
	const [location, setLocation] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchLocation = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(`/api/jobs/10001`);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			setLocation(data.actualLocation.addrEntered);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<button onClick={fetchLocation} disabled={isLoading}>
				{isLoading ? "Loading..." : "Get Location"}
			</button>
			{location && <div>Location: {location}</div>}
			{error && <div>Error: {error}</div>}
		</div>
	);
}
