const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const Driver = require('../models/Driver.model')
const ApiService = require('../services/drivers.service')
const driverService = new ApiService()
const fileUploader = require('../middlewares/cloudinary.middleware');
const { checkFields, checkFieldsEdit } = require('../middlewares/auth-guard');
const { checkIfAdmin } = require('../utils/checkIfAdmin');
const { checkIfOwn } = require('../utils/checkIfOwn');
const { isLoggedIn, checkRole, ADMINorOwn } = require('../middlewares/route-guard');
const capitalize = require('../utils/capitalize');


router.get('/list', isLoggedIn, (req, res, next) => {

    User
        .find()
        .select('avatar username email')
        .sort({ username: 1 })
        .then(users => res.render('user/users-list', { users }))
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

    let avatar = req.file?.path
    const { id } = req.params
    const { email, username } = req.body
    const newUsername = capitalize(username)

    User
        .findByIdAndUpdate(id, { email, username: newUsername, avatar })
        .then(() => res.redirect(`/user/profile/${id}`))
        .catch(err => next(err))
})

router.get('/profile/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params;

    User.findById(id)
        .populate('draftInfo.draft')
        .then((user) => {
            const actualizedPoints = user.draftInfo.draft.reduce((totalPoints, draftItem) => totalPoints + draftItem.points, 0);

            return User.findByIdAndUpdate(id, { $set: { 'draftInfo.totalPoints': actualizedPoints } }, { new: true })
                .populate('draftInfo.draft');
        })
        .then((user) => {
            const isAdmin = checkIfAdmin(req.session.currentUser.role);
            const isOwn = checkIfOwn(req.session.currentUser, user);
            res.render('user/profile', { user, isAdmin, isOwn });
        })
        .catch((err) => next(err));
});

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

module.exports = router