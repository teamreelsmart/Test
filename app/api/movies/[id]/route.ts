import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Movie from '@/models/Movie'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()
    const { id } = await params

    // Try to find by slug first, then by _id
    let movie = await Movie.findOne({ slug: id }).lean()
    
    if (!movie) {
      movie = await Movie.findById(id).lean()
    }

    if (!movie) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ movie })
  } catch (error) {
    console.error('Error fetching movie:', error)
    return NextResponse.json(
      { error: 'Failed to fetch movie' },
      { status: 500 }
    )
  }
}
