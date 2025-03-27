import React from "react";

// Define the possible color options as a type
type AvatarColor = "teal" | "coral" | "indigo" | "amber";

export function Avatar({
  name,
  size = "small",
  color = "teal",
  className = "", // Added className prop with default empty string
}: {
  name: string;
  size?: "small" | "big";
  color?: AvatarColor;
  className?: string; // Added to props type
}) {
  const colors: Record<AvatarColor, string> = {
    teal: "bg-teal-600 text-white",
    coral: "bg-coral-500 text-white",
    indigo: "bg-indigo-600 text-white",
    amber: "bg-amber-500 text-white",
  };

  const selectedColor = colors[color] || colors.teal; // Default to teal if color is invalid

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full ${selectedColor} shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 ${
        size === "small" ? "w-8 h-8" : "w-12 h-12"
      } ${className}`} // Added className here
    >
      <span
        className={`font-poppins font-semibold uppercase ${
          size === "small" ? "text-sm" : "text-lg"
        }`}
      >
        {name[0]}
      </span>
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 rounded-full pointer-events-none" />
    </div>
  );
}