import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

// Define the type for the user (adjust as needed)
type User = {
  id: string;
  name: string;
  image?: string;
  // Add other user properties as needed
};

// Define the type for the user context
type UserContextType = {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Update the user state when the session changes
  useEffect(() => {
    if (status === "authenticated") {
      setUser({
        id: String(session.user._id),
        name: session.user.name || "",
      });
      setLoading(false);
    } else if (status === "unauthenticated") {
      setUser(null);
      setLoading(false);
    }
  }, [session, status]);

  // Provide the context value
  const value = {
    user,
    loading,
    signIn: async () => {
      await signIn("CredentialsProvider"); // Replace "github" with your provider
    },
    signOut: async () => {
      await signOut();
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};