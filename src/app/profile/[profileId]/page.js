import Profile from "@/components/profile/Profile";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = params.profileId;

  let url = `https://l1z6btl2l9.execute-api.ap-south-1.amazonaws.com/production/api/v1/sportsgram/profile?user_id=${id}`;

  const res = await fetch(url).then((res) => res.json());

  return {
    title: `${res?.profile?.name} . ${res?.profile?.team_name}`,
    description: `${res?.profile?.name || res?.profile?.team_name} has posted ${
      res?.profile?.total_posts
    } posts. ${res?.profile?.name || res?.profile?.team_name} has ${
      res?.profile?.total_followers
    } followers and ${res?.profile?.total_followings} followings.`,
    keywords: `Swng, Sports, Sport Feeds, ${res?.profile?.name}, ${res?.profile?.team_name}`,

    openGraph: {
      title: `${res?.profile?.name} . ${res?.profile?.team_name}`,
      description: `${
        res?.profile?.name || res?.profile?.team_name
      } has posted ${res?.profile?.total_posts} posts. ${
        res?.profile?.name || res?.profile?.team_name
      } has ${res?.profile?.total_followers} followers and ${
        res?.profile?.total_followings
      } followings.`,
      type: "article",
      url: "https://www.swng.fan/",
      images: [
        {
          url: res?.profile?.profile_photo_small,
        },
      ],
      site_name: "Swng",
    },
  };
}

export default function page({ params }) {
  return <Profile userId={params.profileId} />;
}
