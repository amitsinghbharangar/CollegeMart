'use client'

import { Pagination } from "@/components/Pagination";
import UserDetails from "@/components/UserDetails";
import UserItems from "@/components/UserItems";
import { CartItem, User } from "@/model";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface PageMetaTypes {
  total: number;
  page: number;
  pages: number;
}

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [itemList, setItemList] = useState<CartItem[]>([]);
  const [pageMeta, setPageMeta] = useState<PageMetaTypes>({ total: 0, page: 1, pages: 0 });
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  const getUserItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "/api/userItem", // Ensure this matches your API route
        {
          headers: {
            Authorization: `Bearer ${session?.user._id}`,
          },
        }
      );
      
      setItemList(response.data.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 405) {
        signOut();
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!session?.user) return;
    setUserDetails(session.user as User);
    getUserItems();
  }, [session]);

  const handlePageChange = (newPage: number) => {
    setPageMeta((prev) => ({ ...prev, page: newPage }));
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") {
    alert("Please sign in to access the page.");
    router.replace("/sign-in");
  }

  return (
    <motion.section
      className="flex flex-col justify-center p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col gap-6 p-8 rounded-lg shadow-xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <UserDetails userDetails={userDetails} itemList={itemList} />
        <UserItems itemList={itemList} isLoading={isLoading} setItemList={setItemList} />

        <div className="text-center mt-4">
          <motion.button
            className="bg-red-500 hover:bg-red-400 px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-transform transform hover:scale-105"
            onClick={() => signOut()}
            whileHover={{ scale: 1.1 }}
          >
            Sign Out
          </motion.button>
        </div>
      </motion.div>
    </motion.section>
  );
}
