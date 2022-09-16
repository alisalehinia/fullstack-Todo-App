import Layout from "@/containers/Layout";
import { getSession, useSession } from "next-auth/react";

const ProtectedSSR = () => {
    const { data: session, status } = useSession();

    return (
        <Layout>
            <h1>protected page</h1>
        </Layout>
    );
}

export default ProtectedSSR;
export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin?callback=http://localhost:3000/Protected-ssr",
                permanent: false
            }
        }
    }
    return {
        props: {
            session
        }
    }
}