"use client"; // Required for using hooks in Next.js App Router
import { useRouter } from "next/navigation";
import { CartType } from "./Products"; // Adjust the import path as needed

interface SearchResultsType {
  results: Array<CartType> | null;
}

const SearchResults = ({ results }: SearchResultsType) => {
  const router = useRouter();

  return (
    <div className="w-full rounded-md shadow-md mt-2 overflow-y-auto max-h-48 text-lg bg-white">
      {/* Display search results */}
      {results && results.length > 0 ? (
        results.map((item: CartType, index: number) => (
          <div
            key={index}
            className="p-2 text-gray-700 hover:bg-slate-100 cursor-pointer"
            onClick={() => router.push(`/item/${item.id}`)}
          >
            {item.itemname}
          </div>
        ))
      ) : (
        // Display "No results found" message
        <div className="p-2 text-gray-500 text-center">No results found</div>
      )}
    </div>
  );
};

export default SearchResults;