import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import LearnerDashboard from "@/components/learner/learner-dashboard";

export default async function Page(){
const user = await getServerSession(authOptions)
console.log(user)
//@ts-ignore
const userType = user?.user?.userType;
    return (
        <>
        {userType == "Learner"? <><LearnerDashboard session={user}/></>: <>Instructor here</>}
        </>
    )
}