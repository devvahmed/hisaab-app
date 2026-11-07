import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PropertyInstallment - Manage • Track • Grow",
  description: "Modern Property Installment Management System for Property Dealers & Real Estate Agencies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#F8FAFC] text-slate-800 antialiased font-sans flex flex-col">
        {children}
      </body>
    </html>
  );
}
