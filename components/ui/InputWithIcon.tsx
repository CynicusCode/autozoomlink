//### InputWithIcon.tsx
"use client";
import * as React from "react";
import { Input, type InputProps } from "./Input";

export interface InputWithIconProps extends InputProps {
	label: string;
	id: string;
	icon: React.ReactNode; // Icon is expected for this component
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
	({ label, id, className, icon, ...props }, ref) => {
		return (
			<div className="relative z-0 mb-2 flex items-center w-full">
				<div className="absolute ml-2 opacity-70">{icon}</div>
				<Input
					ref={ref}
					id={id}
					type="text"
					className={`pl-8 pr-4 pt-4 pb-4 w-full text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none dark:text-white dark:border-gray-800 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${className}`}
					placeholder=" "
					{...props}
				/>
				<label
					htmlFor={id}
					className="absolute left-8 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
				>
					{label}
				</label>
			</div>
		);
	},
);

InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
