import Posts from "@/components/profile/Posts";

export default function page({ params }) {
  return <Posts userId={params?.profileId}></Posts>;
}
