import { getClassForCondition } from "../utils/ClassHelper";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { CartItem } from "@/model";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ToggleButton from "./ToggleButton";
import { UserItemsSkeleton } from "./UserItemSkeleton";
import { InfoAlert } from "./InfoAlert";
import { motion } from "framer-motion";

interface UserItemsPropTypes {
  itemList: CartItem[];
  isLoading: boolean;
  setItemList: (item: CartItem[]) => void;
}

const UserItems = ({ itemList, isLoading, setItemList }: UserItemsPropTypes) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [info, setInfo] = useState<boolean>(false);

  async function handleDelete(item: CartItem) {
    const newItemList = itemList.filter((i) => item.id !== i.id);
    setItemList(newItemList);
    try {
      const response = await axios.delete(`api/item/deleteitem/${item.id}`, {
        headers: { id: session?.user._id },
      });
      if (response.status === 200) {
        setInfo(true);
        setTimeout(() => setInfo(false), 5000);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="pb-6 px-4 md:px-10 lg:px-16">
      {info && <InfoAlert />}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">User Items</h2>
        <button
          className="mt-4 md:mt-0 p-3 md:py-2 md:px-5 text-white bg-green-600 hover:bg-green-700 rounded transition-all"
          onClick={() => router.push("/addItem")}
        >
          List New Item
        </button>
      </div>
      {isLoading ? (
        <UserItemsSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {itemList.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
            >
              <div className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-600 transition-all">
                <FaRegTrashAlt size={20} onClick={() => handleDelete(item)} />
              </div>
              <motion.img
                className="w-full h-48 object-cover rounded-t-lg"
                src={item.image}
                alt={item.itemname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold text-gray-800">{item.itemname}</h4>
                  <p className="text-lg font-bold text-green-600">₹{item.price}</p>
                </div>
                <p className={`mt-2 text-sm font-medium ${getClassForCondition(item.condition)}`}>
                  Condition: {item.condition}
                </p>
                <div className="mt-4">
                  {item.sold ? (
                    <button className="w-full p-2 bg-gray-300 text-gray-700 rounded-lg">Resell</button>
                  ) : (
                    <ToggleButton />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserItems;
