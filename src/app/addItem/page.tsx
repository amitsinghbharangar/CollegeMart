'use client';
import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AddItem() {
  const [itemName, setItemName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('New');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const {data:session,status} = useSession();
  const router = useRouter();
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!image) {
        alert('Please select an image');
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'CampusMart'); // Replace with your Cloudinary preset

      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
      const imageUrl = res.data.secure_url;
      const result = await axios.post('api/addItem',{itemName,image:imageUrl,description,condition,price,ownerName:session?.user.name,city:session?.user.city,ownerId:session?.user._id})
      if(result.status===201){
        alert('Item added successfully!');
        router.replace('/Profile')
      }
      
    } catch (error) {
      console.error(error);
      alert('Error adding item');
    }
    setLoading(false);
  };
  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated"){
    alert("please sign in to access the page.");
    router.replace('/sign-in');
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Item Name" className="w-full p-2 border rounded" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
        <Input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" required />
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover mt-2 rounded" />}
        <textarea placeholder="Description" className="w-full p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        <select value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full p-2 border rounded">
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
        <input type="number" placeholder="Price" className="w-full p-2 border rounded" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" disabled={loading}>{loading ? 'Adding...' : 'Add Item'}</button>
      </form>
    </div>
  );
}

