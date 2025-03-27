import { CartItem } from "@/model";
import axios from "axios";
import { toast } from "react-toastify";
import { Session } from "next-auth"; // Import Session type if needed

export const updateCart = async (cart: CartItem[], session: Session | null) => {
  
  if (!session || !session.user?._id) {
    toast.error("You must be logged in to update the cart", { autoClose: 3000 });
    throw new Error("User not authenticated");
  }

  try {
    const res = await axios.post(
      "/api/updateCart", // Ensure this matches your API route
      { cart },
      {
        headers: {
          Authorization: `Bearer ${session.user._id}`,
        },
      }
    );
    toast.success("Cart updated successfully", { autoClose: 3000 });
    
    return res.data; // Optionally return the response data
  } catch (err) {
    toast.error("Error updating cart", { autoClose: 3000 });
    if (axios.isAxiosError(err)) {
      console.error("Axios error:", err.response?.data.message || err.message);
      throw new Error(err.response?.data.message || "Failed to update cart");
    } else {
      console.error("Unexpected error:", (err as Error).message);
      throw err; // Rethrow non-Axios errors
    }
  }
};