'use client'
import Herosection from "@/components/Herosection";
import { LoadingSpin } from "@/components/LoadingSpin";
import Products from "@/components/Products";

import { Suspense } from "react";

export default function Home() {
  
  
  return (
      
    <div className="min-h-screen w-full">
      
      <Suspense fallback={<LoadingSpin />}>
        <Herosection />
      </Suspense>
      
      
        <Products />
      
      
        
    </div>
      
  );
}
