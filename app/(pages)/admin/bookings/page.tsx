"use client";

import { Session } from "next-auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface Table {
  id: string;
  userId: string;
  name: string;
  phone: Number;
  guests: Number;
  date: string;
  time: string;
  createdAt: string
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Table[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get("/api/book");
        const data = response.data;
        setBookings(data);
        setLoading(false);
      } catch (e) {
        setError(true);
        console.log(e);
      }
    }
    fetchBookings();
  }, []);

  return (
    <div className="flex flex-col justify-left  w-full px-32 gap-6 items-center mt-12 ">
      <h1 className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r  from-cyan-400 to-white ">
        Bookings
      </h1>
      <br />

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex w-full gap-12 flex-wrap justify-center">
          {bookings.length > 0 ? (
            bookings.map((table: Table) => (
              <div key={table.id} className="flex flex-col gap-8  p-8 w-2/5 bg-gradient-to-br from-sky-950 to-violet-950 via-indigo-900   shadow-md rounded-lg h-fit">
                <div className="flex flex-col gap-2">
                  <div className="text-xl font-semibold text-green-500 flex flex-wrap gap-2">Booking ID: <h3 className="text-white text-lg">{table.id}</h3></div>
                  <div className="text-md text-gray-400 flex gap-2">
                    Created At: <h3 className="text-white">{new Date(table.createdAt).toLocaleString()}</h3>
                  </div>
                  <div className="text-md text-gray-400 flex gap-2">
                    Name: <h3 className="text-white">{table.name}</h3>
                  </div>
                  <div className="text-md text-gray-400 flex gap-2">
                    Guests: <h3 className="text-white">{table.guests.toString()}</h3>
                  </div>
                  <div className="text-md text-gray-400 flex gap-2">
                    Phone: <h3 className="text-white">{table.phone.toString()}</h3>
                  </div>
                  <div className="text-md text-gray-400 flex gap-2">
                    Date: <h3 className="text-white">{new Date(table.date).toLocaleDateString()}</h3>
                  </div>
                  <div className="text-md text-gray-400 flex gap-2">
                    Time: <h3 className="text-white">{table.time}</h3>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No bookings found</div>
          )}
        </motion.div>
      )}
    </div>
  );
}