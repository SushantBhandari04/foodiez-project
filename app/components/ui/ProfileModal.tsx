"use client"

import { signOut, useSession } from "next-auth/react";
import ProfileButton from "./ProfileButton";
import { motion } from "framer-motion"
import { useProfileModalStore } from "@/store";
import { useRouter } from "next/navigation";

export default function ProfileModal() {
    const closeModal = useProfileModalStore((state) => state.closeModal)
    const router = useRouter();

    const session = useSession();
    const user = session.data?.user;

    const isAdmin = user?.email==="admin@gmail.com" ? true : false

    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ fontFamily: "DM Sans" }}
        className="fixed inset-0 flex items-center justify-center   bg-opacity-90 backdrop-filter backdrop-blur-lg">
        <div className="bg-gradient-to-b from-gray-600 to-sky-950  p-16 rounded-xl shadow-md shadow-gray-700 w-80 text-center text-white flex flex-col gap-4 min-w-96 w-fit">
            <div><ProfileButton isAdmin={isAdmin} letter={user ? (user.username ? user.username[0]?.toUpperCase() : user.name?.[0]?.toUpperCase() ?? "") : ""} /></div>
            <p className="text-xl font-medium">{user ? (user.name ? user.name : user?.username) : ""}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
            <div className="flex flex-col gap-6 mt-12">
                {user?.email!=="admin@gmail.com" && <button
                    className="px-4 cursor-pointer py-2 bg-green-500 hover:bg-green-600 rounded-md text-white w-full"
                    onClick={() => {
                        closeModal()
                        router.push("/orderHistory")
                    }}
                >
                    My Orders
                </button>}
                
                {user?.email!=="admin@gmail.com" && <button
                    className="px-4 cursor-pointer py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white w-full"
                    onClick={() => {
                        closeModal()
                        router.push("/bookings")
                    }}
                >
                    My Bookings
                </button>}
                
                <button
                    className=" px-4 py-2 cursor-pointer bg-red-600 hover:bg-red-700 rounded-md text-white w-full"
                    onClick={() => signOut({
                        redirect: true,
                        callbackUrl: `${window.location.origin}/signin`
                    })}
                >
                    Logout
                </button>
                <button
                    className="px-4 cursor-pointer py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white w-full"
                    onClick={closeModal}
                >
                    Close
                </button>
            </div>

        </div>
    </motion.div>
}