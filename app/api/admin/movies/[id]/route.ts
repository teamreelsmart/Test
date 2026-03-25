import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Movie from '@/models/Movie'
import { getAdminFromCookie } from '@/lib/auth'

// Get single movie
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookie()
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()
    const { id } = await params

    const movie = await Movie.findById(id).lean()

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

// Update movie
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookie()
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()
    const { id } = await params
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

    // Generate new slug if title changed
    let slug
    if (title) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

      // Check if new slug conflicts with another movie
      const existingMovie = await Movie.findOne({ slug, _id: { $ne: id } })
      if (existingMovie) {
        return NextResponse.json(
          { error: 'A movie with this title already exists' },
          { status: 400 }
        )
      }
    }

    const updateData: Record<string, unknown> = {}
    if (title) updateData.title = title
    if (slug) updateData.slug = slug
    if (description) updateData.description = description
    if (releaseYear) updateData.releaseYear = parseInt(releaseYear)
    if (imdbRating !== undefined) updateData.imdbRating = parseFloat(imdbRating)
    if (genre) updateData.genre = Array.isArray(genre) ? genre : [genre]
    if (language) updateData.language = language
    if (type) updateData.type = type
    if (poster) updateData.poster = poster
    if (screenshots) updateData.screenshots = screenshots
    if (downloadLinks) updateData.downloadLinks = downloadLinks

    const movie = await Movie.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean()

    if (!movie) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ movie })
  } catch (error) {
    console.error('Error updating movie:', error)
    return NextResponse.json(
      { error: 'Failed to update movie' },
      { status: 500 }
    )
  }
}

// Delete movie
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookie()
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()
    const { id } = await params

    const movie = await Movie.findByIdAndDelete(id)

    if (!movie) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting movie:', error)
    return NextResponse.json(
      { error: 'Failed to delete movie' },
      { status: 500 }
    )
  }
}
