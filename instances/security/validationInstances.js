import { Validation } from "../../utils/validation.js";
import { userSchema } from "./schemas/userSchema.js";

export const userValidation = new Validation(userSchema);