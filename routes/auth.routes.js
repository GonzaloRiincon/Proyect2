const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const saltRounds = 10
const fileUploader = require('../middlewares/cloudinary.middleware')
const { checkFields } = require('../middlewares/auth-guard')



router.get("/signup", (req, res, next) => {
    res.render("auth/register", { layout: false })
})

router.post('/signup', fileUploader.single('avatar'), checkFields, (req, res, next) => {

    let avatar = req.file?.path
    const { username, email, userPwd } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPwd, salt))
        .then(hashedPassword => User.create({ username, email, userPwd, avatar, password: hashedPassword }))
        .then(() => res.redirect('/'))
        .catch(error => next(error))
})

router.get('/login', (req, res, next) => {
    res.render('auth/login', { layout: false })
})


router.post('/login', (req, res, next) => {

    const { email, userPwd } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email not found please register to join', email })
                return
            } else if (bcrypt.compareSync(userPwd, user.password) === false) {
                res.render('auth/login', { errorMessage: 'Incorrect email/password', email })
                return
            } else {
                req.session.currentUser = user
                res.redirect(`/user/profile/${user._id}`)
            }
        })
        .catch(error => next(error))
})

router.get('/logout', (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router