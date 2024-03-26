import PostInfo from "@/components/community/PostInfo";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = params.postId;

  let url = `https://l1z6btl2l9.execute-api.ap-south-1.amazonaws.com/production/api/v1/sportsgram/posts?post_id=${id}`;

  const res = await fetch(url).then((res) => res.json());

  return {
    title: `Swng photos and videos . ${res?.posts?.topic?.name?.toLowerCase()}`,
    description: `Swng photos and videos .  ${res?.posts?.content}`,
    keywords: `Swng, Sports, Sport Feeds, ${res?.posts?.topic.name}, ${res?.posts?.subtopic?.name}`,

    openGraph: {
      title: `Swng photos and videos . ${res?.posts?.topic?.name?.toLowerCase()}`,
      description: `Swng photos and videos .  ${res?.posts?.content}`,
      type: "article",
      url: "https://www.swng.fan/",
      images: [
        {
          url: res?.posts?.media_url,
        },
      ],
      site_name: "Swng",
    },
  };
}

export default function Post({ params }) {
  return <PostInfo postId={params.postId} />;
}
