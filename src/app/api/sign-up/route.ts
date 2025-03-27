import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/model/User";
import bcrypt from 'bcryptjs'
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request:NextRequest){
    console.log("post function is running");
    await dbConnect()
    try{
        
        const {email, password, name, city} = await request.json()
        console.log({name,email,password,city})
        if (!email || !password) {
          return Response.json(
            { success: false, message: "All fields are required." },
            { status: 400 }
          );
        }

    //  check if user exits with this email
        const existingUserByEmail = await User.findOne({email})

        // create verify code 
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        if(existingUserByEmail){
            console.log("user is existed")

            if(existingUserByEmail.isVerified){
                console.log("user is verified")
                return Response.json({
                success:false,
                message:"User already exits with this email! Please use another email."
            },{status:400})
            }else{
                console.log("user is not verified")
                const hashedPassword = await bcrypt.hash(password,10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now()+3600000);
                
                await existingUserByEmail.save()
            }
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() +1 )
    
        //  now create user
            const newUser = new User({
                email,
                name,
                city,
                password:hashedPassword,
                isVerified:false,
                verifyCode,
                verifyCodeExpiry:expiryDate,
                itemListId:[],
                cart:[],
                online:false,
                chatRooms:[]

            })
            
            
            await newUser.save()

        }

        // send verification email
        const emailResponse = await sendVerificationEmail(email,name,verifyCode)
        if(!emailResponse.success){
            return Response.json({
                success:false,
                message:emailResponse.message
            },{status:500})
        }
        return Response.json({
                success:true,
                message:"User registered successfully. Please verify your email."
            },{status:201})
    }catch(error){
        console.error("Unexpected error while saving user:", error);
        throw new Error("An unexpected error occurred.");
  }
  }
