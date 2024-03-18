import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./provider";
import Modals from "@/components/modals/Modals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../components/common/toast.css";
import UserRestiction from "@/utils/UserRestriction";

const jaguar = localFont({
  src: "../../public/fonts/Jaguar.ttf",
  display: "swap",
  variable: "--font-jaguar",
});

const ProductSansBold = localFont({
  src: "../../public/fonts/ProductSans-Bold.ttf",
  display: "swap",
  variable: "--font-productsans-bold",
});

const ProductSansRegular = localFont({
  src: "../../public/fonts/ProductSans-Regular.ttf",
  display: "swap",
  variable: "--font-productsans-regular",
});

export const metadata = {
  title: "Swng - for the love of sports",
  description:
    "Create an account or log in to Swng - A simple, fun & creative way to share photos, videos & messages with your sport friends & family.",
  keywords:
    "Swng,Sports,Sport Feeds,Cricket,Football,Kabaddi,Tennis,Hockey,MMA",
  verification: { google: "Bv5OHIK_ACE81EtpZddZb5EcunTKTPtBK4bbgUDj1_k" },

  openGraph: {
    title: "Swng - for the love of sports",
    description:
      "Create an account or log in to Swng - A simple, fun & creative way to share photos, videos & messages with your sport friends & family.",
    type: "article",
    url: "https://main.d2glsnor92oymb.amplifyapp.com",

    images: [
      {
        url: "https://swng-media.s3.ap-south-1.amazonaws.com/assets/og-metal-image.png",
      },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${jaguar.variable} ${ProductSansBold.variable} ${ProductSansRegular.variable}`}>
        <div
          className={
            "flex max-h-screen overflow-hidden min-w-screen bg-black justify-center"
          }>
          <Providers>
            <UserRestiction>{children}</UserRestiction>
            <Modals />
            <ToastContainer autoClose={5000} closeButton={false} />
          </Providers>
        </div>
      </body>
    </html>
  );
}
