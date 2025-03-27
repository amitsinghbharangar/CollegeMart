import {resend} from '@/lib/resend';
import VerificationEmail from '../../emails/VerificationEmail';
VerificationEmail;

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string,
){
    console.log("send verification is running")
    try{
        await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'College Mart | Verification code',
        react: VerificationEmail({username,otp:verifyCode})
        });
        
        return {success:true, message:"Verification email send successfully."}
    }catch (emailError){
        
        console.error("Error sending verification email",emailError)
        return{success:false, message:"Failed to send verification email."}
    }
}