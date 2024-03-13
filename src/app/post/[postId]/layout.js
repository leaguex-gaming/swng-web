import UserRestiction from "@/utils/UserRestriction";

export default function PostInfoLayout({ children }) {
  return <UserRestiction>{children}</UserRestiction>;
}
