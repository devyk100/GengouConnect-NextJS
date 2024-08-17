import prisma from "@/db"
import NextAuth, { RequestInternal } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { compareHash, hashPassword } from "../../../../lib/password-hashing"

export enum ProviderTypes {
    GithubInstructor = "github-instructor",
    GithubLearner = "github-learner",
    GoogleLearner = "google-learner",
    GoogleInstructor = "google-instructor",
    CredentialsLearner = "credentials-learner",
    CredentialsInstructor = "credentials-instructor"
}

async function authorize(credentials: Record<"email" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) {
    try {
        const userData = await prisma.user.findUnique({
            where: {
                email_id: credentials?.email,
            }
        })
        const isPasswordValid = await compareHash(credentials?.password!, userData?.password! )
        if (!isPasswordValid) {
            throw Error("Wrong password invocation")
        }
        if (userData) {
            const user: any = {
                email: userData.email_id,
                name: userData.name,
                id: userData.user_id,
                image: userData.profile_picture,
            }
            return user
        }

    } catch (error) {
        console.log(error, "\nFAILED LOGIN")
        return null
    }
}


export const handler = NextAuth({
    providers: [
        GithubProvider({
            id: ProviderTypes.GithubInstructor,
            clientId: process.env.GITHUB_INSTRUCTOR_ID ?? "",
            clientSecret: process.env.GITHUB_INSTRUCTOR_SECRET ?? "",
            name: ProviderTypes.GithubInstructor
        }),
        GithubProvider({
            id: ProviderTypes.GithubLearner,
            clientId: process.env.GITHUB_LEARNER_ID ?? "",
            clientSecret: process.env.GITHUB_LEARNER_SECRET ?? "",
            name: ProviderTypes.GithubLearner
        }),
        GoogleProvider({
            id: ProviderTypes.GoogleInstructor,
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
            name: ProviderTypes.GoogleInstructor
        }),
        GoogleProvider({
            id: ProviderTypes.GoogleLearner,
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
            name: ProviderTypes.GoogleLearner
        }),
        CredentialsProvider({
            type: "credentials",
            id: ProviderTypes.CredentialsInstructor,
            name: ProviderTypes.CredentialsInstructor,
            credentials: {
                email: { label: "email", type: "email", placeholder: "johndoe@email.com" },
                password: { label: "Password", type: "password" }
            }, authorize
        }),
        CredentialsProvider({
            type: "credentials",
            id: ProviderTypes.CredentialsLearner,
            name: ProviderTypes.CredentialsLearner,
            credentials: {
                email: { label: "email", type: "email", placeholder: "johndoe@email.com" },
                password: { label: "Password", type: "password" }
            }, authorize
        })
    ],
    pages: {
        signIn: '/auth/signIn',
        // signOut: '/auth/signout',
        error: '/auth/signIn', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/newUser' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {
        async signIn({ account, user, credentials, email, profile }) {
            console.log(account?.provider, user, credentials, email, 'IS FOR THE USER');
            try {
                const userData = await prisma.user.findUniqueOrThrow({
                    where: {
                        email_id: user.email!
                    }
                })
                return true;
            } catch (error){
                return false;
            }
            return true
        }
    }
})

export { handler as GET, handler as POST }