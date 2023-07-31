import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import dotenv from 'dotenv'

dotenv.config()

const id = String(process.env.GOOGLE_ID)
const secret = String(process.env.GOOGLE_SECRET)

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: id,
      clientSecret: secret
    })
  ],
  secret: 'event-source'
})

 