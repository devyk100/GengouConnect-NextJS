import prisma from "@/db"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { compareHash } from "../../../../lib/password-hashing"


export const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? ""
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID??"",
            clientSecret: process.env.GOOGLE_SECRET??""
        }),
        CredentialsProvider({
            name: 'Sign in using email and password',
            credentials: {
              email: { label: "email", type: "email", placeholder: "johndoe@email.com" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                
              // You need to provide your own logic here that takes the credentials
              // submitted and returns either a object representing a user or value
              // that is false/null if the credentials are invalid.
              // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
              // You can also use the `req` object to obtain additional parameters
              // (i.e., the request IP address)
            try{
                const userData  = await prisma.user.findUnique({
                    where: {
                        email_id: credentials?.email,
                    }
                })

                const isPasswordValid = await compareHash(userData?.password!, credentials?.password!)
                if(!isPasswordValid){
                    return null;
                }
              // If no error and we have user data, return it
              if (userData) {
                const user: any = {
                    email: userData.email_id,
                    name: userData.name,
                    id: userData.user_id,
                    image: userData.profile_picture,
                } 
                return user 
              }
              // Return null if user data could not be retrieved
    
            } catch (error ){
                console.log(error, "\n")
                return null
            }
        }
        })
    ],
    pages: {
        signIn: '/auth/signIn',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
      },
      callbacks: {
        async signIn({account, user, credentials, email, profile}){
            console.log(account, user, credentials, email, 'IS FOR THE USER');
            return true
        }
      }
    
})

export {handler as GET, handler as POST}