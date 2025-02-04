import axios from "axios";
import { atom, selector } from "recoil";
import { UserAtom } from "./user";

export const CartAtom = atom({
  key: "Cart",
  default: selector({
    key: "fetchcart",
    get: async ({ get }) => {
      const user = await get(UserAtom);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/cart`, // Use process.env for environment variables
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // Add the authorization header
            },
          }
        );
        if (!res.data.cart) {
          return [];
        }
        return res.data.cart;
      } catch (error) {
        console.error("Error fetching cart: ", error);
        return [];
      }
    },
  }),
});
