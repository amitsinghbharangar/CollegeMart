import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest){
    await dbConnect()
    try{
        const {email,code} = await request.json()
        
        const user = await User.findOne({email:email})
        if(!user){
            console.log(`${email} ${code} not found`)
            return Response.json({
            success:false,
            message:`${email} not found`
            },{status:500})
        }
        const isCodeValid = user.verifyCode === code;
        console.log("code is valid : ",isCodeValid)
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
        console.log("code is expired : ", isCodeNotExpired) 
        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true;
            await user.save();
            return Response.json({
            success:true,
            message:"Account verified successfully"
            },{status:200})
        }else if(!isCodeNotExpired){
            return NextResponse.json({
            success:false,
            message:"Verification code has expired, Please signup again to get new code."
            },{status:401})
        }else{
            return NextResponse.json({
            success:false,
            message:"Incorrect Verification code"
            },{status:402})
        }
    }catch(error){
        console.error("Error verifying user", error)
        return NextResponse.json({
            success:false,
            message:"Error verifying User"
        },{status:500})
    }
}