import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";
import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma) as Adapter,
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	session: {
		strategy: "jwt",
	},
};
export default authOptions;
