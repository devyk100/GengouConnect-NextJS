import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function Page(){
const user = await getServerSession(authOptions)
//@ts-ignore
const userType = user?.user?.userType;
    return (
        <>
        {userType == "Learner"? <>Learner here</>: <>Instructor here</>}
        </>
    )
}