import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import User from "@/models/User"
import CredentialsProvider from "next-auth/providers/credentials"
import { Account, User as AuthUser } from "next-auth";
import { connect } from "@/utils/dbConfig"
import bcrypt from "bcryptjs"
import crypto from "crypto"

export const authOptions: any = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                await connect()

                try {
                    const user = await User.findOne({ email: credentials.email })

                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        )
                        if (isPasswordCorrect) {
                            return user
                        }
                    }
                } catch (error: any) {
                    throw new Error(error)
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ user, account }: { user: AuthUser; account: Account }) {

            if (account?.provider == "credentials") {
                return true
            }
            if (account?.provider == "github") {
                await connect();

                try {
                    const existingUser = await User.findOne({ email: user.email });

                    if (!existingUser) {

                        const generatedPassword = crypto.randomBytes(32).toString("base64");

                        const newUser = new User({ email: user.email, password: generatedPassword });
                        await newUser.save();
                        return true;
                    }

                    return true;
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
}

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }