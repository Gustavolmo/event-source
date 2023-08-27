import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const clientId = process.env.GOOGLE_ID || '';
const clientSecret = process.env.GOOGLE_SECRET || '';

async function refreshAccessToken(token: any) {
  try {
    const url =
      'https://oauth2.googleapis.com/token?' +
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,

      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        const expiryTime = account.expires_at || new Date().getTime();
        return {
          // accessToken: account.accessToken,
          accessToken: account.access_token,
          accessTokenExpires: expiryTime * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }
      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as any)) {
        return token;
      }
      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },

    async session({ session, token }: any) {
      if (token) {
        // session.user = token.user || session.user;
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//============================================
// OLD SOLUTION ABOVE - DO NOT DELETE
//============================================

// import NextAuth from 'next-auth';
// import type { NextAuthOptions } from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import dotenv from 'dotenv';

// dotenv.config();

// const id = String(process.env.GOOGLE_ID);
// const secret = String(process.env.GOOGLE_SECRET);

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: id,
//       clientSecret: secret,
//       authorization: {
//         params: {
//           prompt: 'consent', // TESTING CALENDAR SCOPE (?)
//           access_type: 'offline',
//           response_type: 'code',
//           scope: 'https://www.googleapis.com/auth/calendar',
//         },
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export default NextAuth(authOptions);
