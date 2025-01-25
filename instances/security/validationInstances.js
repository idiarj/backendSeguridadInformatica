import { Validation } from "../../utils/validation";
import { userSchema } from "./schemas/userSchema";

export const userValidation = new Validation(userSchema);