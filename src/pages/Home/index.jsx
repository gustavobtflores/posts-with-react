import "./reset.css";

import { PostCard } from "../../components/PostCard";

import { useState, useEffect } from "react";
import { loadPosts } from "../../utils/loadPosts";
import { Button } from "../../components/Button";

import styled from "styled-components";
import { TextInput } from "../../components/TextInput";

const PostsContainer = styled.section`
  padding: 16px;
`;

const Heading = styled.h1`
  font-size: 3rem;
  line-height: 1.25em;
`;

function Home() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const postsPerPage = 10;
  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

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

  const handleSearchInput = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <PostsContainer>
      {!!searchValue && <h1>Search value: {searchValue}</h1>}
      <TextInput searchValue={searchValue} handleChange={handleSearchInput} />
      <br />
      <br />
      {filteredPosts.length > 0 && <PostCard posts={filteredPosts} />}
      {filteredPosts.length === 0 && <Heading>No posts found</Heading>}

      {!searchValue && (
        <Button
          text="Load more posts"
          onClick={() => {
            loadMorePosts();
          }}
          disabled={posts.length === allPosts.length}
        />
      )}
    </PostsContainer>
  );
}

export default Home;
