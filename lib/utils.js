// lib/utils.js

export const getBaseUrl = () => {
  // 1. Use Vercel's built-in public variable (most reliable for Vercel)
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  
  // 2. Fallback to a custom public variable (if you set one)
  if (process.env.NEXT_PUBLIC_BASE_URL) {
      return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // 3. Fallback for local development
  return 'http://localhost:3000';
};