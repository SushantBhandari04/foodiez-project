"use client"

import { motion } from "framer-motion"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default  function Hero() {
    const router = useRouter();
    const session = useSession();
    const user = session.data?.user;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=" flex pl-24 w-full h-[700px] bg-[url('/new-hero-4.jpg')] bg-cover bg-center"
        >
            <div className="  w-fit flex flex-col justify-center  items-left gap-10 -translate-y-10">
                <div className="flex flex-col">
                    <h1 className="text-9xl font-kaushan-script p-0 m-0 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Welcome To</h1>
                    <h1 className="text-[144px] font-montez  font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400 via-yellow-500 p-0 m-0  -translate-y-4">
                        Foodiez
                    </h1>
                    <div className="-translate-y-6 flex flex-col ">
                        <h3 className="text-2xl ml-4 text-gray-200 ">
                            Your Ultimate Self-Service Dining Experience

                        </h3>
                        <h4 className="text-lg ml-4 text-gray-400 " >Browse the menu, place your order, and book a table—all at your fingertips.</h4>
                    </div>

                </div>

                <button 
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
                }} className="py-2 px-8 rounded-2xl hover:translate-x-3 bg-green-500 text-xl font-semibold cursor-pointer ml-2 transition transform inset 2s hover:scale-105 hover:border-0 flex justify-centeritems-center w-fit hover:bg-green-400">Book A Table
                    <span className="absolute inset-0 border-2 border-green-500  rounded-2xl opacity-80 
                        transition-all duration-300 hover:opacity-100  translate-x-2 hover:scale-y-100 hover:-translate-x-0 scale-y-125 hover:border-green-400"></span>
                </button>
            </div>
        </motion.div>
    );
}
