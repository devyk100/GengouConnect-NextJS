"use client"

import { ProviderTypes } from "@/app/api/auth/[...nextauth]/route"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignUpForm, UserType } from "@/components/signUpForm"

export default function SignUp() {
    return (
        <>
            <div className="w-screen min-h-screen mt-1 pt-2 flex items-center justify-center bg-gradient-to-tr from-blue-700 to-green-800">
                <Tabs defaultValue="Learner" className="w-fit">
                    <TabsList className="w-full">
                        <TabsTrigger value="Learner" className="w-full">Learner</TabsTrigger>
                        <TabsTrigger value="Instructor" className="w-full">Instructor</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Learner">
                        <SignUpForm githubProvider={ProviderTypes.GithubLearner} googleProvider={ProviderTypes.GoogleLearner} key={"learner"} userType={UserType.Learner} credentialsProvider={ProviderTypes.CredentialsLearner} />
                    </TabsContent>
                    <TabsContent value="Instructor">
                        <SignUpForm githubProvider={ProviderTypes.GithubInstructor} googleProvider={ProviderTypes.GoogleInstructor} key={"instructor"} userType={UserType.Instructor} credentialsProvider={ProviderTypes.CredentialsInstructor} />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}