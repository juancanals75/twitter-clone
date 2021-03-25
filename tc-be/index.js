import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import postRoutes from './routes/posts.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/posts', postRoutes)

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
