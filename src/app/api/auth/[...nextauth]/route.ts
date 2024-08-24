import prisma from "@/db"
import NextAuth, { NextAuthOptions, RequestInternal } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { compareHash, hashPassword } from "../../../../lib/password-hashing"
import { randomUUID } from "crypto"
import jwt, { sign } from "jsonwebtoken"
export enum ProviderTypes {
    GithubInstructor = "github-instructor",
    GithubLearner = "github-learner",
    GoogleLearner = "google-learner",
    GoogleInstructor = "google-instructor",
    CredentialsLearner = "credentials-learner",
    CredentialsInstructor = "credentials-instructor"
}

async function authorize(credentials: Record<"email" | "password" | "providerType", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) {
    try {
        console.log("authorise working ")
        const userType = (
            (credentials?.providerType == ProviderTypes.GithubInstructor || credentials?.providerType == ProviderTypes.GoogleInstructor || credentials?.providerType == ProviderTypes.CredentialsInstructor) ? "Instructor" : "Learner"
        )
        const userData = await prisma.user.findFirstOrThrow({
            where: {
                email_id: credentials?.email,
                register_method: "Email",
                user_type: userType
            }
        })
        const isPasswordValid = await compareHash(credentials?.password!, userData?.password!)
        if (!isPasswordValid) {
            throw Error("Wrong password invocation")
        }
        if (userData) {
            const user: any = {
                email: userData.email_id,
                name: userData.name,
                id: userData.user_id,
                image: userData.profile_picture,
                userId: userData.user_id,
                userType: userData.user_type
            }
            console.log("Authorise finished")
            return user
        }
    } catch (error) {
        console.log(error, "\nFAILED LOGIN")
        return null
    }
}

export const authOptions:NextAuthOptions = {
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
            name: ProviderTypes.GithubLearner,
            
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
                password: { label: "Password", type: "password" },
                providerType: {label: "providerType", type: "text"}
            }, authorize
        }),
        CredentialsProvider({
            type: "credentials",
            id: ProviderTypes.CredentialsLearner,
            name: ProviderTypes.CredentialsLearner,
            credentials: {
                email: { label: "email", type: "email", placeholder: "johndoe@email.com" },
                password: { label: "Password", type: "password" },
                providerType: {label: "providerType", type: "text"}
            }, authorize
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/auth/signIn',
        // signOut: '/auth/signout',
        error: '/auth/signIn', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/newUser' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {
        async signIn({ account, user, credentials, email, profile }) {
            // console.log(account?.provider, user, credentials, email, 'IS FOR THE USER');
            const userType = (
                (account?.provider == ProviderTypes.GithubInstructor || account?.provider == ProviderTypes.GoogleInstructor || account?.provider == ProviderTypes.CredentialsInstructor) ? "Instructor" : "Learner"
            )
            const registerMethod = (account?.provider == ProviderTypes.GithubInstructor || account?.provider == ProviderTypes.GithubLearner) ? "Github" : "Google";
            try {
                const userData = await prisma.user.findFirstOrThrow({
                    where: {
                        email_id: user.email!,
                        user_type: userType,
                        register_method: registerMethod
                    }
                })
                return true;
            } catch (error) {
                const userData = await prisma.user.create({
                    data: {
                        email_id: user.email!,
                        is_verified: false,
                        name: user.name!,
                        password: "",
                        is_password_set: false,
                        is_phone_set: false,
                        is_user_id_set: false,
                        phone: "",
                        profile_picture: user.image!,
                        register_method: registerMethod,
                        user_id: randomUUID(),
                        user_type: userType,
                    }
                })
                return true;
            }
        },
        async jwt(params) {
            // console.log(params)
            // console.log(params.account?.providerAccountId, params.profile, params.session, params.user, params.token)
            if (params.account && (params.account.provider == ProviderTypes.CredentialsInstructor || params.account.provider == ProviderTypes.CredentialsLearner) && params.user?.id) {
                // @ts-ignore
                params.token.userId = params.user?.userId
                //@ts-ignore
                params.token.userType = params.user?.userType
                //@ts-ignore
                const token = sign({userId:params.user?.userId}, process.env.GLOBAL_AUTH_SECRET as string)
                params.token.backendToken = token;
            } else if (params.account) {
                const userType = (params.account.provider == ProviderTypes.GithubInstructor || params.account.provider == ProviderTypes.GoogleInstructor) ? "Instructor" : "Learner";
                const registerMethod = (params.account.provider == ProviderTypes.GithubInstructor || params.account.provider == ProviderTypes.GithubLearner) ? "Github" : "Google";
                const userData = await prisma.user.findFirstOrThrow({
                    where: {
                        email_id: params.user.email!,
                        user_type: userType,
                        register_method: registerMethod
                    }
                })
                const token = sign({userId:userData.user_id}, process.env.GLOBAL_AUTH_SECRET as string)
                params.token.userId = userData.user_id;
                params.token.userType = userType;
                params.token.backendToken = token;
            }
            return params.token
        },
        async session(params) {
            // @ts-ignore
            params.session.user!.userId = params.token.userId;
            //@ts-ignore
            params.session.user!.userType = params.token.userType
            //@ts-ignore
            params.session.user!.backendToken = params.token.backendToken;
            return params.session
        },
    }
}
export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }