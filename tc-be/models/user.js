import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
	username: String,
	password: String,
	picture_url: String,
	bio: String,
	follower_count: Number,
	created_at: { type: Date, default: Date.now },
	default_side: String,
	followers: Array,
})

const User = mongoose.model('User', userSchema)

export default User
