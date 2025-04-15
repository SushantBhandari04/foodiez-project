"use client"

import { motion } from "framer-motion"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CalendarIcon, ChefHatIcon, RightArrowIcon, UtensilsIcon } from "./Icons";

export default function Hero() {
    const router = useRouter();
    const session = useSession();
    const user = session.data?.user;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex w-full h-[750px] bg-[url('/new-hero-7.jpg')] bg-cover bg-center font-dmsans before:absolute before:inset-0 before:bg-black/40 before:backdrop-blur-2xs before:z-0"
        >
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
            <div className="relative w-full z-10 flex flex-col gap-20 justify-center items-center">
                <div className="flex flex-col justify-center w-full items-center gap-6 ">
                    <div className="bg-amber-950/70 px-5 py-2 rounded-full border-1 border-amber-700/80 text-amber-white font-medium flex gap-2 justify-center items-center">
                        <ChefHatIcon />
                        <h3>Experience Fine Dining</h3>
                    </div>
                    <div className="flex gap-4  font-semibold text-7xl justify-center font-fredoka">
                        {/* <motion.h1 initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, ease: "linear" }} className="w-full text-9xl font-kaushan-script p-0 m-0 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 overflow-hidden whitespace-nowrap">Welcome To</motion.h1>
                    <motion.h1 initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, ease: "easeInOut", delay: 1 }} className="text-[144px] font-montez  font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400 via-yellow-500 p-0 m-0  -translate-y-4 overflow-hidden whitespace-nowrap">
                        Foodiez
                    </motion.h1> */}

                        <h1 className=" ">Welcome to</h1>
                        <h1 className="text-amber-500">Foodiez</h1>

                    </div>

                    <h2 className="text-[20px] tracking-tight text-gray-300 max-w-156 text-center">Experience exceptional dining with our curated menu and seamless table booking system. Every dish tells a story.</h2>


                </div>


                <div className="flex gap-16">
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
                        }} className="py-2 flex gap-2 px-8 rounded-full hover:translate-x-3 bg-green-600 text-xl font-semibold cursor-pointer ml-2 transition transform inset 2s  hover:border-0  justify-center items-center w-fit hover:bg-green-500">Book A Table <RightArrowIcon />
                        <span className="absolute inset-0 border-2 border-green-600  rounded-full opacity-80 
                        transition-all duration-300 hover:opacity-100  translate-x-2 hover:scale-y-100 hover:-translate-x-0 scale-y-120 hover:border-green-500"></span>
                    </button>

                    <button className="px-8 py-3 text-xl bg-slate-800/80 hover:bg-slate-700/70 cursor-pointer hover:scale-103 transform transition  border-1 border-slate-500  text-white rounded-full">View Menu</button>

                </div>

                <div className="flex w-full items-center gap-12 justify-center mt-12">
                    <div className="flex flex-col justify-between w-108 h-40 border-1 border-gray-700 bg-slate-900 px-8 py-8 rounded-xl hover:border-amber-600 hover:scale-102 transition transform">
                        <div className="flex gap-2 font-semibold items-center"><UtensilsIcon /><h3 className="text-2xl">Browse Menu</h3></div>
                        <h4 className="text-md text-gray-400">Discover delicious meals curated just for you.</h4>
                    </div>
                    <div className="flex flex-col justify-between w-108 h-40 border-1 border-gray-700 bg-slate-900 px-8 py-8 rounded-xl hover:border-amber-600 hover:scale-102 transition transform">
                        <div className="flex gap-2 font-semibold items-center"><CalendarIcon /><h3 className="text-2xl">Book a Table</h3></div>
                        <h4 className="text-md text-gray-400">Discover delicious meals curated just for you.</h4>
                    </div>
                    <div className="flex flex-col justify-between w-108 h-40 border-1 border-gray-700 bg-slate-900 px-8 py-8 rounded-xl hover:border-amber-600 hover:scale-102 transition transform">
                        <div className="flex gap-2 font-semibold items-center"><CalendarIcon /><h3 className="text-2xl">Hygiene & Safety</h3></div>
                        <h4 className="text-md text-gray-400">We follow all hygiene protocols for your safety.</h4>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
