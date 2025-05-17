import { string, object, date } from "zod";

export const schemaRentForm = object({
  name: string().min(2).max(32),
  email: string().max(32).email(),
  date: date().optional(),
  comment: string().optional(),
});
