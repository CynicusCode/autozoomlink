"use client";
import type React from "react";
import { Label } from "../ui/label";
import { useFormContext } from "react-hook-form";

const VideoLinkField: React.FC = () => {
	const { watch } = useFormContext();
	const videoLinkField = watch("videoLinkField");
	if (videoLinkField === undefined) {
		return null;
	}
	return (
		<div>
			<Label>3rd Party Video Link: {videoLinkField}</Label>
		</div>
	);
};

export default VideoLinkField;
