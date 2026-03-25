import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Admin from '@/models/Admin'

// This route creates the initial admin user
// Access it once at /api/setup to create the admin
// Default credentials: admin / admin123

export async function GET() {
  try {
    await dbConnect()

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' })
    
    if (existingAdmin) {
      return NextResponse.json({
        message: 'Admin user already exists',
        username: 'admin',
        hint: 'Use /admin/login to sign in',
      })
    }

    // Create default admin user
    await Admin.create({
      username: 'admin',
      password: 'admin123', // Will be hashed by the model
    })

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully!',
      credentials: {
        username: 'admin',
        password: 'admin123',
      },
      warning: 'Please change the password after first login!',
      loginUrl: '/admin/login',
    })
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json(
      { error: 'Failed to setup admin user' },
      { status: 500 }
    )
  }
}
