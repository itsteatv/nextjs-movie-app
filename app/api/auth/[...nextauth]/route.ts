import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import User from "@/models/User"
import CredentialsProvider from "next-auth/providers/credentials"
import { Account, User as AuthUser } from "next-auth"
import { connect } from "@/utils/dbConfig"
import bcrypt from "bcryptjs"

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
}
export default NextAuth(authOptions)