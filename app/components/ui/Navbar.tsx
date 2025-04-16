"use client"

import Logo from "./Logo";
import ProfileButton from "./ProfileButton";
import NavbarTags from "./NavbarTags";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AboutIcon, CartIcon, ContactIcon, CrossIcon, HamburgerIcon, HomeIcon, MenuIcon } from "./Icons";
import { useState } from "react";

export default function Navbar() {
    const session = useSession();
    const user = session.data ? session.data.user : null;
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false);

    const isAdmin = user?.email === "admin@gmail.com" ? true : false


    function getMenuClasses() {
        let menuClasses = [];

        if (open) {
            menuClasses = [
                "flex",
                "flex-col",
                "w-full",
                "gap-2",
                "absolute",
                "left-0",
                "w-full",
                "p-2",
                "top-11",
                " bg-gradient-to-b from-indigo-950/95 to-gray-950",
            ]
        }
        else {
            menuClasses.push("md:flex hidden  gap-3 justify-center items-center")
        }

        return menuClasses.join(" ");
    }

    return <div className="w-full overflow-hidden  flex justify-between lg:px-20 md:px-16 px-4 md:py-3 py-2 ">
        <Logo />
        <div className={getMenuClasses()}>
            <Link href="/dashboard"><NavbarTags title="Home" icon={<HomeIcon />} onClick={() => setOpen(false)} /></Link>
            <Link href="/about"><NavbarTags title="About" icon={<AboutIcon />} onClick={() => setOpen(false)} /></Link>
            <Link href="/dashboard#menu-section"><NavbarTags title="Menu" icon={<MenuIcon />} onClick={() => setOpen(false)} /></Link>
            <Link href="/contact"><NavbarTags title="Contact" icon={<ContactIcon />} onClick={() => setOpen(false)} /></Link>
            <div onClick={() => {
                setOpen(false)
                if (!user) {
                    toast.error("Please login to see cart.", {
                        autoClose: 1500,
                        theme: "colored"
                    })
                }
                else {
                    router.push("/cart")
                }
            }}><NavbarTags title="Cart" icon={<CartIcon />} /></div>

            <div className="cursor-pointer h-9 px-4 md:border-2 text-sm text-green-500 border-green-500 hover:bg-green-500 flex justify-center items-center transition transform hover:text-white rounded-3xl"
                onClick={() => {
                    setOpen(false)
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


            {user && <div className="hidden md:block"><ProfileButton isAdmin={isAdmin} letter={user.name ? user.name[0].toUpperCase() : user.username[0].toUpperCase()} /></div>}
            {!user && <div className="hidden md:flex"><Link href="/signin"><LoginButton /></Link></div>}
        </div>

        <div className="flex md:hidden gap-1 justify-center items-center">
            {user && <div className="md:hidden block"><ProfileButton classname="mr-4" isAdmin={isAdmin} letter={user.name ? user.name[0].toUpperCase() : user.username[0].toUpperCase()} /></div>}

            {!user && <div className="md:hidden flex"><Link href="/signin"><LoginButton classname="hover:underline" /></Link></div>}
            <button
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                {!open ? <HamburgerIcon /> : <CrossIcon />}
            </button>
        </div>
    </div>
}