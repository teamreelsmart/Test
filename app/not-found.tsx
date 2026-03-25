import Link from 'next/link'
import { Film, Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
          <Film className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mb-2 text-4xl font-bold">404</h1>
        <h2 className="mb-4 text-xl text-muted-foreground">Page Not Found</h2>
        <p className="mb-8 max-w-md text-muted-foreground">
          {"The page you're looking for doesn't exist or has been moved. Let's get you back on track."}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              Browse Movies
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
