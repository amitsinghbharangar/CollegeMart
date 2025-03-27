"use client"; // Required for using hooks in Next.js App Router
import { useRouter } from "next/navigation";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";
import { CustomButton } from "./CustomButton";
import { getClassForCondition } from "../utils/ClassHelper";
import { Item } from "@/model/Item";
import { User } from "@/model";
import { useSession } from "next-auth/react";
import SignInModal from "./SignInModal";
import { useEffect, useState } from "react";


export interface ProductType {
  item: Item;
  handleCart: (item: Item) => void;
  handleContact: (item: Item) => void;
 
}

export default function Product({
  item,
  handleCart,
  handleContact,
  
}: ProductType) {
  const router = useRouter();
  const { data: session,status } = useSession();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [pendingCartItem, setPendingCartItem] = useState<Item | null>(null);
  useEffect(() => {
    if (status === "authenticated" && pendingCartItem) {
      handleCart(pendingCartItem); // Login ke baad cart mein add karo
      setPendingCartItem(null); // Reset pending item
      setIsSignInModalOpen(false); // Modal band karo
    }
  }, [status, pendingCartItem, handleCart]);

  return (
   <div
  className="flex flex-col justify-between max-w-sm hover:shadow-lg hover:bg-white ease-in duration-300 rounded-md cursor-pointer group"
  key={String(item._id)}
>
  {/* Product Image */}
  <div className="overflow-hidden rounded-t-md">
    <img
      className="object-cover w-full h-48 transition-transform duration-300 ease-in-out group-hover:scale-105 rounded"
      src={`${item.image}`}
      onClick={() => router.push(`/item/${item._id}`)}
      alt={item.itemName}
    />
  </div>

  {/* Product Details */}
  <div>
    <div className="p-2">
      <h4 className="text-2xl my-2 font-semibold">{item.itemName}</h4>
      <p className="text-xl my-2 text-orange-700 font-bold">₹{item.price}</p>
      <p className={`my-2 font-medium ${getClassForCondition(item.condition)}`}>
        Condition: {item.condition}
      </p>
      <p className="font-bold text-gray-600">
        {formatDistanceToNow(new Date(item.createdAt), {
          addSuffix: true,
        })}
      </p>
    </div>

    {/* Action Buttons */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-2">
      {/* Add to Cart Button */}
      <CustomButton
        onClick={() => {
          if (session) {
            handleCart(item);
            
          } else {
            setIsSignInModalOpen(true)
          }
        }}
        label={<AiOutlineShoppingCart size={20} />}
        color="yellow"
      />

      {/* Sold or Contact Owner Button */}
      {item.sold ? (
        <button className="p-2 w-full lg:w-auto bg-gray-300 rounded-md shadow-md text-center">
          Sold
        </button>
      ) : (
        <CustomButton
          onClick={() => handleContact(item)}
          label={"Contact Owner"}
          color="blue"
        />
      )}
    </div>
  </div>
  <SignInModal
        isOpen={isSignInModalOpen}
        onClose={()=>setIsSignInModalOpen(false)} />
</div>


  );
}
