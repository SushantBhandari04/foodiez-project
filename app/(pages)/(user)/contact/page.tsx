"use client";

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import React from 'react'; // Ensure React is imported for type definitions

export default function Contact() {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) { // Updated type
        e.preventDefault();
        const form = e.currentTarget; // Access form elements safely
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: "34597655-1f06-46b4-aa25-7a083c31700b",
                name: (form.elements.namedItem("name") as HTMLInputElement).value, // Access form fields
                email: (form.elements.namedItem("email") as HTMLInputElement).value,
                message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
            }),
        });
        const result = await response.json();
        if (result.success) {
            Swal.fire({
                title: "Success!",
                text: "Message sent successfully.",
                icon: "success"
            });
            console.log(result);
        } else {
            toast.error("Error while sending message!", {
                autoClose: 2000,
                theme: "colored"
            });
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex flex-col gap-8 justify-center items-center p-8">
            <h1 className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-gray-400">
                Contact Us
            </h1>
            <form onSubmit={handleSubmit} className="bg-gradient-to-b from-blue-950 to-violet-950 flex flex-col gap-8 justify-center items-center w-1/3 p-12 rounded-xl">
                <div className="flex flex-col gap-2 justify-center w-full">
                    <label htmlFor="name" className="text-lg">Name</label>
                    <input type="text" name="name" required placeholder="Your name" className="bg-gray-100 text-black p-2 rounded-md" />
                </div>
                <div className="flex flex-col gap-2 justify-center w-full">
                    <label htmlFor="email" className="text-lg">Email</label>
                    <input type="email" name="email" required placeholder="email@example.com" className="bg-gray-100 text-black p-2 rounded-md" />
                </div>
                <div className="flex flex-col w-full gap-2 justify-center">
                    <label htmlFor="message" className="text-lg">Message</label>
                    <textarea name="message" rows={5} placeholder="Enter Message" className="bg-gray-100 text-black p-2 rounded-md"></textarea>
                </div>
                <button type="submit" className="w-full p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition transform flex justify-center items-center hover:scale-105 cursor-pointer">Submit Form</button>
            </form>
        </motion.div>
    );
}