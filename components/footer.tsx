import Link from 'next/link'
import { Film, Send, Code } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Film className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">CineNest</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your ultimate destination for movies and series. Stream and download your favorite content.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Browse Movies
              </Link>
              <Link href="/request" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Request Movie
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect With Us</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://t.me/TheOrviX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Send className="h-4 w-4" />
                @TheOrviX
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Code className="h-4 w-4" />
                Developed by @TheOrviZ
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CineNest. All rights reserved.</p>
          <p className="mt-1">
            Join our Telegram:{' '}
            <a
              href="https://t.me/TheOrviX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @TheOrviX
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
