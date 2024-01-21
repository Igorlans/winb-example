import { DefaultSession } from "next-auth";
import {FullUser} from "@/types/members";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: FullUser & DefaultSession["user"];
    }
}
