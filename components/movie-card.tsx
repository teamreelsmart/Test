'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MovieCardProps {
  movie: {
    _id: string
    title: string
    slug: string
    poster: string
    releaseYear: number
    imdbRating: number
    type: 'movie' | 'series'
    genre?: string[]
  }
  className?: string
}

export default function MovieCard({ movie, className }: MovieCardProps) {
  return (
    <Link
      href={`/movie/${movie.slug}`}
      target="_blank"
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg bg-card transition-all duration-300 hover:scale-[1.02] hover:ring-2 hover:ring-primary/50',
        className
      )}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <Image
          src={movie.poster}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg">
            <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
          </div>
        </div>

        {/* Type Badge */}
        <div className="absolute right-2 top-2 rounded bg-background/80 px-2 py-1 text-xs font-medium uppercase backdrop-blur-sm">
          {movie.type}
        </div>

        {/* Rating */}
        {movie.imdbRating > 0 && (
          <div className="absolute left-2 top-2 flex items-center gap-1 rounded bg-background/80 px-2 py-1 backdrop-blur-sm">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="text-xs font-medium">{movie.imdbRating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-tight group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{movie.releaseYear}</span>
          {movie.genre && movie.genre.length > 0 && (
            <>
              <span className="text-border">|</span>
              <span className="truncate">{movie.genre[0]}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
