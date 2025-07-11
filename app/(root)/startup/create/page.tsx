import StartupForm from "@/components/StartupForm"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

const page = () => {
    const session = auth()
    if(!session) redirect("/")
    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <h1 className="heading">Submit the Startup</h1>
            </section>
            <StartupForm />
        </>
    )
}

export default page