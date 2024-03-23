import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import "./globals.css";
import { Providers } from "./providers";
import NextTopLoader from "nextjs-toploader";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import SessionProvider from "@/utils/SessionProvider";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js 14 movie app",
  description: "Movie app built with Next.js 14",
  icons:
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍿</text></svg>",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en" className="dark">
      <body>
        <SessionProvider session={session}>
          <ReactQueryProvider>
            <NextTopLoader showSpinner={false} />
            <Navbar />
            <Toaster
              toastOptions={{
                error: {
                  style: {
                    fontSize: "0.8rem",
                    borderRadius: "1rem",
                    color: "#fff",
                    backgroundColor: "#111",
                    fontFamily: "monospace",
                  },
                },
                success: {
                  style: {
                    fontSize: "0.8rem",
                    borderRadius: "1rem",
                    color: "#fff",
                    backgroundColor: "#111",
                    fontFamily: "monospace",
                  },
                },
              }}
            />
            <Providers>{children}</Providers>
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
