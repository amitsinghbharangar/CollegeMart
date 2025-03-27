"use client";

import { CartItems } from "@/components/Cartitems";
import { LoadingSpin } from "@/components/LoadingSpin";
import { CartItem } from "@/model";
import { useCart } from "@/store/context/CartContext";
import { updateCart } from "@/utils/handleCart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  const { cart, setCart, loading } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleContact = (item: CartItem) => {
    const buyerId = session?.user._id;
    const sellerId = item.ownerId;
    router.push(`/chats/${buyerId}_${sellerId}`);
  };

  const getTotalAmount = () => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  const handleDelete = (item: CartItem) => {
    const newCart = cart.filter((it: CartItem) => it.id !== item.id);
    setCart(newCart);
  };

  const handleIncrease = (item: CartItem) => {
    const updatedCart = cart.map((it: CartItem) => {
      if (it.id === item.id) {
        if (it.quantity >= 5) {
          toast.error("Cannot increase quantity beyond 5!");
          return it; // Return the item unchanged
        }
        return { ...it, quantity: it.quantity + 1 };
      }
      return it;
    });
    setCart(updatedCart);
  };

  const handleDecrease = (item: CartItem) => {
    const updatedCart = cart.map((it: CartItem) =>
      it.id === item.id && it.quantity > 1 ? { ...it, quantity: it.quantity - 1 } : it
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    getTotalAmount();
    
    updateCart(cart, session);
  }, [cart, loading, session]);

  return (
    <Suspense fallback={<LoadingSpin />}>
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Your Cart
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-lg">
              <p className="text-xl text-gray-600">Your cart is empty!</p>
              <button
                onClick={() => router.push("/")}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
              >
                Shop Now
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {cart.map((item: CartItem) => (
                  <CartItems
                    key={item.id}
                    item={item}
                    handleDecrease={handleDecrease}
                    handleIncrease={handleIncrease}
                    handleContact={handleContact}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-8 p-6 bg-white rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between"
              >
                <h2 className="text-2xl font-semibold text-gray-800">
                  Total Amount
                </h2>
                <p className="text-3xl font-bold text-green-600">
                  Rs. {totalAmount.toLocaleString()}
                </p>
              </motion.div>
            </>
          )}
        </motion.div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </section>
    </Suspense>
  );
}