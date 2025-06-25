// src/app/(dashboard)/layout.tsx

import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="pt-20 px-4 max-w-5xl mx-auto">
      {children}
    </main>
  );
}
