"use client"

import Testimonials from "@/app/components/ui/testimonials";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return <motion.div
        className="w-full font-dmsans flex flex-col gap-36 font-dmsans"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >

        <div className="bg-[url('/about-hero.png')] flex pl-8 w-full h-[700px] bg-cover bg-center ">
            <div className="mt-20 ml-20 w-2/5 flex flex-col gap-8">
                <h1 className="text-8xl font-bold font-fredoka text-yellow-500">Foodiez</h1>
                <h3 className="text-xl text-gray-300">Foodiez is a modern, all-in-one restaurant management platform designed to streamline operations and enhance customer experiences. Whether you are a restaurant owner, manager, or customer, Foodiez provides an intuitive and seamless way to browse menus, place orders, book tables, and manage reservations all in one place!</h3>

                <div className="flex gap-12 mt-12 p-2">
                    <Link href="/dashboard"><button className="p-2 px-6 rounded-lg hover:translate-x-3 bg-red-500  cursor-pointer  transition transform inset 2s hover:scale-105 hover:border-0 flex justify-centeritems-center">Order now
                        <span className="absolute inset-0 border-2 border-red-500  rounded-lg opacity-80 
                        transition-all duration-300 hover:opacity-100  translate-x-2 hover:scale-y-100 hover:-translate-x-0 scale-y-125"></span>
                    </button></Link>
                    <Link href="/contact"><button className="p-2 px-6 rounded-lg hover:translate-x-3 bg-red-500 cursor-pointer  transition transform inset 2s hover:scale-105 hover:border-0 flex justify-centeritems-center">Contact Us
                        <span className="absolute inset-0 border-2 border-red-500 rounded-lg opacity-80 
                        transition-all duration-300 hover:opacity-100  translate-x-2 hover:scale-y-100 hover:-translate-x-0 scale-y-125"></span>
                    </button></Link>
                </div>


            </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-16 px-20">
            <h1 className="text-5xl font-semibold font-fredoka">Perfect Place For An Exceptional Experience</h1>
            <div className="flex gap-16 justify-center items-center">
                <motion.img
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }} src="/side.png" alt="" className="h-120"
                />
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-8 text-gray-300">
                    <h3 className=" text-lg">
                        Indulge in a delightful dining experience where exceptional flavors, warm ambiance, and top-notch service come together. Whether you are here for a casual meal, a special celebration, or a relaxing time with loved ones, our restaurant promises an unforgettable experience. Savor every bite, enjoy the inviting atmosphere, and let us make every moment special for you!
                    </h3>
                    <div className="flex gap-4">
                        <Image src="/Border.png" alt="" className="h-24" />
                        <div className="flex flex-col gap-2 justify-center">
                            <h2 className="text-xl text-white font-bold">Online Food Ordering</h2>
                            <p>Easy food ordering by browsing menu online.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Image src="/Border1.png" alt="" className="h-24" />
                        <div className="flex flex-col gap-2 justify-center">
                            <h2 className="text-xl text-white font-bold">Healthy Food</h2>
                            <p>Eat a wide variety of nutritious healthy foods</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>

        <div className="w-full flex  justify-center items-center px-20 gap-24 px-20">
            <div className="flex flex-col gap-16    ">
                <h1 className="text-5xl font-semibold font-fredoka">We Provide best Services</h1>

                <div className="flex flex-col gap-8">
                    <div className="flex gap-16">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col gap-2">
                            <Image src="/Services1.png" alt="" className="h-30 w-30" />
                            <h2 className="text-xl font-semibold font-fredoka">Afternoon Tea</h2>
                            <p className="text-sm text-gray-300">Relax and enjoy a selection of fine teas paired with delightful pastries and light snacks for a perfect afternoon break.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col gap-2">
                            <Image src="/Services2.png" alt="" className="h-30 w-30" />
                            <h2 className="text-xl font-semibold font-fredoka">Wine & Cocktails</h2>
                            <p className="text-sm text-gray-300">Experience a variety of handcrafted cocktails and premium wines to complement your meal or unwind with friends.</p>
                        </motion.div>

                    </div>
                    <div className="flex gap-16">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col gap-2">
                            <Image src="/Services3.png" alt="" className="h-30 w-30" />
                            <h2 className="text-xl font-semibold font-fredoka">Live Music & Entertainment</h2>
                            <p className="text-sm text-gray-300">Enhance your dining experience with live music performances and entertainment, creating the perfect ambiance for a great time.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col gap-2">
                            <Image src="/Services4.png" alt="" className="h-30 w-30" />
                            <h2 className="text-xl font-semibold font-fredoka">Alfresco Dining</h2>
                            <p className="text-sm text-gray-300">Dine under the open sky with our outdoor seating, offering a refreshing and cozy atmosphere for a memorable experience.</p>
                        </motion.div>
                    </div>
                </div>

            </div>
            <Image src="/Container.png" alt="" className="h-180" />
        </div>

        <motion.img
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            src="/Section.png" className="px-20" />

        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-24 justify-center items-center">
            <h1 className="text-5xl font-semibold font-fredoka">Meet Our Experts</h1>
            <Image src="/experts.png" alt="" className="h-150" />
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-16 justify-center items-center">
            <h1 className="text-5xl font-semibold font-fredoka">A Collection Of Unique Experiences</h1>
            <Image src="/experiences.png" alt="" className="h-120" />
        </motion.div>

        <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-16 justify-center items-center">
            <h1 className="text-5xl font-semibold font-fredoka">A Wide Variety of Dishes</h1>
            <Image src="/food-banner.png" alt="" className="" />
        </motion.div>

        <div className="mt-8 px-16">
            <Testimonials />
        </div>

    </motion.div>
}