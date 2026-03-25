import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
})
const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'CineNest - Movies & Series Streaming',
    template: '%s | CineNest',
  },
  description: 'Your ultimate destination for movies and series. Stream and download your favorite content. Developed by @TheOrviZ | Telegram: @TheOrviX',
  keywords: ['movies', 'series', 'streaming', 'download', 'watch online', 'CineNest'],
  authors: [{ name: '@TheOrviZ' }],
  creator: '@TheOrviZ',
  icons: {
    icon: 'https://i.ibb.co/ccdMS9JH/photo-2026-03-24-11-45-03-7620786835249168424.jpg',
    shortcut: 'https://i.ibb.co/ccdMS9JH/photo-2026-03-24-11-45-03-7620786835249168424.jpg',
    apple: 'https://i.ibb.co/ccdMS9JH/photo-2026-03-24-11-45-03-7620786835249168424.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cinenest.vercel.app',
    siteName: 'CineNest',
    title: 'CineNest - Movies & Series Streaming',
    description: 'Your ultimate destination for movies and series. Stream and download your favorite content.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CineNest - Movies & Series Streaming',
    description: 'Your ultimate destination for movies and series. Stream and download your favorite content.',
    creator: '@TheOrviZ',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
