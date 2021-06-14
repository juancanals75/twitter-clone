import Tweet from '../models/tweet.js'

export const getTweets = async (req, res) => {
	const page = parseInt(req.query.page) || 1
	const limit = parseInt(req.query.limit) || 10
	const skipIndex = (page - 1) * limit

	try {
		const totalTweets = await Tweet.countDocuments()
		const totalPages = Math.ceil(totalTweets / limit)

		if (page > totalPages) throw new Error("Page doesn't exist")

		const posts = await Tweet.find().limit(limit).skip(skipIndex).exec()
		res.status(200).json({
			total_tweets: totalTweets,
			current_page: page,
			next_page: totalPages > page ? page + 1 : null,
			page_size: limit,
			results: posts,
		})
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

export const createTweet = async (req, res) => {
	const tweet = new Tweet(req.body)

	try {
		if (tweet.message.length > 200) {
			throw new Error("Post can't be longer than 200 characters")
		}

		await tweet.save()
		res.status(201).json({ message: 'message posted succesfully' })
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}
