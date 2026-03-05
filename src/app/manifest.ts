import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Somatic Stroop Test',
    short_name: 'Stroop Test',
    description: 'A clinical Neuropsychology assessment tool for attentional bias.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F2EC',
    theme_color: '#1A1814',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
