import { NextResponse } from 'next/server'
import { getAdminFromCookie } from '@/lib/auth'

export async function GET() {
  try {
    const admin = await getAdminFromCookie()

    if (!admin) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    return NextResponse.json({
      authenticated: true,
      admin: {
        id: admin.adminId,
        username: admin.username,
      },
    })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    )
  }
}
