"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import OrderItem from "@/app/components/ui/OrderItem";

interface OrderItem {
  id: string;
  menuItemId: string;
  quantity: number;
  menuItem: {
    name: string;
    imageUrl: string;
    price: number;
  };
}

interface Order {
  id: string;
  orderId: string;
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get("/api/orders");
        const data2 = await response.data;
        console.log("Data in orderHistory page: ", data2);
        const data = data2.filter((item: { status: string; }) => item.status !== "pending");
        setOrders(data);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching orders:", e);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col justify-left  w-full px-32 gap-6 items-center mt-12 ">
      <h1 className="lg:text-4xl md:text-3xl text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r  from-cyan-500 to-white via-cyan-200 ">
        Order History
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
          className="flex w-full lg:gap-12 md:gap-10 gap-8 flex-wrap justify-center items-center"
        >
          {orders.length > 0 ? (
            orders.map((order: Order, index) => (
              <OrderItem key={index}  order={order}/>
            ))
          ) : (
            <div>No orders found</div>
          )}
        </motion.div>
      )}
    </div>
  );
}