'use client'

import * as z  from "zod"
import Link from "next/link"
import {useState } from "react"

import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Image from "next/image"

import { signIn } from "next-auth/react"
interface SignInModalProps {
  onClose: () => void; // Function to close the modal
}
export default function SignInModal({ onClose }: SignInModalProps) {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null);
 
  const router = useRouter()

  // zod implementation 
  


  const onSubmit = async () =>{
    setIsSubmitting(true)
    const result = await signIn('credentials',{
      redirect:false,
      identifier:email,
      password:password
    })
    if(result?.error){
      setIsSubmitting(false)
      
    }
    if(result?.url){
      router.replace('/')
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={onSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e)=>(setEmail(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e)=>(setPassword(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-800">
            {
              isSubmitting? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : ('Sign-in')
            }
          </Button>
          </div>
        </form>
      </div>
    </div>
   
  )
}