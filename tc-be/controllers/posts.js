import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
	try {
		const postMessagesArray = await PostMessage.find()

		// res.status(200).json(postMessagesArray)
		console.log(req.body)
		res.status(200).json({
			total_messages: postMessagesArray.length,
			messages: postMessagesArray,
		})
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

export const createPost = async (req, res) => {
	const post = new PostMessage(req.body)

	try {
		const newPost = await post.save()
		res.status(201).json(newPost)
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}
