// import express from 'serverless-express/express'
// import handler from 'serverless-express/handler'

import express from 'express'

import mongoose from 'mongoose'
import cors from 'cors'

import tweetRoutes from './routes/tweets.js'
import userRoutes from './routes/users.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/tweets', tweetRoutes)
app.use('', userRoutes)

const PORT = process.env.PORT || 5000

mongoose
	.connect(
		'mongodb+srv://admin:Jfcs19242204@cluster0.swtst.mongodb.net/test',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() =>
		app.listen(PORT, () =>
			console.log(`Server is running on port: ${PORT}`)
		)
	)
	.catch(error => console.log(`CONNECTION ERROR: ${error.message}`))

mongoose.set('useFindAndModify', false)

// app.get('/test', async (req, res) => {
// 	try {
// 		res.status(200).json('SUCCESS')
// 	} catch (error) {
// 		res.status(404).json({ message: error.message })
// 	}
// })

// export const handler = handler(app)
