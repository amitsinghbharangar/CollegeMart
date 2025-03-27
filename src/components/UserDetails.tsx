import { CartItem, User } from "@/model";
import { motion } from "framer-motion";

interface UserDetailsProps {
  itemList: CartItem[];
  userDetails: User | null;
}

const UserDetails = ({ itemList, userDetails }: UserDetailsProps) => {
  if (!userDetails) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg w-full max-w-lg mx-auto mt-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">My Details</h2>
      <div className="flex flex-col gap-4">
        <DetailBox label="Name" value={userDetails.name} />
        <DetailBox label="Email" value={userDetails.email} />
        <DetailBox label="City" value={userDetails.city} />
        <DetailBox label="Phone" value={String(userDetails.phone)} />
        <DetailBox label="Listed Items" value={itemList.length.toString()} />
      </div>
    </motion.div>
  );
};

const DetailBox = ({ label, value }: { label: string; value: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="p-4 bg-white/40 backdrop-blur-md border border-gray-300 rounded-lg shadow-md"
    >
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </motion.div>
  );
};

export default UserDetails;
