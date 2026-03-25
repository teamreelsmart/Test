import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IRequest extends Document {
  movieName: string
  year?: number
  language?: string
  screenshot?: string
  status: 'pending' | 'completed'
  createdAt: Date
  updatedAt: Date
}

const RequestSchema = new Schema<IRequest>(
  {
    movieName: {
      type: String,
      required: [true, 'Movie name is required'],
      trim: true,
    },
    year: {
      type: Number,
    },
    language: {
      type: String,
    },
    screenshot: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

const Request: Model<IRequest> =
  mongoose.models.Request || mongoose.model<IRequest>('Request', RequestSchema)

export default Request
