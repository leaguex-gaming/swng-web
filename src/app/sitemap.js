export default async function sitemap() {
  let url = `https://l1z6btl2l9.execute-api.ap-south-1.amazonaws.com/production/api/v1/sportsgram/all-posts`;
  const response = await fetch(url);
  const { data } = await response.json();
  const posts = data;

  const postEntries = posts?.map(({ id, updated_at }) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`,
    lastModified: `${updated_at}`,
    priority: 0.9,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user-login`,
      priority: 1,
    },
    ...postEntries,
  ];
}
