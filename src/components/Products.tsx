'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/router"; // Replace useNavigate with useRouter
import { CartAtom } from "../store/atoms/cart";
import { Item } from "../store/dataTypes";
import { UserAtom } from "../store/atoms/user";
import Product from "./Product";
import { FilterLabel } from "./FilterLabel";
import { ProductsSkeleton } from "./ProductsSkeleton";
import { Pagination } from "./Pagination";
// Define Cart Type
export interface CartType {
  condition: string;
  createdAt: string;
  description: string;
  id: string;
  image: string;
  itemname: string;
  ownerId: string;
  price: number;
  quantity: number;
  sold: boolean;
  updatedAt: string;
  _id: string;
}

// Define Page Metadata Type
export interface PageMetaTypes {
  total: number;
  page: number;
  pages: number;
}

const Products = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cart, setCart] = useRecoilState<CartType[]>(CartAtom);
  const [filter, setFilter] = useState<string>("allitems");
  const [pageMeta, setPageMeta] = useState<PageMetaTypes>({
    total: 0,
    page: 1,
    pages: 0,
  });
  const user = useRecoilValue<UserAtom>(UserAtom);
  const router = useRouter(); // Replace useNavigate with useRouter

  // Fetch Items Function
  const getItems = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/item/allitems?page=${page}&limit=8`
      );
      setItems(response.data.data as Item[]);
      setPageMeta(response.data.meta as PageMetaTypes);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  // Handle Contact Navigation
  const handleContact = (item: Item) => {
    if (!user?.user) return;
    const buyerId = user.user.id;
    const sellerId = item.ownerId;
    router.push(`/chats/${buyerId}_${sellerId}`); // Use router.push for navigation
  };

  // Handle Adding to Cart
  const handleCart = (item: Item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem: CartType) => cartItem.id === item.id
    );
    if (existingItemIndex !== -1) {
      setCart((prevCart: CartType[]) => {
        const updatedCart = prevCart.map((cartItem, index) => {
          if (index === existingItemIndex) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
        return updatedCart;
      });
    } else {
      const newItem: CartType = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
  };

  // Fetch Items on Page Change
  useEffect(() => {
    const currentPage = parseInt(router.query.page as string) || 1; // Get page from query params
    setPageMeta((prev) => ({ ...prev, page: currentPage }));
    getItems(currentPage);
  }, [router.query.page]);

  // Handle Pagination
  const handlePageChange = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage }, // Update query params
    });
  };

  // Render Loading Skeleton
  if (isLoading) {
    return <ProductsSkeleton />;
  }

  return (
    <section className="grid lg:grid-cols-6 grid-cols-1 mx-8">
      {/* Filters Section */}
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

      {/* Products Section */}
      <div className="lg:col-span-5 p-5">
        <h3 className="text-4xl mx-2 mb-5">All Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 m-2">
          {items.map(
            (item: Item) =>
              (filter !== "mycity" ||
                item.city.toLowerCase() === user?.user?.city?.toLowerCase()) && (
                <Product
                  key={item.id}
                  item={item}
                  handleCart={handleCart}
                  handleContact={handleContact}
                  user={user}
                />
              )
          )}
        </div>
        {/* Pagination */}
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