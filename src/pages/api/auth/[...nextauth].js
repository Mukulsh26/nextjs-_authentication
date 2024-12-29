import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/backend/lib/mongodb";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db();

        const user = await db.collection("users").findOne({ email: credentials.email });
        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        return { id: user._id, name: user.name, email: user.email };
      },
    }),
    EmailProvider({
      server: {
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS,
        },
        secure: process.env.MAILTRAP_PORT == 465, // SSL for port 465
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier: email, url, provider, token }) => {
        console.log(`Magic Link for ${email}: ${url}`);

        const { host } = new URL(url);
        const transporter = nodemailer.createTransport({
          host: process.env.MAILTRAP_HOST,
          port: process.env.MAILTRAP_PORT,
          secure: process.env.MAILTRAP_PORT == 465,
          auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS,
          },
        });

        const emailSubject = "Your Magic Login Link";
        const emailHtml = `
          <p>Click the link below to log in:</p>
          <p><a href="${url}">Sign In</a></p>
          <p>This link will expire in 15 minutes.</p>
        `;
        
        const emailText = `Click the link below to log in:\n\n${url}\n\nThis link will expire in 15 minutes.`;

        await transporter.sendMail({
          to: email,
          from: process.env.EMAIL_FROM,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
        });
      },
    }),
  ],

  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    error: "/auth/error",
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url === baseUrl || url.includes("callback")) {
        return `${baseUrl}/dashboard`;
      }
      return url; 
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.provider = token.provider;
      }
      return session;
    },

    async jwt({ token, account }) {
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
  },
});
