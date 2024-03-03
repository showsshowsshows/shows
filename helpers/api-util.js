import { connectDb } from './db-util'
import Show from '@/models/show-model'
export async function fetchFeaturedShows () {
  try {
    await connectDb()

    let today = new Date()
    today.setHours(0, 0, 0, 0)

    let yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const featuredShows = await Show.find({
      isFeatured: true,
      date: { $gt: yesterday }
    })
      .sort({ date: 1 })
      .exec()

    return featuredShows
  } catch (error) {
    console.error('Error fetching featured shows:', error)
    throw new Error('Failed to fetch featured shows')
  }
}

export async function fetchAllShows () {
  try {
    await connectDb()

    let today = new Date()
    today.setHours(0, 0, 0, 0)

    let yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const shows = await Show.find({
      date: { $gte: yesterday }
    })
      .sort({ date: 1 })
      .limit(500)
      .exec()

    return shows
  } catch (error) {
    console.error('Error in getAllShows:', error)
    throw new Error('Internal Server Error')
  }
}

export async function getShowById (id) {
  try {
    const connection = await connectDb()
    const show = await Show.findById(id)
    return show
  } catch (error) {
    console.error('Error in getShowById:', error)
    throw new Error('Internal Server Error')
  }
}
