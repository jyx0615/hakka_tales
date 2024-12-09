import axios from 'axios';

import { env } from './env';

const client = axios.create({
  baseURL: env.VITE_BACKEND_API_URL,
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

export function getQuizById(bookIndex) {
  return client.get(`/story/${bookIndex}/exercise`);
}

export function getQuizzes() {
  return client.get('/exercise');
}

export function getAnswerById(bookIndex, exerciseIndex, type, answers) {
  return client.post(`/story/${bookIndex}/exercise/${exerciseIndex}`, {
    type,
    answers,
  });
}

// getStories().then((res) => {
//   console.log(res.data);
// });

// getStoryById(1).then((res) => {
//   console.log(res.data);
// });

// getCategories().then((res) => {
//   console.log(res.data);
// });

// getQuizById(2).then((res) => {
//   console.log(res.data);
// });

// getQuizzes().then((res) => {
//   console.log(res.data);
// });
