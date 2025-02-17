
"use client"; 
import { FaCartPlus, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "./Avatar";
import { useSession, signIn, signOut } from "next-auth/react";


const Navbar = () => {
  const { data: session, status } = useSession();
  
  const router = useRouter();
  

  return (
    <div className="p-3 shadow-sm flex  justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-8 mx-8">
        <div className="flex justify-center">
          <img
            src="https://i.postimg.cc/BvXyZQcc/campus-Swaplogo.png"
            alt=""
            width={80}
            className="hover:animate-tada cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>
      </div>
        <div className="md:flex items-center gap-6 hidden">
          <ul className="grid grid-cols-1 text-center lg:grid-cols-4 md:grid-cols-2 items-center gap-5">
          <Nav path="/" label="Home" />
          <Nav path="/contact" label="Contact" />
          <Nav path="/about" label="About" />
          {status=='authenticated' && <Nav path="/chats" label="Chats" />}
        </ul>
        </div>

      {/* Right Section */}
      <div className="flex justify-center align-middle">
        <div className="flex justify-center lg:justify-center m-5">
          {status=="authenticated" && (
            <Link href="/cart">
              <FaCartPlus className="text-4xl cursor-pointer" />
            </Link>
          )}
        </div>
        <div className="flex justify-center  items-center">
          <Link href={status=="authenticated"
             ? "/profile" : "/login"}>
            {status=='authenticated' ? (
              <Avatar name={session.user?.name || "User"} size="big" />
            ) : (
              <FaUser className="text-4xl cursor-pointer" />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

interface NavType {
  label: string;
  path: string;
}

export function Nav({ label, path }: NavType) {
  return (
    <Link href={path}>
      <li className="p-2 text-xl hover:scale-105 ease-in duration-200 cursor-pointer">
        {label}
      </li>
    </Link>
  );
}

export default Navbar;
          


          // "use client"; // Required for using hooks in Next.js App Router
          // import { Button } from '@/components/ui/button'
          
          // import { signIn, signOut, useSession } from 'next-auth/react'
          // import Image from 'next/image'
          // import React, { useEffect } from 'react'
          // import {
          //   DropdownMenu,
          //   DropdownMenuContent,
          //   DropdownMenuItem,
          //   DropdownMenuLabel,
          //   DropdownMenuSeparator,
          //   DropdownMenuTrigger,
          // } from "@/components/ui/dropdown-menu"
          // import Link from 'next/link'
          
          // function Header() {
          
          //   const { data } = useSession();
          
          //   return (
          //     <div className='p-3 shadow-sm flex  justify-between'>
          //       <div className='flex items-center gap-8 mx-8'>
          //         <div className='text-primary font-extrabold text-xl'>HomeHero</div>
          //         <div className='md:flex items-center
          //             gap-6 hidden
          //             '>
          //           <Link href={'/'} className='hover:scale-105 hover:text-primary
          //                 cursor-pointer'>Home</Link>
          //           <h2 className='hover:scale-105 hover:text-primary
          //                 cursor-pointer'>Services</h2>
          //           <h2 className='hover:scale-105 hover:text-primary
          //                 cursor-pointer'>About Us</h2>
          
          //         </div>
          
          //       </div>
          //       <div>
          //         {data?.user ?
          
          //           <DropdownMenu>
          //             <DropdownMenuTrigger asChild >
          //               <Image src='/user.jpg'
          //                 alt='user'
          //                 width={40}
          //                 height={40}
          //                 className='rounded-full'
          //               />
          //             </DropdownMenuTrigger>
          //             <DropdownMenuContent className="bg-gray-800 text-white rounded-md shadow-lg">
          //               <DropdownMenuLabel>My Account</DropdownMenuLabel>
          //               <DropdownMenuSeparator />
          //               <DropdownMenuItem className="hover:bg-gray-700">
          //                 <Link href={'/mybooking'}>My Booking</Link>
          //               </DropdownMenuItem>
          //               <DropdownMenuItem className="hover:bg-gray-700" onClick={() => signOut()}>Logout</DropdownMenuItem>
          
          //             </DropdownMenuContent>
          //           </DropdownMenu>
          
          //           :
          //           <Link href={'/login'} ><Button className='bg-purple-500 rounded hover:bg-purple-600'>Login / Sign Up</Button></Link>
          
          
          //         }
          //       </div>
          //     </div>
          //   )
          // }
          
          // export default Header