import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Indian Institute of Metals • Bhubaneswar Chapter',
    short_name: 'IIM Bhubaneswar',
    description: 'Official portal of The Indian Institute of Metals (IIM) Bhubaneswar Chapter.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0e1622',
    theme_color: '#994106',
    icons: [
      {
        src: '/assets/images/logo1.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
