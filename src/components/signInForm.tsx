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
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Sign in to GengouConnect
                    </CardTitle>
                    <CardDescription>
                        Sign in via email, Google, or Github to continue
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-8">
                        <FormField control={form.control} name="email" render={({ field }) => (<>
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="something dude" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your email that will be used for the account
                                </FormDescription>
                            </FormItem>
                        </>)}>
                        </FormField>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
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
            </Card>
        </>
    )
}