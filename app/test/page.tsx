import type { GetServerSideProps, NextPage } from "next";
import type { LanguageDetails } from "@/types/JobDetails";

interface LanguagePageProps {
	language: string | null;
}

const LanguagePage: NextPage<LanguagePageProps> = ({ language }) => {
	if (!language) {
		return <div>No language details found for this job.</div>;
	}

	return <div>The job language is: {language}</div>;
};

export const getServerSideProps: GetServerSideProps<LanguagePageProps> = async (
	context,
) => {
	const jobNumber = "10001"; // Fixed job number for this example

	try {
		const response = await fetch(`http://localhost:3000/api/${jobNumber}`);
		if (response.ok) {
			const data = await response.json();
			const language = data.defaultLanguage?.displayName || "Default Language";

			return {
				props: {
					language,
				},
			};
		}
		console.error("Error fetching language details:", response.statusText);
		return { props: { language: null } };
	} catch (error) {
		console.error("Error fetching language details:", error);
		return { props: { language: null } };
	}
};

export default LanguagePage;
