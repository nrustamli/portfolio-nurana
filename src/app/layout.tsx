import type { Metadata } from "next";
import { Inter, Aldrich } from "next/font/google";
import "../styles/globals.css";
import ThemeProvider from "@/components/ThemeProvider";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${inter.className} ${aldrich.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

