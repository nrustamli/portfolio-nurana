import type { Metadata } from "next";
import { Inter, Aldrich } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
const aldrich = Aldrich({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-aldrich",
});

export const metadata: Metadata = {
  title: "Nurana Rustamli",
  description: "My personal portfolio website where you can find out about my projects, download my resume and explore my blog.",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${aldrich.variable}`}>{children}</body>
    </html>
  );
}

