import axios from 'axios';

const loadPosts = async () => {
  const postsResponse = await axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.data);

  const photosResponse = await axios
    .get('https://jsonplaceholder.typicode.com/photos')
    .then((res) => res.data);

  const postsAndPhotos = postsResponse.map((post, index) => ({
    ...post,
    cover: photosResponse[index].url,
  }));

  return postsAndPhotos;
};

export default loadPosts;
