"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { CartItem } from "@/model";
import { useRouter } from "next/navigation";
import Product from "./Product";
import { FilterLabel } from "./FilterLabel";
import { ProductsSkeleton } from "./ProductsSkeleton";
import { Pagination } from "./Pagination";
import { useCart } from "@/store/context/CartContext";
import { useSession } from "next-auth/react";
import { Item } from "@/model/Item";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface PageMetaTypes {
  total: number;
  page: number;
  pages: number;
}

const Products = () => {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { cart, setCart } = useCart();
  const [filter, setFilter] = useState("allitems");
  const [pageMeta, setPageMeta] = useState<PageMetaTypes>({
    total: 0,
    page: 1,
    pages: 0,
  });
  const user = session?.user;
  const router = useRouter();

  const getItems = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/getAllItems?page=${page}&limit=8`);
      setItems(response.data.data || []);
      setPageMeta(response.data.meta || { total: 0, page: 1, pages: 0 });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleContact = (item: Item) => {
    if (status !== "authenticated" || !user) {
      // Store the intended action in localStorage
      localStorage.setItem(
        "pendingAction",
        JSON.stringify({ type: "contact", itemId: item._id })
      );
      toast.info("Please log in to contact the owner!");
      router.push("/auth/signin"); // Redirect to sign-in page
      return;
    }
    const buyerId = user._id;
    const sellerId = item.ownerId;
    router.push(`/chats/${buyerId}_${sellerId}`);
  };

  const handleCart = (item: Item) => {
    if (status !== "authenticated" || !user) {
      // Store the intended action in localStorage
      localStorage.setItem(
        "pendingAction",
        JSON.stringify({ type: "cart", itemId: item._id })
      );
      toast.info("Please log in to add items to your cart!");
      router.push("/auth/signin"); // Redirect to sign-in page
      return;
    }
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
      toast.info("Item quantity updated in cart!");
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
      toast.success("Item added to cart successfully!");
    }
  };

  // Check for pending actions after sign-in
  useEffect(() => {
    if (status === "authenticated" && user) {
      const pendingAction = localStorage.getItem("pendingAction");
      if (pendingAction) {
        const { type, itemId } = JSON.parse(pendingAction);
        const targetItem = items.find((item) => item._id === itemId);

        if (targetItem) {
          if (type === "cart") {
            handleCart(targetItem);
          } else if (type === "contact") {
            handleContact(targetItem);
          }
        }
        // Clear the pending action after execution
        localStorage.removeItem("pendingAction");
      }
    }
  }, [status, user, items]);

  useEffect(() => {
    getItems(pageMeta.page);
  }, [getItems, pageMeta.page]);

  const handlePageChange = (newPage: number) => {
    setPageMeta((prev) => ({ ...prev, page: newPage }));
    getItems(newPage);
  };

  if (isLoading) {
    return <ProductsSkeleton />;
  }

  return (
    <section className="grid lg:grid-cols-6 grid-cols-1 mx-8">
      <div className="rounded-md p-5">
        <h3 className="text-3xl font-semibold">Filter</h3>
        <FilterLabel
          checked={filter === "allitems"}
          onChange={() => setFilter("allitems")}
          name="filter"
          id="allItems"
          label="All items"
        />
        {user && (
          <FilterLabel
            checked={filter === "mycity"}
            onChange={() => setFilter("mycity")}
            name="filter"
            id="myCity"
            label="My city"
          />
        )}
      </div>
      <div className="lg:col-span-5 p-5">
        <h3 className="text-4xl mx-2 mb-5">All Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 m-2">
          {items.map(
            (item) =>
              (filter !== "mycity" ||
                item.city.toLowerCase() === user?.city?.toLowerCase()) && (
                <Product
                  key={String(item._id)}
                  item={item}
                  handleCart={handleCart}
                  handleContact={handleContact}
                />
              )
          )}
        </div>
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

        <div className="w-full flex justify-center m-4">
          <Pagination
            totalPages={pageMeta.pages}
            currentPage={pageMeta.page}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
};

export default Products;






// 'use client'
// import axios from "axios";
// import { useCallback, useEffect, useState } from "react";
// import { CartItem } from "@/model";
// import { useRouter } from "next/navigation";
// import Product from "./Product";
// import { FilterLabel } from "./FilterLabel";
// import { ProductsSkeleton } from "./ProductsSkeleton";
// import { Pagination } from "./Pagination";
// import { useCart } from "@/store/context/CartContext";
// import { useSession } from "next-auth/react";
// import { Item } from "@/model/Item";
// import { toast, ToastContainer } from "react-toastify";

// export interface PageMetaTypes {
//   total: number;
//   page: number;
//   pages: number;
// }

// const Products = () => {
//   const { data: session ,status} = useSession();
//   const [items, setItems] = useState<Item[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const { cart,setCart } = useCart();
//   const [filter, setFilter] = useState("allitems");
//   const [pageMeta, setPageMeta] = useState<PageMetaTypes>({
//     total: 0,
//     page: 1,
//     pages: 0,
//   });
//   const user = session?.user
//   const router = useRouter();
//   const getItems = useCallback(async (page: number) => {
//   try {
//     setIsLoading(true);
//     const response = await axios.get(`/api/getAllItems?page=${page}&limit=8`);
//     console.log(response.data)
//     setItems(response.data.data || []);
//     setPageMeta(response.data.meta || { total: 0, page: 1, pages: 0 });
//   } catch (err) {
//     console.log(err);
//   } finally {
//     setIsLoading(false);
//   }
// }, []);
//   const handleContact = (item: Item) => {
//     const buyerId = user?._id;
//     const sellerId = item.ownerId;
//     router.push(`/chats/${buyerId}_${sellerId}`);
//   };
//   const handleCart = (item: Item) => {
//   const existingItemIndex = cart.findIndex(
//     (cartItem: CartItem) => cartItem.id === item._id 
//   );

//   if (existingItemIndex !== -1) {
//     setCart((prevCart: CartItem[]) =>
//       prevCart.map((cartItem, index) =>
//         index === existingItemIndex
//           ? { ...cartItem, quantity: cartItem.quantity + 1 } 
//           : cartItem
//       )
//     );
//   } else {
//     const newItem: CartItem = {
//       id: String(item._id), 
//       itemname: item.itemName, 
//       condition: item.condition,
//       price: item.price,
//       sold: item.sold,
//       description: item.description,
//       image: item.image,
//       createdAt: item.createdAt,
//       quantity: 1, // 
//       ownerId: item.ownerId,
//       updatedAt: new Date(), // ✅ Set updatedAt field
//     };

//     setCart((prevCart: CartItem[]) => [...prevCart, newItem]);
//     toast.success("Item added to cart successfully!")
//   }
// };

//   useEffect(() => {
//   getItems(pageMeta.page);
// }, [getItems, pageMeta.page]);

//   const handlePageChange = (newPage: number) => {
//   setPageMeta((prev) => ({ ...prev, page: newPage }));
//   getItems(newPage); // Immediately fetch items for the new page
// };

//   if (isLoading) {
//     return <ProductsSkeleton />;
//   }
//   return (
    
//     <section className="grid lg:grid-cols-6 grid-cols-1 mx-8">
      
//       <div className="rounded-md p-5">
//         <h3 className="text-3xl font-semibold">Filter</h3>
//         <FilterLabel
//           checked={filter === "allitems"}
//           onChange={() => setFilter("allitems")}
//           name="filter"
//           id="allItems"
//           label="All items"
//         />
//         {user && (
//           <FilterLabel
//             checked={filter === "mycity"}
//             onChange={() => setFilter("mycity")}
//             name="filter"
//             id="myCity"
//             label="My city"
//           />
//         )}
//       </div>
//       <div className="lg:col-span-5 p-5 ">
//         <h3 className="text-4xl mx-2 mb-5">All Items</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 m-2">
//           {items.map(
//             (item) => 
//               (filter !== "mycity" ||
//                 item.city.toLowerCase() === user?.city?.toLowerCase()) && (
//                 <Product
//                   key={String(item._id)}
//                   item={item}
//                   handleCart={handleCart}
//                   handleContact={handleContact}
                  
//                 />
                
//               )
//           )}
//         </div>
//         <ToastContainer />
        

//         <div className="w-full flex justify-center m-4">
//           <Pagination
//             totalPages={pageMeta.pages}
//             currentPage={pageMeta.page}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Products;
