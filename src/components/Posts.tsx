import { useState, useEffect, useRef, useCallback } from "react";
import LoadingSpinner from "../shared/LoadingSpinner";
import { IoChevronBack } from "react-icons/io5";
import { Navigate, NavLink } from "react-router";

interface Post {
  id: number;
  title: string;
  body: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [morePostsAvailable, setMorePostsAvailable] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchPosts = async (pageNum: number) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); //manually delaying a little
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
      );
      const data: Post[] = await response.json();

      if (page === 1) {
        setPosts(data);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...data]);
      }
      setMorePostsAvailable(data.length > 0); //checking if more data is available
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(posts.length);

  const lastPostObserver = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && morePostsAvailable) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, morePostsAvailable]
  );

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div>
        <NavLink to="/">
          <IoChevronBack className="text-[#f35742] text-xl" />
        </NavLink>
      </div>
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">
        Posts
      </h1>
      <div className="space-y-4">
        {posts.map((post, i) => (
          <div
            key={i}
            ref={i === posts.length - 1 ? lastPostObserver : null}
            className="border border-[#f35742] p-4 rounded-lg shadow"
          >
            <h2 className="text-lg font-semibold text-gray-700">
              {post.title}
            </h2>
            <p className="text-gray-700">{post.body}</p>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-center mt-4">
          <span className="text-gray-500">
            <LoadingSpinner />
          </span>
        </div>
      )}
    </div>
  );
};

export default Posts;
