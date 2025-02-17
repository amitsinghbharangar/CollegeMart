'use client'
import Herosection from "@/components/Herosection";
import { LoadingSpin } from "@/components/LoadingSpin";
import Products from "@/components/Products";
import { CartProvider } from "@/store/context/CartContext";
import { Suspense } from "react";

export default function Home() {
  
  
  return (
      
    <div className="min-h-screen w-full">
      <Suspense fallback={<LoadingSpin />}>
        <Herosection />
      </Suspense>
      {/* <CartProvider>
        <Products />
      </CartProvider> */}
      
        
    </div>
      
  );
}
