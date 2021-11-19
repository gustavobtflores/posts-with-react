import "./reset.css";

import { PostCard } from "../../components/PostCard";

import { useState, useEffect } from "react";
import { loadPosts } from "../../utils/loadPosts";
import { Button } from "../../components/Button";

function Home() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const postsPerPage = 4;

  useEffect(() => {
    const loadData = async () => {
      const postsAndPhotos = await loadPosts();
      setPosts(postsAndPhotos.slice(0, postsPerPage));
      setAllPosts(postsAndPhotos);
    };

    loadData();
  }, []);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    setPosts((posts) => [...posts, ...nextPosts]);
    setPage(nextPage);
  };

  return (
    <>
      <PostCard posts={posts} />
      <Button
        text="Load more posts"
        onClick={() => {
          loadMorePosts();
        }}
      />
    </>
  );
}

export default Home;
