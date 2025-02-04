"use client"; // Required for using hooks in Next.js App Router
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { Item } from "../store/dataTypes"; // Adjust the import path as needed
import { CartType } from "./Products"; // Adjust the import path as needed

export interface SearchBarType {
  setResults: (results: Array<CartType>) => void;
}

const SearchBar = ({ setResults }: SearchBarType) => {
  const [input, setInput] = useState("");

  // Fetch data from the backend API
  const fetchData = async (value: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/item/allitems`
      );

      const newValue = value.toLowerCase();
      const results = response.data.filter((item: Item) => {
        return (
          item &&
          item.itemname &&
          item.itemname.toLowerCase().includes(newValue)
        );
      });

      setResults(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle input change
  const handleChange = (value: string) => {
    if (!value) {
      setResults([]); // Clear results if input is empty
    }
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="flex items-center gap-2 border-2 border-gray-700 p-3 rounded-md bg-white">
      {/* Search Icon */}
      <FaSearch className="text-blue-800" size={25} />

      {/* Input Field */}
      <input
        type="text"
        className="focus:outline-none text-lg w-full placeholder:text-gray-500"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Type to search..."
      />
    </div>
  );
};

export default SearchBar;
