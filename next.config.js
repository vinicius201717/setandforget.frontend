/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

module.exports = {
  images: {
    domains: ['media.api-sports.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.tradingview.com',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
      },
    ],
  },
  trailingSlash: true,
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(
        __dirname,
        './node_modules/apexcharts-clevision',
      ),
    }

    return config
  },
}
