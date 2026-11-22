// auth.ts  (project root)
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';
import { getUserByEmail } from '@/lib/projects-db'; // your DB query function

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsed.success) {
          console.log('1. Zod validation failed:', parsed.error);
          return null;
        }

        const { email, password } = parsed.data;
        const user = await getUserByEmail(email);
        console.log('2. User from DB:', user); // Check if user is undefined or missing passwordHash!
        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
        console.log('3. Passwords match:', passwordsMatch);
        if (passwordsMatch) return user;

        return null;
      },
    }),
  ],
});