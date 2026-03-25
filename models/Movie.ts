import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IDownloadLink {
  quality: '480p' | '720p' | '1080p' | '4K'
  size: string
  link: string
}

export interface IMovie extends Document {
  title: string
  slug: string
  description: string
  releaseYear: number
  imdbRating: number
  genre: string[]
  language: string
  type: 'movie' | 'series'
  poster: string
  screenshots: string[]
  downloadLinks: IDownloadLink[]
  createdAt: Date
  updatedAt: Date
}

const DownloadLinkSchema = new Schema<IDownloadLink>({
  quality: {
    type: String,
    enum: ['480p', '720p', '1080p', '4K'],
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
})

const MovieSchema = new Schema<IMovie>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    releaseYear: {
      type: Number,
      required: [true, 'Release year is required'],
    },
    imdbRating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    genre: {
      type: [String],
      required: [true, 'At least one genre is required'],
    },
    language: {
      type: String,
      required: [true, 'Language is required'],
    },
    type: {
      type: String,
      enum: ['movie', 'series'],
      default: 'movie',
    },
    poster: {
      type: String,
      required: [true, 'Poster URL is required'],
    },
    screenshots: {
      type: [String],
      default: [],
    },
    downloadLinks: {
      type: [DownloadLinkSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

// Create slug from title before saving
MovieSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }
  next()
})

const Movie: Model<IMovie> =
  mongoose.models.Movie || mongoose.model<IMovie>('Movie', MovieSchema)

export default Movie
