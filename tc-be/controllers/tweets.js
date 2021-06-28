import Tweet from '../models/tweet.js'
import User from '../models/user.js'

export const getTweets = async (req, res) => {
	const page = parseInt(req.query.page) || 1
	const limit = parseInt(req.query.limit) || 10
	const coinSide = req.query.side
	const skipIndex = (page - 1) * limit

	try {
		const totalTweets = await Tweet.countDocuments()
		const totalPages = Math.ceil(totalTweets / limit)

		if (!coinSide) {
			throw new Error('You must specify a coin side')
		}

		if (page > totalPages) throw new Error("Page doesn't exist")

		const posts = await Tweet.find({ coin_side: coinSide })
			.limit(limit)
			.skip(skipIndex)
			.exec()
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

		if (!tweet.message || !tweet.username || !tweet.coin_side) {
			throw new Error('Missing information')
		}

		if (tweet.coin_side !== 'dark' && tweet.coin_side !== 'light') {
			throw new Error("Coin side can only be 'light' or 'dark'")
		}

		const usernameValidation = await User.findOne({
			username: tweet.username,
		})

		if (!usernameValidation) {
			throw new Error('Username does not exist')
		}

		await tweet.save()
		res.status(201).json({ message: 'message posted succesfully' })
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}
