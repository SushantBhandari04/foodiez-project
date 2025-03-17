"use client";

import { Session } from "next-auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { addItemToCart, deleteItemFromCart, OrderItem } from "@/app/config";
import { CartItem } from "@/app/components/ui/CartItem";
import { toast } from "react-toastify";
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
        const data = data2.filter(item => item.status == "pending")
        setItems(data[0]?.items || []);
        setLoading(false);
      } catch (e) {
        setError(true);
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
      const order = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: "Foodiez",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response: any) {

          // Save the order to the database
          setLoading(true);
          await axios.post("/api/orders/saveOrder", {
            orderId: response.razorpay_order_id,
            totalAmount: totalPrice,
          });

          toast.success("Order placed successfully.", {
            autoClose: 2000,
            theme: "colored"
          })
          // Clear the cart
          setItems([]);
          setLoading(false);
        },
        prefill: {
          name: session.user.name,
          email: session.user.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Load Razorpay script dynamically
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Failed to initiate payment. Please try again.", {
        autoClose: 2000,
        theme: "colored"
      });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-left h-full w-full px-32 gap-6 items-center mt-12 ">
      <h1 className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r  from-cyan-400 to-gray-400 ">
        Cart
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
          className="flex w-full gap-12 h-full ">
          <div className="flex flex-col gap-8 w-2/3">
            {items.length > 0 ? (
              items.map((item: OrderItem) => (
                <CartItem
                  user={session.user}
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

          <div className="flex flex-col bg-blue-50 w-1/3 h-fit rounded-lg text-center gap-12 hover:scale-102 transition transform">
            <h1 className="text-3xl w-full bg-blue-1000 p-4 flex justify-center items-center rounded-t-lg">
              Summary
            </h1>
            <div className="flex flex-col gap-4 w-full p-8">
              <div className="flex justify-between text-xl">
                <h1>Total quantity</h1>
                <h1 className="text-white">{totalQuantity}</h1>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between text-xl">
                <h1>Total</h1>
                <h1 className="flex gap-1">
                  <p className="text-red-1000">Rs.</p> {totalPrice}
                </h1>
              </div>
            </div>

            <button
              className="bg-green-500 px-4 py-3 rounded-b-lg  text-white font-medium text-lg w-full mt-4 hover:bg-green-600 cursor-pointer"
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