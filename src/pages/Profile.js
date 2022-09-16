import Layout from "@/containers/Layout";
import { signIn, useSession } from "next-auth/react";

const Profile = () => {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            signIn()
        }
    })
    if (status === "loading") {
        return <Layout>
            <div>
                loading ...
            </div>
        </Layout>
    }
    return (
        <Layout>
            <h1> welcome {session.user.name} to profile page</h1>
        </Layout>
    );
}

export default Profile;