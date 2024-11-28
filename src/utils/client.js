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

export function getPages(bookIndex) {
  return client.get(`/story/${bookIndex}/pages`);
}

export function createStory(bookIndex, input) {
  return client.get(`/story/${bookIndex}`, input);
}

export function updateStory(bookIndex, input) {
  return client.post(`/story/${bookIndex}`, input);
}

export function deleteStory(bookIndex) {
  return client.delete(`/story/${bookIndex}`);
}

export function createPage(bookIndex, pageNumber, input) {
  return client.post(`/story/${bookIndex}/page/${pageNumber}`, input);
}

export function updatePage(bookIndex, pageNumber, input) {
  return client.put(`/story/${bookIndex}/page/${pageNumber}`, input);
}

export function deletePage(bookIndex, pageNumber) {
  return client.delete(`/story/${bookIndex}/page/${pageNumber}`);
}

getStories().then((res) => {
  console.log(res.data);
});

getStoryById(1).then((res) => {
  console.log(res.data);
});
