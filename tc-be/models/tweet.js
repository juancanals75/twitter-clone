import mongoose from 'mongoose'

const tweetSchema = mongoose.Schema({
	message: String,
	created_at: Date,
	user_id: Number,
	coin_side: String,
	reply_count: Number,
	favorite_count: Number,
	media_id: Number,
})

const Tweet = mongoose.model('Tweet', tweetSchema)

export default Tweet
