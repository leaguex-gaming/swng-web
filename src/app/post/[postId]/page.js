import PostInfo from "@/components/community/PostInfo";
import { cookies } from "next/headers";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = params.postId;

  const url = `https://966ievwykg.execute-api.ap-south-1.amazonaws.com/development/api/v1/sportsgram/posts?post_id=${id}`;
  const userToken = cookies().get("accessToken")?.value;

  const res = await fetch(url, {
    headers: { "x-access-token": userToken },
  }).then((res) => res.json());

  return {
    title: `${res.posts.team_name} . ${res.posts.topic.name} . Swng photos and videos`,
    description: `${res.posts.content} . Swng photos and videos`,
    keywords: `Swng,Sports,Sport Feeds,${res.posts.topic.name},${res.posts.subtopic.name}`,

    openGraph: {
      title: `${res.posts.team_name} . ${res.posts.topic.name} . Swng photos and videos`,
      description: `${res.posts.content} . Swng photos and videos`,
      image: res.posts.media_url,
      url: "https://www.swng.fan/",
      site_name: "Swng",
      type: "website",
    },
  };
}

export default function Post({ params }) {
  return <PostInfo postId={params.postId} />;
}
