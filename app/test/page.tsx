/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZdjFJtWqFzo
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function Component() {
	return (
		<Dialog defaultOpen>
			<DialogTrigger asChild>
				<Button variant="outline">Invite Members</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle className="text-center">Invite Members</DialogTitle>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					<Label htmlFor="email">Email</Label>
					<Input id="email" placeholder="Enter email addresses" />

					<Label htmlFor="invitation">Invitation</Label>
					<Textarea
						id="invitation"
						rows={3}
						placeholder="Customize your invitation message"
					/>

					<Label htmlFor="link">Link</Label>
					<div className="flex items-center">
						<Input
							id="link"
							value="https://example.com/invite"
							className="flex-1"
						/>
					</div>
				</div>

				<Separator className=" mt-4 mb-4" />

				<DialogFooter>
					<div className="flex flex-1 gap-2 justify-between">
						<Button variant="outline">Copy Link</Button>
						<Button variant="outline">Copy Invitation</Button>
						<Button>Send Email</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
