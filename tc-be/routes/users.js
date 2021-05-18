import express from 'express'

import {
	createNewUser,
	loginValidation,
	passwordChange,
} from '../controllers/users.js'

const router = express.Router()

router.post('/new-user', createNewUser)
router.post('/login', loginValidation)
router.post('/password-change', passwordChange)

export default router
