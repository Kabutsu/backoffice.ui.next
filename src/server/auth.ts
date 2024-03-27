import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions
} from "next-auth";
import { JWT } from "next-auth/jwt";
import AzureAdProvider from "next-auth/providers/azure-ad";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
    accessToken: unknown;
  }
}

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
  try {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', process.env.AZURE_AD_CLIENT_ID as string);
    formData.append('client_secret', process.env.AZURE_AD_CLIENT_SECRET as string);
    formData.append('scope', process.env.SAMPLE_BFF_SCOPE as string);

    const response = await fetch("https://login.microsoftonline.com/" + process.env.AZURE_AD_TENANT_ID + "/oauth2/v2.0/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: formData.toString()
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    const expiry = Date.now() + (refreshedTokens.ext_expires_in as number * 1000);

    console.log("Refreshed token expires on:", new Date(expiry));

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: expiry,
      dateAccessTokenExpires: new Date(expiry),
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.NEXTAUTH_SECRET,
  },

  callbacks: {
    // Acquire the access token and refresh token
    // Called when a user is authenticated
    async jwt({ token, account }) {
      console.log("JWT Callback");

      // Initial sign in
      if (account) {
        const expiry = Date.now() + (account.ext_expires_in as number * 1000);

        const jwt = {
          ...token,
          accessToken: account.id_token,
          accessTokenExpires: expiry,
          dateAccessTokenExpires: new Date(expiry),
        };

        console.log("Access token:", jwt.accessToken);
        console.log("Expires on:", jwt.dateAccessTokenExpires);

        return jwt;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },

    // Send session properties to the client, like an access_token from a provider.
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  providers: [
    AzureAdProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      idToken: true,
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
