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
                username:{label:"Username", type:"text", placeholder:"username"},
                password:{label:"Password", type:"password"}
            },
            async authorize(credentials: any):Promise<any>{
                console.log(credentials)
                await dbConnect();
                try{
                    const user = await User.findOne({
                        $or:[
                            {username:credentials.identifier},
                            {email:credentials.identifier},
                        ]
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
                    throw new Error(err)
                }
            }
        })
    ],
    callbacks:{
        async jwt({token, user}){
            if(user){
                token._id = user._id?.toString();
                token.name = user.name;
                token.isVerified = user.isVerified;
                token.isOnline = user.isOnline; 
                token.username = user.username;
                token.city = user.city;
            }
            return token;
        },
        async session({session, token}){
            if(token){
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isOnline = token.isOnline;
                session.user.username = token.username;
                session.user.name = token.name;
                session.user.city = token.city;
            }
            return session;
        }
    },
    pages:{
        signIn:'/sign-in'
    },
    session:{
        strategy:"jwt",
        maxAge: 24 * 60 * 60,
    },
    secret:process.env.AUTH_SECRET
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };