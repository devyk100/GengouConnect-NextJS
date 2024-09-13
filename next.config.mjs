import removeImports from 'next-remove-imports';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      hostname: 'gengou-bucket.817c5692c2feefe1b588ca939ec4a599.r2.cloudflarestorage.com',
    }],
    dangerouslyAllowSVG: true
  }
};

// Apply the removeImports plugin
const withRemoveImports = removeImports();

export default withRemoveImports({
  ...nextConfig,
});