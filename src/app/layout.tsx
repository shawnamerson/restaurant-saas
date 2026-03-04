import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import config from "../../restaurant.config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: config.seo.title || config.name,
  description: config.seo.description || config.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --color-primary: ${config.colors.primary};
                --color-primary-dark: ${config.colors.primaryDark};
                --color-secondary: ${config.colors.secondary};
                --color-accent: ${config.colors.accent};
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
