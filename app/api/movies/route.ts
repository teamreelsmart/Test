import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Movie from '@/models/Movie'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const genre = searchParams.get('genre') || ''
    const year = searchParams.get('year') || ''
    const language = searchParams.get('language') || ''
    const type = searchParams.get('type') || ''

    // Build query
    const query: Record<string, unknown> = {}

    if (search) {
      query.title = { $regex: search, $options: 'i' }
    }

    if (genre) {
      query.genre = { $in: [genre] }
    }

    if (year) {
      query.releaseYear = parseInt(year)
    }

    if (language) {
      query.language = { $regex: language, $options: 'i' }
    }

    if (type && (type === 'movie' || type === 'series')) {
      query.type = type
    }

    const skip = (page - 1) * limit

    const [movies, total] = await Promise.all([
      Movie.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Movie.countDocuments(query),
    ])

    return NextResponse.json({
      movies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching movies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    )
  }
}
