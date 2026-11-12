import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Staff admin',
  robots: { index: false, follow: false },
};

/** Admin has its own header and no storefront chrome (see app/(site)/layout.tsx). */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-scope flex min-h-screen flex-1 flex-col">{children}</div>;
}
