import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from 'bcrypt'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@mail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log("authorize credentials:", credentials)
        if (!credentials || !credentials.email || !credentials.password) {
          return null
        }
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          console.log("User not found")
          return null
        }
        console.log("User found:", user)
        const isValid = await bcrypt.compare(credentials.password, user.hashedPassword)

        if (!isValid) {
          console.log("Password mismatch")
          return null
        }
        console.log("Login successful")
        return { id: user.id.toString(), email: user.email }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin'
  },
}

const handler =  NextAuth(authOptions)
export { handler as GET, handler as POST }
