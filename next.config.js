/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')();

const nextConfig = withNextIntl({
    reactStrictMode: false,
    images: {
        domains: ['res.cloudinary.com']
    }
})

module.exports = nextConfig