"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";

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
      <h1 className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r  from-cyan-400 to-gray-400 ">
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
          className="flex w-full gap-12 flex-wrap justify-center"
        >
          {orders.length > 0 ? (
            orders.map((order: Order) => (
              <div
                key={order.id}
                className="flex flex-col gap-8  p-8 w-2/5 bg-gradient-to-b from-blue-950 to-violet-950 via-purple-1000   shadow-md rounded-lg h-fit"
              >
                <div className="flex flex-col gap-2">
                  <div className="text-xl font-semibold text-red-400 flex gap-2">
                    Order ID:{" "}
                    <h3 className="text-white text-lg font-medium">
                      {order.orderId}
                    </h3>
                  </div>
                  <div className="text-xl text-green-500 flex gap-2">
                    Total Amount:{" "}
                    <h3 className="text-white text-lg">
                      Rs. {order.totalAmount}
                    </h3>
                  </div>
                  <div className="text-md text-gray-400 flex gap-2">
                    Created At:{" "}
                    <h3 className="text-white">
                      {new Date(order.createdAt).toLocaleString()}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  {order.items.map((item: OrderItem) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <Image
                        src={item.menuItem.imageUrl}
                        alt={item.menuItem.name}
                        className="w-28 h-20 rounded-lg"
                      />
                      <div className="flex flex-col gap-1">
                        <h4 className="text-lg font-semibold text-blue-200">
                          {item.menuItem.name}
                        </h4>
                        <p className="text-sm">Quantity: {item.quantity}</p>
                        <p className="text-sm">
                          Price: Rs. {item.menuItem.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div>No orders found</div>
          )}
        </motion.div>
      )}
    </div>
  );
}