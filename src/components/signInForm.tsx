"use client"

import { formSchema } from "@/lib/signInFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import googleLogo from "../../public/google.svg"
import githubLogo from "../../public/github.svg"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import Image from "next/image"
import { signIn } from "next-auth/react"
import { Separator } from "./ui/separator"
import { toast } from "sonner"
import {compareHash, hashPassword, test} from "../lib/password-hashing"

export function LogoComponent({ logo }: { logo: any }) {
    return (
        <Image src={logo} alt="google" className="w-[20px] h-[20px] pr-[3px]" />
    )
}

export function SignInForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    function OnSubmit(values: z.infer<typeof formSchema>) {
        console.log("The values were submitted dude", values)
        signIn("email", {email: values.email, password: values.password})
    }

    return (
        <>
            <Card className="w-fit px-4 py-4 flex flex-col items-center justify-center">
                <CardHeader>
                    <CardTitle>
                        Sign in to GengouConnect
                    </CardTitle>
                    <CardDescription>
                        Sign in via email, Google, or Github to continue
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(OnSubmit)} className="flex flex-col items-center">
                        <FormField control={form.control} name="email" render={({ field }) => (<>
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="johndoe@email.com" {...field} />
                                </FormControl>
                                <FormDescription>
                                    The email id used in your account
                                </FormDescription>
                            </FormItem>
                        </>)} />

                        <FormField control={form.control} name="password" render={({ field }) => (<>
                            <FormItem>  
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="password" {...field} />
                                </FormControl>
                                <FormDescription>
                                    The password of your account
                                </FormDescription>
                            </FormItem>
                        </>)} />


                        <Button type="submit" className="my-2">Sign in</Button>
                    </form>
                </Form>
                <Separator />
                <div className="flex flex-col mt-4 w-full">
                    <Button variant="outline"
                        onClick={() => {
                            signIn("google")
                        }} >
                        <LogoComponent logo={googleLogo} /> Sign in with Google
                    </Button>
                    <Button variant="outline"
                        onClick={() => {
                            signIn("github")
                        }}>
                        <LogoComponent logo={githubLogo} /> Sign in with Github
                    </Button>
                    <Button onClick={async () => {
                        console.log(await test())
                    }}>
                        Test Button
                    </Button>
                </div>
            </Card>
        </>
    )
}