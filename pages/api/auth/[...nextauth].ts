import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import dotenv from 'dotenv'

dotenv.config()

const id = String(process.env.GOOGLE_ID)
const secret = String(process.env.GOOGLE_SECRET)

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: id,
      clientSecret: secret
    })
  ]
}

export default NextAuth(authOptions);
 