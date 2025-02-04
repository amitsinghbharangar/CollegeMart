"use client"; // Required for using hooks in Next.js App Router
import { useRouter } from "next/navigation";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";
import { Item, User } from "../store/dataTypes"; // Adjust the import path as needed
import { CustomButton } from "./CustomButton";
import { getClassForCondition } from "../utils/ClassHelper";

export interface ProductType {
  item: Item;
  handleCart: (item: Item) => void;
  handleContact: (item: Item) => void;
  user: User | null; // Update type to allow null if no user is logged in
}

export default function Product({
  item,
  handleCart,
  handleContact,
  user,
}: ProductType) {
  const router = useRouter();

  return (
    <div
      className="flex flex-col justify-between max-w-sm hover:scale-105 hover:shadow-lg hover:bg-white ease-in duration-300 rounded-md cursor-pointer"
      key={item.id}
    >
      {/* Product Image */}
      <img
        className="rounded-t-md object-cover w-full h-48"
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.image}`}
        onClick={() => router.push(`/item/${item.id}`)}
        alt={item.itemname}
      />

      {/* Product Details */}
      <div>
        <div className="p-2">
          <h4 className="text-2xl my-2 font-semibold">{item.itemname}</h4>
          <p className="text-xl my-2 text-orange-700 font-bold">₹{item.price}</p>
          <p
            className={`my-2 font-medium ${getClassForCondition(item.condition)}`}
          >
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
              if (user) {
                handleCart(item);
              } else {
                router.push("/login");
              }
            }}
            label={<AiOutlineShoppingCart size={30} />}
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
    </div>
  );
}



// "use client";
// import { useState } from "react";
// import Product from "../components/Product";

// const HomePage = () => {
//   const [user, setUser] = useState<User | null>(null); // Replace with actual user data

//   const handleCart = (item: any) => {
//     console.log("Added to cart:", item);
//   };

//   const handleContact = (item: any) => {
//     console.log("Contact owner for:", item);
//   };

//   const products = [
//     {
//       id: 1,
//       itemname: "Laptop",
//       price: 50000,
//       condition: "Good",
//       createdAt: new Date(),
//       image: "laptop.jpg",
//       sold: false,
//     },
//     {
//       id: 2,
//       itemname: "Phone",
//       price: 20000,
//       condition: "Excellent",
//       createdAt: new Date(),
//       image: "phone.jpg",
//       sold: true,
//     },
//   ];

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Products</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <Product
//             key={product.id}
//             item={product}
//             handleCart={handleCart}
//             handleContact={handleContact}
//             user={user}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePage;