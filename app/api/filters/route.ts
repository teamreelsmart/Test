import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Movie from '@/models/Movie'

export async function GET() {
  try {
    await dbConnect()

    const [genres, languages, years] = await Promise.all([
      Movie.distinct('genre'),
      Movie.distinct('language'),
      Movie.distinct('releaseYear'),
    ])

    return NextResponse.json({
      genres: genres.sort(),
      languages: languages.sort(),
      years: years.sort((a: number, b: number) => b - a),
    })
  } catch (error) {
    console.error('Error fetching filters:', error)
    return NextResponse.json(
      { error: 'Failed to fetch filters' },
      { status: 500 }
    )
  }
}
