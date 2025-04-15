"use client"

import Logo from "./Logo";
import ProfileButton from "./ProfileButton";
import NavbarTags from "./NavbarTags";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AboutIcon, CartIcon, ContactIcon, HomeIcon, MenuIcon } from "./Icons";

export default function Navbar() {
    const session = useSession();
    const user = session.data ? session.data.user : null;
    const router = useRouter()

    const isAdmin = user?.email==="admin@gmail.com" ? true : false

    return <div className="flex justify-between px-24 py-3 ">
        <Logo />
        <div className="flex gap-3 justify-center items-center">
            <Link href="/dashboard"><NavbarTags title="Home" icon={<HomeIcon/>} /></Link>
            <Link href="/about"><NavbarTags title="About" icon={<AboutIcon/>}/></Link>
            <Link href="/dashboard#menu-section"><NavbarTags title="Menu" icon={<MenuIcon/>} /></Link>
            <Link href="/contact"><NavbarTags title="Contact" icon={<ContactIcon/>} /></Link>
            <div onClick={() => {
                if (!user) {
                    toast.error("Please login to see cart.", {
                        autoClose: 1500,
                        theme: "colored"
                    })
                }
                else {
                    router.push("/cart")
                }
            }}><NavbarTags title="Cart" icon={<CartIcon/>} /></div>

            <div className="cursor-pointer py-1.5 px-4 border-2 text-sm text-green-500 border-green-500 hover:bg-green-500 flex justify-center items-center transition transform hover:text-white rounded-3xl"
             onClick={() => {
                if (!user) {
                    toast.error("Please login to book table.", {
                        autoClose: 1500,
                        theme: "colored"
                    })
                }
                else {
                    router.push("/book")
                }
            }}><h4>Book A Table</h4></div>

            
            {user && <ProfileButton isAdmin={isAdmin} letter={user.name ? user.name[0].toUpperCase() : user.username[0].toUpperCase()} />}
            {!user && <Link href="/signin"><LoginButton /></Link>}
        </div>
    </div>
}