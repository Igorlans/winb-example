import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/client";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    jwt: {
        maxAge: 10
    },
    secret: "hueta",
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
                // Add logic here to look up the user from the credentials supplied
                // if (!credentials) return;
                const { email, password } = credentials;
                const dbUser = await prisma.user.findUnique({
                    where: {
                        email
                    }
                });
                
                if (!dbUser) {
                    throw new Error("Користувача не знайдено\nСтворіть обліковий запис");
                }
                if (!dbUser.password) {
                    throw new Error("Невірний метод авторизації\nСпробуйте увійти за допомогою Google");
                }
                if (dbUser.password !== password) {
                    throw new Error("Неправильний пароль");
                }

                return dbUser;
            }
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            if (!token?.email) return session;

            const dbUser = await prisma.user.findUnique({
                where: {
                    email: token.email
                },
                include: {
                    member: {
                        include: {
                            tickets: true
                        }
                    },
                }
            });

            if (!dbUser) return session

            session.user = dbUser;

            return session;
            // return session
            // Send properties to the client, like an access_token and user id from a provider.
        }
    }
}