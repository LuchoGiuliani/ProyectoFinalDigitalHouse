import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { EmailProvider } from "@/context/emailContext";
import { AuthProvider } from "@/context/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
      <EmailProvider>
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
      </EmailProvider>
      </AuthProvider>
    </html>
  );
}
