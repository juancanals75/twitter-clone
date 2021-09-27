import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import serverless from 'serverless-http'

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
	.connect('mongodb://localhost:27017', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(PORT, () =>
			console.log(`Server is running on port: ${PORT}`)
		)
	)
	.catch(error => console.log(`CONNECTION ERROR: ${error.message}`))

mongoose.set('useFindAndModify', false)

module.exports.handler = serverless(app)
