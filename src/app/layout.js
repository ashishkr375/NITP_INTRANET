import localFont from "next/font/local";
import "./globals.css";
import SideBar from "./components/SideBar";
import Footer from "../app/components/Footer"
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "NIT Patna | IntraNet",
  description: "National Institute of Technology Patna",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen">
          <SideBar />
          <main className="flex-1 overflow-y-auto ml-9 ">
            <div className="min-h-[92.5vh]">
            {children}</div>
            <Footer/>
          </main>
          
        </div>
        
      </body>
    </html>
  );
}
