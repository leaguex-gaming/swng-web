export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: ` Swng photos and videos`,
    description: `Swng photos and videos`,
    keywords: `Swng,Sports,Sport Feeds`,

    openGraph: {
      title: `Swng photos and videos`,
      description: `Swng photos and videos`,
      url: "https://www.swng.fan/",
      site_name: "Swng",
      type: "website",
    },
  };
}

export default function Post({ params }) {
  return <p>kishore</p>;
}
