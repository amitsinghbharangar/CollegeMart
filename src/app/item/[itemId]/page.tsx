"use client";

import { CartItem } from "@/model";
import { Item } from "@/model/Item";
import { useCart } from "@/store/context/CartContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingSpin } from "@/components/LoadingSpin";

export default function ItemPage() {
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { cart, setCart } = useCart();
  const itemId = params.itemId;
  const { data: session } = useSession();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/item/${itemId}`);
        setItem(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  const handleContact = (item: Item) => {
    const buyerId = session?.user._id;
    const sellerId = item.ownerId;
    router.push(`/chats/${buyerId}_${sellerId}`);
  };

  const handleCart = (item: Item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem: CartItem) => cartItem.id === item._id
    );

    if (existingItemIndex !== -1) {
      setCart((prevCart: CartItem[]) =>
        prevCart.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
      toast.error("Item already exists in cart!", { autoClose: 2000 });
    } else {
      const newItem: CartItem = {
        id: String(item._id),
        itemname: item.itemName,
        condition: item.condition,
        price: item.price,
        sold: item.sold,
        description: item.description,
        image: item.image,
        createdAt: item.createdAt,
        quantity: 1,
        ownerId: item.ownerId,
        updatedAt: new Date(),
      };
      setCart((prevCart: CartItem[]) => [...prevCart, newItem]);
      toast.success("Item added to cart!", { autoClose: 2000 });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-10 px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <LoadingSpin />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative group"
            >
              <Image
                className="rounded-xl object-cover w-full h-[400px] transition-transform duration-500 group-hover:scale-105 shadow-lg"
                src={item?.image || "/placeholder.jpg"}
                alt={item?.itemName || "Item Image"}
                width={500}
                height={400}
                priority
                onLoadingComplete={() => setImageLoaded(true)}
              />
            </motion.div>

            {/* Details Section */}
            <div className="flex flex-col justify-between space-y-6 p-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {item?.itemName}
                </h1>
                <p className="mt-2 text-gray-600 text-lg leading-relaxed">
                  {item?.description}
                </p>
                <div className="mt-4 flex items-center space-x-3">
                  <span className="text-gray-700 font-medium">Location:</span>
                  <span className="text-indigo-600 font-semibold">{item?.city}</span>
                </div>
                <p className="mt-4 text-4xl font-extrabold text-green-600">
                  Rs {item?.price.toLocaleString()}
                </p>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleContact(item!)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold text-lg shadow-md transition-all duration-300"
                >
                  Contact Owner
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCart(item!)}
                  className="w-full flex justify-center items-center bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md transition-all duration-300"
                >
                  <AiOutlineShoppingCart size={26} />
                  <span className="ml-2">Add to Cart</span>
                </motion.button>
              </div>
            </div>
          </div>
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
  );
}