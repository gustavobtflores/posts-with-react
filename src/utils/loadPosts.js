import axios from "axios";

export const loadPosts = async () => {
  const postsResponse = await axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
      return res.data;
    });

  const photosResponse = await axios
    .get("https://jsonplaceholder.typicode.com/photos")
    .then((res) => {
      return res.data;
    });

  const postsAndPhotos = postsResponse.map((post, index) => {
    return { ...post, cover: photosResponse[index].url };
  });

  return postsAndPhotos;
};
