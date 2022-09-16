import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
    const { data: session, status } = useSession();
    return (
        <div className="shadow-lg flex justify-around font-bold  items-center px-4 py-4 rounded-lg flex-1 text-slate-900 sticky inset-0">
            <nav className='w-1/2'>
                TODO APP
            </nav>
            <ul className={`flex justify-around items-center flex-1 ${status === "loading" && !session ? "opacity-0" : "opacity-100"}`}>
                <li>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/Profile">
                        <a>profile</a>
                    </Link>
                </li>
                <li>
                    <Link href="/Protected-ssr">
                        <a>protected-ssr</a>
                    </Link>
                </li>
                {!session && status !== "loading" && (
                    <li>
                        <button onClick={() => signIn("github")}>Sign in</button>
                    </li>
                )}
                {session && <li>
                    <button onClick={() => signOut()}>Sign out</button>
                </li>}
            </ul>
        </div>
    );
}

export default Header;