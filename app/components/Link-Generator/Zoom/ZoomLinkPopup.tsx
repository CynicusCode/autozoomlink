import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface ZoomLinkPopupProps {
	isOpen: boolean;
	onClose: () => void;
	zoomDetails: {
		title: string;
		time: string;
		joinLink: string;
		meetingId: string;
		passcode: string;
		requestorEmail: string;
	};
}

interface FormData {
	email: string;
}

const ZoomLinkPopup: React.FC<ZoomLinkPopupProps> = React.memo(
	({ isOpen, onClose, zoomDetails }) => {
		const { register, handleSubmit } = useForm<FormData>();

		const onCopyLink = React.useCallback(() => {
			navigator.clipboard.writeText(zoomDetails.joinLink);
		}, [zoomDetails.joinLink]);

		const onCopyInvitation = React.useCallback(() => {
			const invitationText = `
				Demo is inviting you to a scheduled Zoom meeting.

				Topic: ${zoomDetails.title}
				Time: ${zoomDetails.time}
				Join Zoom Meeting: ${zoomDetails.joinLink}
				Meeting ID: ${zoomDetails.meetingId}
				Passcode: ${zoomDetails.passcode}

				Thank you for choosing demo, please note that if the interpreter has not joined the session within 3 minutes of the start time, please call us at 5008-8888 so we can provide immediate assistance.

				If you have a question, that can be answered within the next 3 hours, please reply to this email.
			`;
			navigator.clipboard.writeText(invitationText);
		}, [zoomDetails]);

		const onSendEmail: SubmitHandler<FormData> = React.useCallback((data) => {
			// Placeholder for email logic
		}, []);

		return (
			<Dialog
				open={isOpen}
				onOpenChange={(open) => {
					if (!open) onClose();
				}}
			>
				<DialogContent className="sm:max-w-[600px]">
					<DialogHeader>
						<DialogTitle className="text-center">Invite Members</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit(onSendEmail)}>
						<div className="grid gap-4 py-4">
							<div>
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									placeholder="Enter email addresses"
									defaultValue={zoomDetails.requestorEmail}
									{...register("email")}
								/>
							</div>

							<div>
								<Label htmlFor="invitation">Invitation</Label>
								<Textarea
									id="invitation"
									rows={10}
									style={{ height: "200px" }}
									defaultValue={`
Demo is inviting you to a scheduled Zoom meeting.

Topic: ${zoomDetails.title}
Time: ${zoomDetails.time}
Join Zoom Meeting: ${zoomDetails.joinLink}
Meeting ID: ${zoomDetails.meetingId}
Passcode: ${zoomDetails.passcode}

Thank you for choosing demo, please note that if the interpreter has not joined the session within 3 minutes of the start time, please call us at 5008-8888 so we can provide immediate assistance.

If you have a question, that can be answered within the next 3 hours, please reply to this email.
                  `}
									readOnly
								/>
							</div>

							<div>
								<Label htmlFor="link">Link</Label>
								<div className="flex items-center">
									<Input
										id="link"
										value={zoomDetails.joinLink}
										className="flex-1"
										readOnly
									/>
								</div>
							</div>
						</div>

						<Separator className="mt-4 mb-4" />

						<DialogFooter>
							<div className="flex flex-1 gap-2 justify-between">
								<Button type="button" variant="outline" onClick={onCopyLink}>
									Copy Link
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={onCopyInvitation}
								>
									Copy Invitation
								</Button>
								<Button type="submit">Send Email</Button>
							</div>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		);
	},
);

ZoomLinkPopup.displayName = "ZoomLinkPopup";

export default ZoomLinkPopup;
