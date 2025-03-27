import 'next-auth'
import { DefaultSession } from 'next-auth';

declare module 'next-auth'{
    interface User{
        _id?:string;
        email?:string;
        phone?:number;
        isVerified?:boolean;
        isOnline?:boolean;
        city?:string;
        name?: string | null | undefined;
    }
    interface Session{
        user:{
            name: string | null | undefined;
            _id?:string;
            email?:string;
            phone?:number;
            isVerified?:boolean;
            isOnline?:boolean;
            city?:string;
        }
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
         _id?:string;
        isVerified?:boolean;
        email?:string;
        phone?:number;
        isOnline?:boolean;
        city?:string;
    }
}