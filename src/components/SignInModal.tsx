'use client'

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void; // Function to close the modal
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const currentPath = usePathname(); // Get the current path

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await signIn("credentials", {
  redirect: false,
  email, // Ensure correct parameter names
  password,
});

if (result?.error) {
  setError("Invalid email or password"); // Show error message
  setIsSubmitting(false);
  return;
}
  

if (!result?.error) {
  onClose();
  router.replace(currentPath); // Stay on the same page
} else {
  setError("Invalid email or password");
}
    

    // if (result?.url) {
    //   router.replace(currentPath); // Redirect to the same page
    // }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative"
          >
            {/* Close Button */}
            <Button
              onClick={onClose}
              className="absolute top-3 right-3 p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </Button>

            <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>

            {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>

              <div className="flex justify-center">
                <Button type="submit" disabled={isSubmitting} className="bg-blue-600 w-full hover:bg-blue-800 py-2 rounded-lg transition">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </form>

            <p className="mt-4 text-sm text-center">
              Don't have an account? <span className="text-blue-600 hover:underline cursor-pointer">Sign Up</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



