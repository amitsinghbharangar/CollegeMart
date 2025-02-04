"use client"; // Required for using hooks in Next.js App Router


import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCartPlus, FaUser } from "react-icons/fa";
const User = '';
import { Avatar } from "./Avatar";
const Navbar = () => {
    const router = useRouter();
    // Fetch user state from context

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 p-2 border-b-2 border-gray-300 shadow-lg poppins-regular px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:col-span-2 gap-15">
                <div className="flex justify-start align-middle items-center">
                    {/* <img
                        src="https://i.postimg.cc/BvXyZQcc/campus-Swaplogo.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="hover:animate-tada cursor-pointer"
                        onClick={() => router.push("/")}
                    /> */}
                    <div className="font-extrabold text-2xl ">CollegeMart </div>
                </div>

                <ul className="grid grid-cols-1 text-center lg:grid-cols-4 md:grid-cols-2 items-center gap-5">
                    <Nav path="/" label="Home" />
                    <Nav path="/contact" label="Contact" />
                    {<Nav path="/chats" label="Chats" />}
                </ul>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                <div className="flex justify-center lg:justify-end m-5">
                    {(
                        <Link href="/cart">
                            <FaCartPlus className="text-4xl" />
                        </Link>
                    )}
                </div>
                <div className="flex justify-center lg:justify-end">
                    
                    {User ? (
                        <Link href='/profile'><Avatar name={User.user.firstName.toUpperCase()} size="big" /></Link>
                        ) : (
                    <Link href="/login"><FaUser className="text-4xl" /></Link>
                    )}
                    
                </div>
            </div>
        </div>
    );
};
interface NavType {
  label: string;
  path: string;
}

const Nav = ({ label, path }: NavType) => {
    return (
        <li className="p-2 text-xl hover:scale-105 ease-in duration-200">
            <Link href={path}>{label}</Link>
        </li>
    );
};

export default Navbar;
