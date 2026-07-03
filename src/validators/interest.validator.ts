import { z } from "zod";

export const expressInterestSchema = z.object({
  startupId: z.number().int().positive(),
});