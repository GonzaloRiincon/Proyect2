const express = require('express')
const router = express.Router()
const fileUploader = require('../middlewares/cloudinary.middleware')
const { checkFields } = require('../middlewares/auth-guard')
const { getSignUp, postSignUp, getLogin, postLogin, logout } = require('../controllers/auth.controller')

router.get("/signup", getSignUp)
router.post('/signup', fileUploader.single('avatar'), checkFields, postSignUp)
router.get('/login', getLogin)
router.post('/login', postLogin)
router.get('/logout', logout)

module.exports = router