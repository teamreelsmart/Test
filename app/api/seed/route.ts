import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Movie from '@/models/Movie'

// Sample movies for testing
const sampleMovies = [
  {
    title: 'Inception',
    slug: 'inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    releaseYear: 2010,
    imdbRating: 8.8,
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    language: 'English',
    type: 'movie',
    poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    screenshots: [],
    downloadLinks: [
      { quality: '720p', size: '1.2 GB', link: 'https://stream-render.onrender.com/watch/inception-720' },
      { quality: '1080p', size: '2.5 GB', link: 'https://stream-render.onrender.com/watch/inception-1080' },
    ],
  },
  {
    title: 'The Dark Knight',
    slug: 'the-dark-knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    releaseYear: 2008,
    imdbRating: 9.0,
    genre: ['Action', 'Crime', 'Drama'],
    language: 'English',
    type: 'movie',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
    screenshots: [],
    downloadLinks: [
      { quality: '720p', size: '1.4 GB', link: 'https://stream-render.onrender.com/watch/dark-knight-720' },
      { quality: '1080p', size: '2.8 GB', link: 'https://stream-render.onrender.com/watch/dark-knight-1080' },
      { quality: '4K', size: '8.5 GB', link: 'https://stream-render.onrender.com/watch/dark-knight-4k' },
    ],
  },
  {
    title: 'Interstellar',
    slug: 'interstellar',
    description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    releaseYear: 2014,
    imdbRating: 8.7,
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    language: 'English',
    type: 'movie',
    poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    screenshots: [],
    downloadLinks: [
      { quality: '720p', size: '1.6 GB', link: 'https://stream-render.onrender.com/watch/interstellar-720' },
      { quality: '1080p', size: '3.2 GB', link: 'https://stream-render.onrender.com/watch/interstellar-1080' },
    ],
  },
  {
    title: 'Breaking Bad',
    slug: 'breaking-bad',
    description: 'A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family\'s future.',
    releaseYear: 2008,
    imdbRating: 9.5,
    genre: ['Crime', 'Drama', 'Thriller'],
    language: 'English',
    type: 'series',
    poster: 'https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg',
    screenshots: [],
    downloadLinks: [
      { quality: '720p', size: '45 GB', link: 'https://stream-render.onrender.com/watch/breaking-bad-720' },
      { quality: '1080p', size: '90 GB', link: 'https://stream-render.onrender.com/watch/breaking-bad-1080' },
    ],
  },
  {
    title: 'Stranger Things',
    slug: 'stranger-things',
    description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
    releaseYear: 2016,
    imdbRating: 8.7,
    genre: ['Drama', 'Fantasy', 'Horror'],
    language: 'English',
    type: 'series',
    poster: 'https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    screenshots: [],
    downloadLinks: [
      { quality: '720p', size: '35 GB', link: 'https://stream-render.onrender.com/watch/stranger-things-720' },
      { quality: '1080p', size: '70 GB', link: 'https://stream-render.onrender.com/watch/stranger-things-1080' },
    ],
  },
  {
    title: 'Oppenheimer',
    slug: 'oppenheimer',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    releaseYear: 2023,
    imdbRating: 8.4,
    genre: ['Biography', 'Drama', 'History'],
    language: 'English',
    type: 'movie',
    poster: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg',
    screenshots: [],
    downloadLinks: [
      { quality: '720p', size: '2.1 GB', link: 'https://stream-render.onrender.com/watch/oppenheimer-720' },
      { quality: '1080p', size: '4.5 GB', link: 'https://stream-render.onrender.com/watch/oppenheimer-1080' },
      { quality: '4K', size: '15 GB', link: 'https://stream-render.onrender.com/watch/oppenheimer-4k' },
    ],
  },
  {
    title: 'Dune: Part Two',
    slug: 'dune-part-two',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    releaseYear: 2024,
    imdbRating: 8.6,
    genre: ['Action', 'Adventure', 'Drama'],
    language: 'English',
    type: 'movie',
    poster: 'https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
    screenshots: [],
    downloadLinks: [
      { quality: '720p', size: '1.8 GB', link: 'https://stream-render.onrender.com/watch/dune2-720' },
      { quality: '1080p', size: '3.8 GB', link: 'https://stream-render.onrender.com/watch/dune2-1080' },
    ],
  },
  {
    title: 'The Batman',
    slug: 'the-batman',
    description: 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city\'s hidden corruption and question his family\'s involvement.',
    releaseYear: 2022,
    imdbRating: 7.8,
    genre: ['Action', 'Crime', 'Drama'],
    language: 'English',
    type: 'movie',
    poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjctYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_.jpg',
    screenshots: [],
    downloadLinks: [
      { quality: '720p', size: '1.9 GB', link: 'https://stream-render.onrender.com/watch/the-batman-720' },
      { quality: '1080p', size: '4.0 GB', link: 'https://stream-render.onrender.com/watch/the-batman-1080' },
    ],
  },
  {
    title: 'Avatar: The Way of Water',
    slug: 'avatar-the-way-of-water',
    description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their home.',
    releaseYear: 2022,
    imdbRating: 7.6,
    genre: ['Action', 'Adventure', 'Fantasy'],
    language: 'English',
    type: 'movie',
    poster: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg',
    screenshots: [],
    downloadLinks: [
      { quality: '720p', size: '2.0 GB', link: 'https://stream-render.onrender.com/watch/avatar2-720' },
      { quality: '1080p', size: '4.2 GB', link: 'https://stream-render.onrender.com/watch/avatar2-1080' },
      { quality: '4K', size: '18 GB', link: 'https://stream-render.onrender.com/watch/avatar2-4k' },
    ],
  },
  {
    title: 'The Last of Us',
    slug: 'the-last-of-us',
    description: 'After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity\'s last hope.',
    releaseYear: 2023,
    imdbRating: 8.8,
    genre: ['Action', 'Adventure', 'Drama'],
    language: 'English',
    type: 'series',
    poster: 'https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_.jpg',
    screenshots: [],
    downloadLinks: [
      { quality: '720p', size: '12 GB', link: 'https://stream-render.onrender.com/watch/tlou-720' },
      { quality: '1080p', size: '25 GB', link: 'https://stream-render.onrender.com/watch/tlou-1080' },
    ],
  },
]

export async function GET() {
  try {
    await dbConnect()

    // Check if movies already exist
    const existingCount = await Movie.countDocuments()
    
    if (existingCount > 0) {
      return NextResponse.json({
        message: `Database already has ${existingCount} movies`,
        hint: 'Delete existing movies first if you want to reseed',
      })
    }

    // Insert sample movies
    await Movie.insertMany(sampleMovies)

    return NextResponse.json({
      success: true,
      message: `Successfully added ${sampleMovies.length} sample movies!`,
      movies: sampleMovies.map(m => m.title),
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { error: 'Failed to seed movies' },
      { status: 500 }
    )
  }
}
