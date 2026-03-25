import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Movie from '@/models/Movie'
import { getAdminFromCookie } from '@/lib/auth'

// Add new movie
export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminFromCookie()
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()

    const body = await request.json()
    const {
      title,
      description,
      releaseYear,
      imdbRating,
      genre,
      language,
      type,
      poster,
      screenshots,
      downloadLinks,
    } = body

    // Validate required fields
    if (!title || !description || !releaseYear || !genre || !language || !poster) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    // Check if slug exists
    const existingMovie = await Movie.findOne({ slug })
    if (existingMovie) {
      return NextResponse.json(
        { error: 'A movie with this title already exists' },
        { status: 400 }
      )
    }

    const movie = await Movie.create({
      title,
      slug,
      description,
      releaseYear: parseInt(releaseYear),
      imdbRating: parseFloat(imdbRating) || 0,
      genre: Array.isArray(genre) ? genre : [genre],
      language,
      type: type || 'movie',
      poster,
      screenshots: screenshots || [],
      downloadLinks: downloadLinks || [],
    })

    return NextResponse.json({ movie }, { status: 201 })
  } catch (error) {
    console.error('Error creating movie:', error)
    return NextResponse.json(
      { error: 'Failed to create movie' },
      { status: 500 }
    )
  }
}

// Get all movies for admin (with more details)
export async function GET() {
  try {
    const admin = await getAdminFromCookie()
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()

    const movies = await Movie.find({})
      .sort({ createdAt: -1 })
      .lean()

    const total = await Movie.countDocuments()

    return NextResponse.json({ movies, total })
  } catch (error) {
    console.error('Error fetching movies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    )
  }
}
