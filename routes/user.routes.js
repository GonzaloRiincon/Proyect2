const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const fileUploader = require('../middlewares/cloudinary.middleware');
const { checkFields, checkFieldsEdit } = require('../middlewares/auth-guard');
const { checkIfAdmin } = require('../utils/checkIfAdmin');
const { checkIfOwn } = require('../utils/checkIfOwn');
const { isLoggedIn, checkRole, ADMINorOwn } = require('../middlewares/route-guard');

router.get('/list', isLoggedIn, (req, res, next) => {

    User
        .find()
        .then(user => res.render('user/users-list', { user }))
        .catch(err => next(err))
})

router.get('/profile/edit/:id', isLoggedIn, ADMINorOwn, (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(user => res.render('user/edit-user', user))
        .catch(err => next(err))
})

router.post('/profile/edit/:id', fileUploader.single('avatar'), checkFieldsEdit, isLoggedIn, ADMINorOwn, (req, res, next) => {
    let avatar
    const { id } = req.params
    const { email, username } = req.body
    req.file ? avatar = req.file.path : avatar = undefined

    User
        .findByIdAndUpdate(id, { email, username, avatar })
        .then(() => res.redirect(`/user/profile/${id}`))
        .catch(err => next(err))
})

router.get('/profile/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(user => {
            const isAdmin = checkIfAdmin(req.session.currentUser.role)
            const isOwn = checkIfOwn(req.session.currentUser, user)
            res.render('user/profile', { user, isAdmin, isOwn })
        })
        .catch(err => next(err))
})

router.post('/delete/:id', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/user/list'))
        .catch(err => next(err))
})

router.post('/:role/:id', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
    const { role, id } = req.params

    User
        .findByIdAndUpdate(id, { role })
        .then(() => res.redirect('/user/list'))
        .catch(err => next(err))
})

module.exports = router;
