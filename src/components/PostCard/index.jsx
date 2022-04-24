import styled from 'styled-components';

const PostsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

const Post = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const PostTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const PostBody = styled.p``;

const PostCover = styled.img`
  max-width: 100%;
`;

function PostCard({ posts }) {
  return (
    <PostsWrapper>
      {posts.map((post) => (
        <Post key={post.id}>
          <PostCover src={post.cover} alt={post.title} />
          <PostTitle>{post.title}</PostTitle>
          <PostBody>{post.body}</PostBody>
        </Post>
      ))}
    </PostsWrapper>
  );
}

export default PostCard;
