import RequireAuth from "@/utils/RequireAuth";

export default function FeedLayout({ children }) {
  return <RequireAuth>{children}</RequireAuth>;
}
