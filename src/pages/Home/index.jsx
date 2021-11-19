import "./reset.css";

import { PostCard } from "../../components/PostCard";

import { useState, useEffect } from "react";
import { loadPosts } from "../../utils/loadPosts";
import { Button } from "../../components/Button";

import styled from "styled-components";

const PostsContainer = styled.section`
  padding: 16px;
`;

function Home() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const postsPerPage = 10;

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
    <PostsContainer>
      <input type="text" />
      <br />
      <br />

      <PostCard posts={posts} />
      <Button
        text="Load more posts"
        onClick={() => {
          loadMorePosts();
        }}
        disabled={posts.length === allPosts.length}
      />
    </PostsContainer>
  );
}

export default Home;
