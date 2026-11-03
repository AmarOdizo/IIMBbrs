import type { NextConfig } from "next";
import os from "os";

function getNetworkIp(): string {
  const nets = os.networkInterfaces();
  let fallback: string | null = null;
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      const isIpv4 = net.family === 'IPv4' || (net.family as unknown as number) === 4;
      if (isIpv4 && !net.internal) {
        if (!net.address.startsWith('169.254') && !net.address.startsWith('192.168.137.')) {
          return net.address;
        }
        if (!fallback) fallback = net.address;
      }
    }
  }
  return fallback || '127.0.0.1';
}

if (process.env.NODE_ENV !== 'production') {
  const ip = getNetworkIp();
  const port = process.env.PORT || '3000';
  console.log('\n\x1b[1m\x1b[32m=================================================================\x1b[0m');
  console.log('\x1b[1m\x1b[32m  📱 MOBILE NETWORK URL: http://' + ip + ':' + port + '\x1b[0m');
  console.log('\x1b[1m\x1b[36m  🔐 ADMIN CONSOLE:     http://' + ip + ':' + port + '/admin\x1b[0m');
  console.log('\x1b[1m\x1b[32m=================================================================\x1b[0m\n');
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:path*.html',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
