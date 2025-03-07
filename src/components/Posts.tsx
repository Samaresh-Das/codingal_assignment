import React, { useState, useEffect, useRef, useCallback } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  // Fetch posts from API
  const fetchPosts = async (pageNum: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
      );
      const data: Post[] = await response.json();

      setPosts((prevPosts) => [...prevPosts, ...data]);
      setHasMore(data.length > 0); // If API returns empty, no more data
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer Callback
  const lastPostObserver = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Posts</h1>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div
            key={index}
            ref={index === posts.length - 1 ? lastPostObserver : null}
            className="border p-4 rounded-lg shadow"
          >
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-center mt-4">
          <span className="text-gray-500">Loading more posts...</span>
        </div>
      )}
    </div>
  );
};

export default Posts;
