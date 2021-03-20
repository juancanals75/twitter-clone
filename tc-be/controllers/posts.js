import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
	try {
		const postMessagesArray = await PostMessage.find()

		res.status(200).json(postMessagesArray)
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

export const createPost = async (req, res) => {
	const post = req.body

	const newPost = new PostMessage(post)

	try {
		await newPost.save()

		res.status(201).json(newPost)
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
	res.send('Se está creando algo')
}
