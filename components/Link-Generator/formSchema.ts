// formSchema.ts
import * as z from "zod";

export const schema = z.object({
	jobNumber: z.string(),
	manualTitle: z.string().optional(),
});

export type FormValues = z.infer<typeof schema>;
