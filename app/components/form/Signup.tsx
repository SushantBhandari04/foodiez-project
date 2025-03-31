'use client';

import axios from "axios";
import { useAnimation, useInView, motion } from "motion/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Signup() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [googleLoading, setGoogleLoading] = useState<boolean>(false);

    // animation
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView])

    // Error states
    const [emailError, setEmailError] = useState<string | null>(null);
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const router = useRouter();

    function validateInputs() {
        let isValid = true;

        if (!email) {
            setEmailError("Email is required");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Invalid email format");
            isValid = false;
        } else {
            setEmailError(null);
        }

        if (!username) {
            setUsernameError("Username is required");
            isValid = false;
        } else {
            setUsernameError(null);
        }

        if (!password) {
            setPasswordError("Password is required");
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            isValid = false;
        } else {
            setPasswordError(null);
        }

        return isValid;
    }

    function signup() {
        if (!validateInputs()) {
            return;
        }

        try {
            setLoading(true);
            axios.post(`${process.env.BACKEND_URL}/api/auth/signup`, {
                email,
                password,
                username
            }).then(response => {
                const data = response.data as { message: string };
                if (data.message == "User signed up successfully.") {
                    router.push("/signin");
                    toast.success("Signup successful", {
                        autoClose: 3000,
                        theme: "colored"
                    })
                } else {
                    toast.error(data.message, {
                        autoClose: 3000,
                        theme: "colored"
                    });
                }
                setLoading(false);
            });
        } catch {
            toast.error("Signup failed. Please try again.", {
                autoClose: 3000,
                theme: "colored"
            });
            setLoading(false);
        }
    }

    function signupWithGoogle() {
        setGoogleLoading(true);
        signIn('google', {
            callbackUrl: `${process.env.BACKEND_URL}/dashboard`
        }).then(() => setGoogleLoading(false));
    }

    return (
        <div ref={ref} className="font-dmsans overflow-hidden flex min-h-screen w-screen items-center justify-between bg-gray-800" >
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 0 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="h-screen w-1/2">
                <img src="/signup-image.jpg" alt="Signup Image" className="h-full w-full" />
            </motion.div>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.1 }} className="w-1/2 flex flex-col gap-14 h-screen text-white p-8 px-36 shadow-2xl">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 justify-center items-center text-4xl font-semibold text-center">
                        Create Account on <h1 className="font-montez text-yellow-900 font-medium text-5xl">Foodiez</h1>
                    </div>
                    <p className="text-center text-gray-300 text-md">Join us and manage your restaurant effortlessly.</p>
                </div>

                <div className="space-y-5 gap-2 flex flex-col">
                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg">Email</h2>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="john@gmail.com"
                            className={`w-full p-3 h-11 text-black border bg-gray-100 ${emailError ? "border-red-500" : "border-gray-300"
                                } rounded-xl shadow-sm focus:outline-none focus:ring-2 ${emailError ? "focus:ring-red-500" : "focus:ring-blue-500"
                                } focus:border-transparent`}
                            disabled={loading}
                        />
                        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    </div>

                    {/* Username Input */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg">Username</h2>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="John"
                            className={`w-full p-3 h-11 text-black border bg-gray-100 ${usernameError ? "border-red-500" : "border-gray-300"
                                } rounded-xl shadow-sm focus:outline-none focus:ring-2 ${usernameError ? "focus:ring-red-500" : "focus:ring-blue-500"
                                } focus:border-transparent`}
                            disabled={loading}
                        />
                        {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg">Password</h2>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="john123"
                            className={`w-full p-3 h-11 text-black border bg-gray-100 ${passwordError ? "border-red-500" : "border-gray-300"
                                } rounded-xl shadow-sm focus:outline-none focus:ring-2 ${passwordError ? "focus:ring-red-500" : "focus:ring-blue-500"
                                } focus:border-transparent`}
                            disabled={loading}
                        />
                        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <button
                        onClick={signup}
                        className={`cursor-pointer w-full flex justify-center items-center bg-yellow-900 text-black py-3 rounded-xl font-semibold transition-all ${loading ? "bg-blue-400 cursor-not-allowed" : "hover:bg-yellow-500 shadow-lg transform hover:scale-[1.02]"
                            }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-black"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8H4z"
                                    ></path>
                                </svg>
                                Creating Account...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                    <p className="text-center">
                        Already have an account?{" "}
                        <a href="/signin" className="text-blue-300 font-semibold hover:underline">Sign in</a>
                    </p>

                    <h1 className="text-center text-lg font-semibold text-gray-200 text-md">Or</h1>

                    <button
                        onClick={signupWithGoogle}
                        className={`cursor-pointer w-full flex justify-center items-center bg-blue-600 text-white py-3 rounded-xl font-semibold transition-all ${googleLoading ? "bg-blue-400 cursor-not-allowed" : "hover:bg-blue-700 shadow-lg transform hover:scale-[1.02]"
                            }`}
                        disabled={googleLoading}
                    >
                        {googleLoading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8H4z"
                                    ></path>
                                </svg>
                                Creating Account...
                            </>
                        ) : (
                            <div className="flex gap-2 items-center justify-center">
                                <img src="/google.png" alt="Google Icon" className="h-5 w-5 mr-2" />
                                Sign Up with Google
                            </div>
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
