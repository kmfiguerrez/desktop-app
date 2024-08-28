/** @type {import('next').NextConfig} */

/*
  Have to set up the missingSuspenseWithCSRBailout because of the used of 
  useSearchParam in the current version of nextjs.
  See: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
*/
const nextConfig = {
  output: "export",
  distDir: "dist",
  experimental: {
    missingSuspenseWithCSRBailout: false
  }
};

export default nextConfig;
