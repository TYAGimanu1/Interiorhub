// lib/utils.js

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  
  // 2. Fallback for local development
  // This ensures API calls work when running 'npm run dev' locally
  return 'http://localhost:3000';
};