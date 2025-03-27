import { FaRegTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { CartItem } from "@/model";

interface CartItemType {
  item: CartItem;
  handleDecrease: (item: CartItem) => void;
  handleIncrease: (item: CartItem) => void;
  handleContact: (item: CartItem) => void;
  handleDelete: (item: CartItem) => void;
}

export function CartItems({
  item,
  handleDecrease,
  handleIncrease,
  handleContact,
  handleDelete,
}: CartItemType) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="flex justify-center">
        <img
          src={item.image}
          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
          alt={item.itemname}
        />
      </div>

      {/* Item Name */}
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 text-center sm:text-left">
        {item.itemname}
      </h3>

      {/* Quantity Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          className="p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-all shadow-md"
          onClick={() => handleIncrease(item)}
        >
          +
        </button>
        <p className="text-lg font-semibold text-gray-800">{item.quantity}</p>
        <button
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-md"
          onClick={() => handleDecrease(item)}
        >
          -
        </button>
      </div>

      {/* Price */}
      <p className="text-xl sm:text-2xl font-bold text-green-600 text-center">
        {item.quantity} X Rs. { (item.price).toLocaleString()}
      </p>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => handleContact(item)}
          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all shadow-md"
        >
          Contact Owner
        </button>
        <FaRegTrashAlt
          size={24}
          className="text-red-500 cursor-pointer hover:text-red-600 transition-transform hover:scale-110"
          onClick={() => handleDelete(item)}
        />
      </div>
    </motion.div>
  );
}