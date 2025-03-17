"use client";

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Contact() {
  const [minDate, setMinDate] = useState('');
  const [minTime, setMinTime] = useState('');
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    const now = new Date();
    const isoString = now.toISOString();
    setMinDate(isoString.split('T')[0]);
    setMinTime(isoString.split('T')[1].slice(0, 5));
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();

    if(e.target.phone.value.length!=10){
      setPhoneError(true);
      return;
    }
    setLoading(true);
    const response = await axios.post("http://localhost:3000/api/book", {
      name: e.target.name.value,
      guests: parseInt(e.target.guests.value),
      phone: parseFloat(e.target.phone.value),
      date: e.target.date.value,
      time: e.target.time.value,
    });

    setLoading(false)
    if (response.data) {
      Swal.fire({
        title: "Success!",
        text: "Table booked successfully.",
        icon: "success"
      });
    } else {
      toast.error("Error while booking table!", {
        autoClose: 2000,
        theme: "colored"
      });
    }
  }

  return (
    <div className='flex flex-col gap-8 w-full p-8 '>
      <h1 className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r text-center w-full  from-cyan-400 to-gray-400 ">
        Book A Table
      </h1>

      <div className='flex w-full justify-center items-center'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col gap-8 p-8"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-12 justify-center items-center w-1/3 p-12 rounded-xl w-full">
            <div className="flex flex-col gap-2 justify-center w-full">
              <input type="number" name="guests" required placeholder="Number of guest" className="border-3 border-gray-400 bg-gray-900 text-md  text-gray-100 px-4 py-3 rounded-md" />
            </div>
            <div className='flex gap-4 w-full'>
              <div className="flex flex-col gap-2 justify-center w-full">
                <input type="text" name="name" required placeholder="Full Name" className="border-3 border-gray-400 bg-gray-900 text-md  text-gray-100 px-4 py-3 rounded-md" />
              </div>
              <div className="flex flex-col gap-2 justify-center w-full">
                <input type="text" name="phone" onChange={()=>setPhoneError(false)} required placeholder="Phone No" className="border-3 border-gray-400 bg-gray-900 text-md  text-gray-100 px-4 py-3 rounded-md" />
                {phoneError && <p className='text-red-500'>Please enter a vaild number.</p>}
              </div>
            </div>
            <div className='flex gap-4 w-full'>
              <div className="flex flex-col gap-2 justify-center w-full">
                <input type="date" name="date" required placeholder="Date" className="border-3 border-gray-400 bg-gray-900 text-md  text-gray-100 px-4 py-3 rounded-md" min={minDate} />
              </div>
              <div className="flex flex-col gap-2 justify-center w-full">
                <input type="time" name="time" required placeholder="Time" className="border-3 border-gray-400 bg-gray-900 text-md  text-gray-100 px-4 py-3 rounded-md" min={minTime} />
              </div>
            </div>

            <button type="submit" className="w-full p-2 py-3 font-semibold  bg-blue-600 rounded-lg hover:bg-blue-700 transition transform flex justify-center items-center hover:scale-105 cursor-pointer">
            {loading ? (
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
                Booking Table...
              </>
            ) : (
              "Book Table"
            )}</button>
          </form>
        </motion.div>
        <motion.div>
          <img src="/book-table2.png" alt="" className='w-400' />
        </motion.div>
      </div>
    </div>
  );
}