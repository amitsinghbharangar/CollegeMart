import 'next-auth'
import { DefaultSession } from 'next-auth';

declare module 'next-auth'{
    interface User{
        _id?:string;
        isVerified?:boolean;
        isOnline?:boolean;
        username?:string;
        city?:string;
        name: string | null | undefined;
    }
    interface Session{
        user:{
            name: string | null | undefined;
            _id?:string;
            isVerified?:boolean;
            isOnline?:boolean;
            username?:string;
            city?:string;
        }
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
         _id?:string;
        isVerified?:boolean;
        isOnline?:boolean;
        username?:string;
        city?:string;
    }
}