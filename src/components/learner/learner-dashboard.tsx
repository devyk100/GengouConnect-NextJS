import { Session } from "next-auth"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import Link from "next/link"



export default function LearnerDashboard({ session }: {
    session: Session | null
}) {
    return (
        <>
            <section className="w-screen flex flex-col gap-2 items-center justify-center">
                <div className="mt-5 px-4">
                    <div className="w-full text-3xl font-extrabold px-2 mt-2">
                        Welcome {session?.user?.name?.split(" ")[0]! + " " + session?.user?.name?.split(" ")[1]} 👋,
                    </div>
                    <div className="w-full text-3xl font-semibold mt-3 px-2">
                        what would you like to do now?
                    </div>
                </div>
                <section className="flex flex-wrap w-1/2 gap-2 mt-10">
                    <Card className="md:w-[45%] lg:w-[30%] h-auto">
                        <Link href={"/courses-all"}>
                            <CardHeader className="text-2xl">
                                <CardTitle>Courses</CardTitle>
                                <CardDescription className="text-lg">See available courses you can enroll into.</CardDescription>
                            </CardHeader>
                        </Link>
                        <CardContent className="relative">
                            <Dialog>
                                <DialogTrigger><span className="p-2 dark:bg-lime-800 bg-cyan-500 rounded-md">Learn more</span></DialogTrigger>
                                <DialogContent className={"p-10"}>
                                    <DialogHeader>
                                        <DialogTitle className={"text-2xl"}>About enrolling in courses</DialogTitle>
                                        <DialogDescription>
                                            <ul className="list-disc ml-4 text-lg">
                                                <li>Buy paid or try out free courses.</li>
                                                <li>Interact with professional instructors for the language.</li>
                                                <li>Ask doubts and get them resolved in a live class</li>
                                                <li>Materials, flashcard, assignments provided by the instructors</li>
                                            </ul>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>


                        </CardContent>
                    </Card>
                    <Card className="md:w-[45%] lg:w-[30%]">
                        <Link href={"/courses"}>
                            <CardHeader className="text-2xl">
                                <CardTitle>My Courses</CardTitle>
                                <CardDescription className="text-lg">Go to your enrolled courses</CardDescription>
                            </CardHeader>
                        </Link>
                        <CardContent>
                            <div>Continue your ongoing courses or revisit the completed ones.</div>
                        </CardContent>
                    </Card>
                    <Card className="md:w-[45%] lg:w-[30%]">
                        <Link href={"/flashcard"}>
                            <CardHeader className="text-2xl">
                                <CardTitle>Flashcards</CardTitle>
                                <CardDescription className="text-lg">Review or make flashcards</CardDescription>
                            </CardHeader>
                        </Link>
                        <CardContent>
                            <div>A much superior method for remembering things the fun way</div>
                        </CardContent>
                    </Card>
                    <Card className="md:w-[45%] lg:w-[30%]">
                        <CardHeader className="text-2xl">
                            <CardTitle>Assignments</CardTitle>
                            <CardDescription className="text-lg">Assignments related to courses</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>Continue with the assignments given by your instructors</div>
                        </CardContent>
                    </Card>
                    <Card className="md:w-[45%] lg:w-[30%]">
                        <Link href={"/lessons"}>
                            <CardHeader className="text-2xl">
                                <CardTitle>Lessons</CardTitle>
                                <CardDescription className="text-lg">Lesson material for your courses</CardDescription>
                            </CardHeader>
                        </Link>
                        <CardContent>
                            <div>Continue with the lessons</div>
                        </CardContent>
                    </Card>
                    <Card className="md:w-[45%] lg:w-[30%]">
                        <Link href={"/live-class"}>
                            <CardHeader className="text-2xl">
                                <CardTitle>Live classes</CardTitle>
                                <CardDescription className="text-lg">See recordings or upcoming live classes</CardDescription>
                            </CardHeader>
                        </Link>
                        <CardContent>
                            <div>Revise or continue your journey with the course</div>
                        </CardContent>
                        {/* <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
                    </Card>
                </section>
            </section>
        </>
    )
}