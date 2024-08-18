"use client"

import { SignInForm, UserType } from "@/components/signInForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProviderTypes } from "@/app/api/auth/[...nextauth]/route"
import { getSession } from "next-auth/react"
import { useEffect } from "react"


export default function SignIn() {
    useEffect(() => {
        (async function() {
          const session = await getSession()
          console.log(session)
        })()
      })
    return (
        <>
            <div className="w-screen min-h-screen -mt-10 flex items-center justify-center bg-gradient-to-tr from-blue-700 to-green-800">
                <Tabs defaultValue="Learner" className="w-fit">
                    <TabsList className="w-full">
                        <TabsTrigger value="Learner" className="w-full">Learner</TabsTrigger>
                        <TabsTrigger value="Instructor" className="w-full">Instructor</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Learner">
                        <SignInForm githubProvider={ProviderTypes.GithubLearner} googleProvider={ProviderTypes.GoogleLearner} key={"learner"} userType={UserType.Learner} credentialsProvider={ProviderTypes.CredentialsLearner}/>
                    </TabsContent>
                    <TabsContent value="Instructor">
                        <SignInForm githubProvider={ProviderTypes.GithubInstructor} googleProvider={ProviderTypes.GoogleInstructor} key={"instructor"} userType={UserType.Instructor} credentialsProvider={ProviderTypes.CredentialsInstructor}/>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}