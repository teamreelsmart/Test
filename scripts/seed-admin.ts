// Run with: npx ts-node scripts/seed-admin.ts
// Or via API route for easier setup

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const MONGODB_URI = process.env.MONGODB_URI!

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true })

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ username: 'admin' })
    if (existingAdmin) {
      console.log('Admin user already exists')
      process.exit(0)
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)
    await Admin.create({
      username: 'admin',
      password: hashedPassword,
    })

    console.log('Admin user created successfully!')
    console.log('Username: admin')
    console.log('Password: admin123')
    console.log('\nPlease change the password after first login!')
  } catch (error) {
    console.error('Error seeding admin:', error)
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
}

seedAdmin()
