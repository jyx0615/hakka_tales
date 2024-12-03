export const env = {
  VITE_BACKEND_API_URL: import.meta.env.VITE_BACKEND_API_URL,
  VITE_AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN,
  VITE_AUTH0_CLIENT_ID: import.meta.env.VITE_AUTH0_CLIENT_ID,
  VITE_AUTH0_AUDIENCE: import.meta.env.VITE_AUTH0_AUDIENCE,
};

if (env.VITE_BACKEND_API_URL === undefined) {
  throw new Error('BACKEND_API_URL is undefined');
}

if (env.VITE_AUTH0_DOMAIN === undefined) {
  throw new Error('VITE_AUTH0_DOMAIN is undefined');
}

if (env.VITE_AUTH0_CLIENT_ID === undefined) {
  throw new Error('VITE_AUTH0_CLIENT_ID is undefined');
}

if (env.VITE_AUTH0_AUDIENCE === undefined) {
  throw new Error('VITE_AUTH0_AUDIENCE is undefined');
}
