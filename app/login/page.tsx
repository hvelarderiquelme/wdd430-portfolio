import { Suspense } from 'react';
import LoginForm from '@/components/login-form'; // Adjust path to where login-form.tsx lives

export const metadata = {
  title: 'Sign In | Horacio Velarde',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-md border border-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Owner Sign In</h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to manage portfolio projects
          </p>
        </div>

        <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100 rounded-lg" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
