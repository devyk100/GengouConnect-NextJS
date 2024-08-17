
import { z } from "zod"
import validator from "validator"
const alphaNumericSchema = z.custom<string>((val) => {
    return typeof val === "string" ? /^[a-z0-9]+$/i.test(val) : false;
});
type alphaNumericSchema = z.infer<typeof alphaNumericSchema>;

export const formSchema = z.object({
    email: z.string().email({
        message: "It must be a valid email Id"
    }),
    password: z.string().min(8).max(20),
    name: z.string().min(4).max(100),
    userId: z.string().min(4).refine(validator.isAlphanumeric),
    phone:  z.string().refine(validator.isMobilePhone)
})
