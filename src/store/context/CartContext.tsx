import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { CartItem } from "@/model";

// Define the type for the cart context
type CartContextType = {
  cart: CartItem[];
  loading: boolean;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  error: string | null;
  fetchCart: () => Promise<void>;
};

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch the cart
  const fetchCart = async () => {
    if (status !== "authenticated" || !session?.user?._id) {
      setError("User not authenticated");
      setLoading(false); // Loading band karo
      setCart([]); // Cart reset karo
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        "/api/userCart",
        {
          headers: {
            authorization: "Bearer " + session?.user._id,
          },
        }
      );
      if (res.data.cart) {
        setCart(res.data.cart);
      } else {
        setCart([]);
      }
      setError(null);
    } catch (error) {
      console.error("Error fetching cart: ", error);
      setError("Failed to fetch cart");
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the cart when the component mounts or the user changes
  useEffect(() => {
    if (status === "authenticated") {
      fetchCart();
    } else if (status === "unauthenticated") {
      setError("User not authenticated");
      setCart([]);
      setLoading(false);
    }
    // "loading" state mein kuch mat karo, wait karo
  }, [status]);

  // Provide the context value
  const value = {
    cart,
    loading,
    setCart,
    error,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};