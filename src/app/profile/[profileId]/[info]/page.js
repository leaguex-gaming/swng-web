import Connections from "@/components/profile/Connections";

export default function page({ params }) {
  return <Connections title={params.info} userId={params.profileId} />;
}
