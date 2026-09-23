import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hamro Yatra Adventure - Scorpio Jeep Hire, Nepal Tours & Trekking',
    short_name: 'Hamro Yatra',
    description: 'Scorpio jeep hire Pokhara, car rental, Nepal trekking packages, tour booking & adventure activities – 26+ years experience',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ea580c',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
