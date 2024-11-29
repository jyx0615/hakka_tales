import axios from 'axios';

// import { env } from './env';

const client = axios.create({
  // baseURL: env.VITE_API_URL,
  baseURL: 'https://api.hakka.rice9547.org/api/',
});

export function getStories() {
  return client.get('/story');
}

export function getStoryById(bookIndex) {
  return client.get(`/story/${bookIndex}`);
}

export function getCategories() {
  return client.get('/category');
}

getStories().then((res) => {
  console.log(res.data);
});

getStoryById(1).then((res) => {
  console.log(res.data);
});

getCategories().then((res) => {
  console.log(res.data);
});
