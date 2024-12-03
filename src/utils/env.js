export const env = {
    VITE_BACKEND_API_URL: import.meta.env.VITE_BACKEND_API_URL,
};
  
if (env.VITE_BACKEND_API_URL === undefined) {
    throw new Error('BACKEND_API_URL is undefined');
}
  