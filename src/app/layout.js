import { Inter } from "next/font/google";
import { Providers } from "@/redux/Providers";
import { ToastContainer } from "react-toastify";
import { Cairo } from "next/font/google";
import "react-toastify/dist/ReactToastify.css"; 
import "./globals.css";

import 'bootstrap/dist/css/bootstrap.min.css';

const cairo = Cairo({
  subsets: ["latin"],
  weight: [ '300',"400", "500", "700",'600','800', "900",'1000'],
});

export const metadata = {
  title: "Company Name",
  description: "Description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={cairo.className}>   
      <Providers>
        {children}
        </Providers> 
        </body>
    </html>
  );
}
