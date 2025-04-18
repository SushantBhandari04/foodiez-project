"use client";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => Promise<void>;
  prefill: RazorpayPrefill;
  theme: RazorpayTheme;
}

declare global {
  interface Window {
    Razorpay: {
      new (options: RazorpayOptions): RazorpayInstance;
    };
  }
}



interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_order_id: string;
}

interface RazorpayPrefill {
  name: string;
  email: string;
}

interface RazorpayTheme {
  color: string;
}

import { Session } from "next-auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { addItemToCart, deleteItemFromCart, OrderItem } from "@/app/config";
import { CartItem } from "@/app/components/ui/CartItem";
import toast from "react-hot-toast";
import { motion } from "framer-motion"

export default function Cart({ session }: { session: Session }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get("/api/orders");
        const data2 = await response.data;
        const data = data2.filter((item: { status: string; }) => item.status == "pending")
        setItems(data[0]?.items || []);
        console.log(data[0].items)
        setLoading(false);
        console.log("Items: ", items)

      } catch (e) {
        setError(true);
        console.log(error);
        console.log(e);
      }
    }
    fetchItems();
  }, []);

  useEffect(() => {
    setTotalPrice(getTotalPrice());
    setTotalQuantity(getTotalQuantity());
  }, [items]);

  function getTotalPrice() {
    let total = 0;
    items.forEach((item) => (total += item.menuItem.price * item.quantity));
    return total;
  }

  function getTotalQuantity() {
    let total = 0;
    items.forEach((item) => (total += item.quantity));
    return total;
  }

  function handleQuantityChange(itemId: string, newQuantity: number) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.menuItemId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  function handleRemoveItem(itemId: string) {
    setItems((prevItems) =>
      prevItems.filter((item) => item.menuItemId !== itemId)
    );
  }

  async function handleCheckout() {
    try {
      const response = await axios.post("/api/payment/createOrder", {
        amount: totalPrice,
        currency: "INR",
      });
      const order = await response.data;
      console.log("Order final: ", order.order);

     

     

   
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: "Foodiez",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response: RazorpayResponse) {
          // Save the order to the database
          setLoading(true);
          await axios.post("/api/orders/saveOrder", {
        orderId: response.razorpay_order_id,
        totalAmount: totalPrice,
          });

          toast.success("Order placed successfully.", {
            duration: 1000,
          });
          // Clear the cart
          setItems([]);
          setLoading(false);
        },
        prefill: {
          name: session.user.name || "Guest",
          email: session.user.email || "guest@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Load Razorpay script dynamically
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const rzp = new (window).Razorpay(options);
        rzp.open();
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Failed to initiate payment. Please try again.", {
        duration: 1500,
      });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:justify-left justify-center h-full w-full lg:px-32 md:px-16 px-6 lg:gap-6 md:gap-5 gap-2 items-center lg:mt-12 md:mt-8 mt-4">
      <h1 className="lg:text-4xl md:text-3xl text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r  from-cyan-500 to-white via-cyan-200 ">
        Cart
      </h1>
      <br />

      {loading ? (
        <div className="flex  items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex lg:flex-row flex-col lg:justify-center md:gap-24 gap-16 w-full items-center lg:items-start  lg:gap-28 h-full ">
          <div className="flex flex-col lg:gap-8 md:gap-7 gap-6 w-full justify-center items-center">
            {items.length > 0 ? (
              items.map((item: OrderItem) => (
                <CartItem
                  key={item.id}
                  id={item.menuItemId}
                  imageUrl={item.menuItem.imageUrl}
                  title={item.menuItem.name}
                  type={item.menuItem.typeName}
                  price={item.menuItem.price}
                  quantity={item.quantity}
                  onDeleteItem={handleRemoveItem}
                  onQuantityChange={handleQuantityChange}
                  addItem={() => {
                    addItemToCart(item.menuItemId, session.user);
                  }}
                  deleteItem={() => {
                    deleteItemFromCart(item.menuItemId);
                  }}
                />
              ))
            ) : (
              <div>No items in the cart</div>
            )}
          </div>

          <div className="flex flex-col bg-blue-50  lg:w-[650px] md:w-[500px] max-w-[420px] w-full h-fit rounded-lg text-center md:gap-12 gap-6 hover:scale-102 transition transform">
            <h1 className="lg:text-3xl md:text-2xl text-lg w-full bg-blue-1000 lg:p-4 md:p-3 p-2 flex justify-center items-center rounded-t-lg">
              Summary
            </h1>
            <div className="flex flex-col gap-4 w-full p-8">
              <div className="flex justify-between lg:text-xl md:text-lg text-md">
                <h1>Total quantity</h1>
                <h1 className="text-white">{totalQuantity}</h1>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between lg:text-xl md:text-lg text-md">
                <h1>Total</h1>
                <h1 className="flex gap-1">
                  <p className="text-red-1000 font-sans">&#8377;</p> {totalPrice}
                </h1>
              </div>
            </div>

            <button
              className="bg-green-500 md:px-4 md:py-3 px-3 py-2 rounded-b-lg  text-white font-medium md:text-lg text-md w-full mt-4 hover:bg-green-600 cursor-pointer"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}