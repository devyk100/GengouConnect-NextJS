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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { signIn } from "next-auth/react"
import { Separator } from "./ui/separator"
import { toast } from "sonner"
import { compareHash, hashPassword, test } from "../lib/password-hashing"
import { useEffect } from "react"
import { ProviderTypes } from "@/app/api/auth/[...nextauth]/route"

export function LogoComponent({ logo }: { logo: any }) {
    return (
        <Image src={logo} alt="google" className="w-[20px] h-[20px] pr-[3px]" />
    )
}


export enum UserType {
    Instructor,
    Learner
}

export function SignInForm({ googleProvider, githubProvider, userType, credentialsProvider }:
    {
        googleProvider: ProviderTypes,
        githubProvider: ProviderTypes,
        userType: UserType,
        credentialsProvider: ProviderTypes
    }
) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    function OnSubmit(values: z.infer<typeof formSchema>) {
        console.log("The values were submitted dude", values)
        signIn(credentialsProvider, { email: values.email, password: values.password })
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            const queryParameters = new URLSearchParams(window.location.search)
            const error = queryParameters.get("error")
            if (error == "AccessDenied") {
                toast("You must register with it first", {
                    description: "Proceed to sign up with the same account by choosing a username", action: {
                        label: "Okay",
                        onClick: () => {
                            // const errorParams = new URLSearchParams(window.location.search)
                            queryParameters.delete("error")
                            const newURL = `${window.location.pathname}?${queryParameters.toString()}`;
                            window.history.pushState(null, '', newURL);
                        }
                    }, duration: 30000,
                    important: true,
                    
                })
                console.log("AccessDesign")
            } else if (error == "CredentialsSignin") {
                toast("Wrong password or email", {
                    description: "Enter correct email and password ", action: {
                        label: "Okay",
                        onClick: () => {
                            queryParameters.delete("error")
                            const newURL = `${window.location.pathname}?${queryParameters.toString()}`;
                            window.history.pushState(null, '', newURL);
                        }
                    }, duration: 30000,
                    important: true
                })
            }
        })
        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <>


            <Card className="w-fit px-4 py-4 flex flex-col items-center justify-center">
                <CardHeader>
                    <CardTitle>
                        Sign in to GengouConnect {" "}
                        {userType == UserType.Instructor ? 
                        <span className="bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 text-transparent font-semibold">Instructor</span> : 
                        <span className="bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-transparent font-semibold">Learner</span>}
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
                    <Button variant="outline" key={googleProvider}
                        onClick={() => {
                            signIn(googleProvider)
                        }} >
                        <LogoComponent logo={googleLogo} /> Sign in with Google
                    </Button>
                    <Button variant="outline"key={githubProvider}
                        onClick={() => {
                            signIn(githubProvider)
                        }}>
                        <LogoComponent logo={githubLogo} /> Sign in with Github
                    </Button>
                </div>
            </Card>
        </>
    )
}