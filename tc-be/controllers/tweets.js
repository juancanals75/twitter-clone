import Tweet from '../models/tweet.js'

export const getTweets = async (req, res) => {
	try {
		const tweetsArray = await Tweet.find()

		res.status(200).json({
			total_messages: tweetsArray.length,
			messages: tweetsArray,
		})
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

export const createTweet = async (req, res) => {
	const tweet = new Tweet(req.body)

	try {
		const newTweet = await tweet.save()
		res.status(201).json(newTweet)
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}
