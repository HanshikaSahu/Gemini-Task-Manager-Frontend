// app/layout.tsx

import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Gemini Task Manager',
  description: 'AI-powered task manager using Clerk and Gemini',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-50 min-h-screen">
          {/* Global Navbar with SignIn/SignOut handling */}
          <Navbar />

          {/* Toast notifications */}
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

          {/* Page content */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
