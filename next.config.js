/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 0,
  typescript: {
    tsconfigPath: './tsconfig.json'
  }
};

module.exports = nextConfig;
