import removeImports from 'next-remove-imports';

/** @type {import('next').NextConfig} */
const nextConfig = {};

// Apply the removeImports plugin
const withRemoveImports = removeImports();

export default withRemoveImports({
  ...nextConfig,
});
