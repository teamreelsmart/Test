import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Request from '@/models/Request'

// Create new request (public)
export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const body = await request.json()
    const { movieName, year, language, screenshot } = body

    if (!movieName) {
      return NextResponse.json(
        { error: 'Movie name is required' },
        { status: 400 }
      )
    }

    const newRequest = await Request.create({
      movieName,
      year: year ? parseInt(year) : undefined,
      language,
      screenshot,
      status: 'pending',
    })

    return NextResponse.json({ request: newRequest }, { status: 201 })
  } catch (error) {
    console.error('Error creating request:', error)
    return NextResponse.json(
      { error: 'Failed to create request' },
      { status: 500 }
    )
  }
}
