import User from '../models/user.js'

export const createNewUser = async (req, res) => {
	const user = new User(req.body)

	try {
		const existingUsername = await User.findOne({
			username: user.username,
		})
		if (existingUsername) {
			throw new Error('Username already taken')
		} else {
			const newUser = await user.save()
			res.status(201).json({
				message: 'User created succesfully',
			})
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		})
	}
}

export const loginValidation = async (req, res) => {
	try {
		const user = await User.findOne({
			username: req.body.username,
		})
		if (user.password === req.body.password) {
			res.status(200).json({
				message: 'Succesful login',
			})
		} else {
			throw new Error('Incorrect password')
		}
	} catch (error) {
		res.status(400).json({
			message: error.message,
		})
	}
}

export const passwordChange = async (req, res) => {
	try {
		const user = await User.findOne({
			username: req.body.username,
		})
		if (req.body.old_password === user.password) {
			user.password = req.body.new_password
			await User.findOneAndUpdate(
				{
					username: req.body.username,
				},
				{
					password: req.body.new_password,
				}
			)
			res.status(200).json({
				message: 'Password changed succesfully',
			})
		} else {
			throw new Error(
				"Old password didn't match with the current password"
			)
		}
	} catch (error) {
		res.status(400).json({
			message: error.message,
		})
	}
}
