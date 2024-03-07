export const metadata = {
  title: "Swng - for the love of sports",
  description:
    "Create an account or log in to Swng - A simple, fun & creative way to share photos, videos & messages with your sport friends & family.",
  keywords:
    "Swng,Sports,Sport Feeds,Cricket,Football,Kabaddi,Tennis,Hockey,MMA",

  openGraph: {
    title: "Swng - for the love of sports",
    description:
      "Create an account or log in to Swng - A simple, fun & creative way to share photos, videos & messages with your sport friends & family.",
    image:
      "https://swng-media.s3.ap-south-1.amazonaws.com/assets/og-metal-image.png",
    url: "https://www.swng.fan/",
    site_name: "Swng",
    type: "website",
  },
};

export default function PostInfoLayout({ children }) {
  return <>{children}</>;
}
