import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/model";


export const authOptions: AuthOptions = {
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials:{
                email:{label:"Email", type:"text", placeholder:"Email"},
                password:{label:"Password", type:"password"}
            },
            async authorize(credentials: any):Promise<any>{
                console.log(credentials)
                await dbConnect();
                try{
                    const user = await User.findOne({
                        email:credentials.email
                    })
                    if (!user){
                        throw new Error("No user find with this username or email");
                    }
                    
                    
                    if(!user.isVerified){
                        throw new Error("Please verify your account before login");
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)
                    if(isPasswordCorrect){
                        return user;
                    }else{
                        throw new Error("Incorrect Password");
                    }
                }catch(err:any){
                    console.error("Authorize error:", err);
                    throw new Error(err)
                }
            }
        })
    ],
    pages: {
    signIn: "/", // Prevents redirect to default NextAuth sign-in page
  },
    callbacks:{
        async jwt({token, user}){
            
            if(user){
                token._id = user._id?.toString();
                token.name = user.name;
                token.isVerified = user.isVerified;
                token.isOnline = user.isOnline; 
                token.email = user.email;
                token.phone = user.phone
                token.city = user.city;
            }
            return token;
        },
        async session({session, token}){
            
            if(token){
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isOnline = token.isOnline;
                session.user.name = token.name;
                session.user.city = token.city;
                session.user.email = token.email;
                session.user.phone = token.phone;
            }
            return session;
        }
    },
    
    session:{
        strategy:"jwt",
        maxAge: 24 * 60 * 60,
    },
    secret:process.env.NEXTAUTH_SECRET
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };