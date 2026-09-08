import './globals.css'

type Metadata = {
  title?: string
  description?: string
  generator?: string
  icons?: {
    icon?: Array<{
      url: string
      media?: string
      type?: string
    }>
    apple?: string
  }
}

type Viewport = {
  colorScheme?: string
  themeColor?: Array<{
    media?: string
    color?: string
  }>
}

export const metadata: Metadata = {
  title: 'Rizal Abdurrakhman Wakhid — Fullstack Developer',
  description: 'Portfolio of Rizal Abdurrakhman Wakhid, a fullstack developer and product designer building thoughtful digital experiences.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="bg-background">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
