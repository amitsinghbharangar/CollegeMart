'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

import axios, { AxiosError } from 'axios';


import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from "sonner";
export default function VerifyAccount (){
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [code,setCode] = useState("");
  const [error, setError] = useState<string | null>("Hello this is a error para");
  const router = useRouter();
  const params = useParams();
  const email = params.email ? decodeURIComponent(String(params.email)) : "";

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();
    setError(null);
    if(params){
      console.log("email in params is: ",email)
    }else{
      console.log("email is not found ")
      return
    }
    setIsSubmitting(true)
    try {
      const response = await axios.post('/api/verifyCode', {email,code});
      if (response.status === 200) {
        toast.success(response.data.message)
      }
      else{
        setError(response.data.message)
        console.log("error is : ", response )
      }
      
      router.replace(`/sign-in`);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in verifying", error)
      const axiosError =error as AxiosError;
     
      
      setIsSubmitting(false);
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen p-4 bg-gray-100'>
        <div className='sm:max-w-2xl  md:max-w-6xl p-8 space-y-6 bg-white rounded-lg shadow-lg'>
            <div className='text-center'>
                <h1 className='text-3xl font-extrabold tracking-tight lg:text-4xl mb-4'>
                    Verify your Account
                </h1>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <p className='mb-4'>
                    Enter the verification code send to your email
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                
                  <Input
                    type="text"
                    name="code"
                    value={code}
                    placeholder='Enter the code'
                    onChange={(e)=>(setCode(e.target.value))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
              </div>
              <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-800">
            {
              isSubmitting? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  verifying ...
                </>
              ) : ('Verify')
            }
          </Button>
            </form>
        </div>
    </div>
  )
}


