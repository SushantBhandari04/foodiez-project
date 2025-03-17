'use client'

import { useAnimation, useInView, motion } from "motion/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";



export default function Signin() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const router = useRouter();

  // animation
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView])

  function validateForm() {
    let newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function signin() {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({}); // Clear previous errors

    signIn("credentials", {
      email,
      password,
      redirect: false,
    }).then((signinData) => {
      setLoading(false);

      if (signinData?.error) {
        if (signinData.error.includes("CredentialsSignin")) {
          toast.error("User does not exist or password is incorrect.", {
            autoClose: 3000,
            theme: "colored"
          })
        } else {
          toast.error("Error while signing in. Please try again.", {
            autoClose: 3000,
            theme: "colored"
          })
        }
      } else {
        if(email==="admin@gmail.com"){
          router.push("/admin/home");
        }
        else{
          router.push("/dashboard");
        }
        router.refresh();
      }
    }).catch((error) => {
      console.error("Signin error:", error);
      setLoading(false);
    });
  }



  function signinWithGoogle() {
    setGoogleLoading(true);
    signIn('google', {
      callbackUrl: "http://localhost:3000/dashboard"
    }).then(() => setGoogleLoading(false))
  }

  return <div ref={ref} className="font-dmsans overflow-hidden flex min-h-screen w-screen items-center justify-between bg-gray-800">

    <motion.div
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-1/2 flex flex-col gap-14 h-screen justify-center  text-white p-8 px-36  shadow-2xl">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 justify-center items-center text-4xl font-semibold text-center ">Welcome Back on <h1 className="font-montez text-yellow-900 font-medium text-5xl">Foodiez</h1></div>
        <p className="text-center text-gray-300 text-md ">Sign in to manage your restaurant.</p>
      </div>

      <div className="space-y-5  gap-2 flex flex-col">
        <div className="flex flex-col gap-2 ">
          <h2 className="text-lg">Email</h2>
          <input
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateForm}
            type="text"
            placeholder="john@gmail.com"
            className="bg-gray-100 w-full p-3 h-11 text-black border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="flex flex-col gap-2 ">
          <h2 className="text-lg">Password</h2>
          <input
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validateForm}
            type="password"
            placeholder="john123"
            className="bg-gray-100 w-full p-3 h-11 text-black border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>



      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <button
            onClick={signin}
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
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
          <p className="text-center ">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-300 font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </div>

        <h1 className="text-center text-lg font-semibold text-gray-200 text-md ">
          Or
        </h1>

        <div>
          <button
            onClick={signinWithGoogle}
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
                Signing In...
              </>
            ) : (
              <div className="flex gap-2 items-center justify-center">
                <img src="/google.png" alt="Google Icon" className="h-5 w-5 mr-2" />
                Sign In with Google
              </div>
            )}
          </button>
        </div>
      </div>


    </motion.div>
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 0 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.75, delay: 0.25 }}
      className="h-screen w-1/2">
      <img src="/new-signin-4.jpg" alt="Signup Image" className="h-full w-full" />
    </motion.div>
  </div>

}