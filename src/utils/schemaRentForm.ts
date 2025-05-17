import { string, object } from "zod";

export const schemaRentForm = object({
  name: string().min(2).max(32),
  email: string().max(32).email(),
  date: string().optional(),
  comment: string().optional(),
});
