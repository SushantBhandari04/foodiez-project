import Link from "next/link";

export default function Logo() {
    return <Link href="/dashboard" style={{ fontFamily: "Montez" }} className="text-36 flex gap-2 justify-center items-center">
        <img  src="/logo.png" alt="" className="h-7" />
        <h1 className="text-4xl font-medium tracking-tighter">Foodiez</h1>
    </Link>
}