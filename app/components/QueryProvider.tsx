"use client";

import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "../../lib/queryClient";

interface QueryProviderProps {
	children: ReactNode;
}

const QueryProvider = ({ children }: QueryProviderProps) => (
	<QueryClientProvider client={queryClient}>
		{children}
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
);

export default QueryProvider;
