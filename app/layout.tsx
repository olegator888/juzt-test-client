import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const font = Montserrat({ subsets: ["cyrillic", "latin"] });

export const metadata: Metadata = {
  title: "Шевченко Just Studio тестовое",
  description: "Я очень старался :)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
