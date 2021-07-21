import User from '../models/user.js'

export const createNewUser = async (req, res) => {
	const user = new User(req.body)
	try {
		// Check if the username contains uppercase or symbols
		if (/[^a-z0-9]+/.test(user.username)) {
			throw new Error(
				"username can't contain uppercase letters or symbols"
			)
		}

		if (
			(user.password.length < 5) |
			(user.password.length > 20) |
			user.password.includes(user.username)
		) {
			throw new Error(
				"password must be between 5 and 20 characters long and can't contain the username"
			)
		}
		const existingUsername = await User.findOne({
			username: user.username,
		})
		if (existingUsername) {
			throw new Error('Username already taken')
		}
		const newUser = await user.save()
		res.status(201).json({
			message: `User: ${newUser.username} was created succesfully`,
		})
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
		if (!user) throw new Error('Username not found.')
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
