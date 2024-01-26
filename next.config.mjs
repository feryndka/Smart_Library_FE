/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    'MYSQL_HOST': 'localhost',
    'MYSQL_PORT': '8111',
    'MYSQL_DATABASE': 'smart_library',
    'MYSQL_USER': 'root',
    'MYSQL_PASSWORD': ''
  }
};

export default nextConfig;
