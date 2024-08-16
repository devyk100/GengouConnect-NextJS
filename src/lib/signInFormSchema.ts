
import {z} from "zod"

export const formSchema = z.object({
    email: z.string().email({
        message: "It must be a valid email Id"
    }),
    password: z.string().min(8).max(20)
})
