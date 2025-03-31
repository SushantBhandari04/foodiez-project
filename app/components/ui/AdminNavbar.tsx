"use client"

import Logo from "./Logo";
import ProfileButton from "./ProfileButton";
import NavbarTags from "./NavbarTags";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
    const session = useSession();
    const user = session.data ? session.data.user : null;

    const isAdmin = user?.email==="admin@gmail.com" ? true : false

    return <div className="flex justify-between px-28 py-3 ">
        <Logo />
        <div className="flex gap-5 justify-center items-center">
            <Link href="/admin/home"><NavbarTags title="Home" /></Link>
            <Link href="/admin/home#menu-section"><NavbarTags title="Menu" /></Link>
            <Link href="/admin/add-menu-item"><NavbarTags title="Add-item" /></Link>
            <Link href="/admin/orders"><NavbarTags title="Orders" /></Link>
            <Link href="/admin/bookings"><NavbarTags title="Bookings" /></Link>

            {user && <ProfileButton letter={user.name ? user.name[0].toUpperCase() : user.username[0].toUpperCase()} isAdmin={isAdmin}/>}
            {!user && <Link href="/signin"><LoginButton /></Link>}
        </div>
    </div>
}