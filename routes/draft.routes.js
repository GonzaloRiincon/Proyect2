const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const Driver = require('../models/Driver.model')
const { isLoggedIn } = require('../middlewares/route-guard');



router.post('/add/:driverId', isLoggedIn, (req, res, next) => {

    const { driverId } = req.params
    const { _id } = req.session.currentUser

    const promises = [Driver.find({ driverId }), User.findById(_id)]
    Promise
        .all(promises)
        .then(([[driver], user]) => {
            if (user.draftInfo.draft.length === 3) {
                res.render(`user/profile`, user)
            } else {
                const driverId = driver._id.toString()

                const newPoints = driver.points
                return User.findByIdAndUpdate(_id, {
                    $addToSet: { 'draftInfo.draft': driverId },
                    $inc: { 'draftInfo.totalPoints': newPoints }
                }, { new: true });
            }
        })
        .then(() => res.redirect(`/user/profile/${_id}`))
        .catch(err => next(err))
})

router.post('/delete/:driverId', isLoggedIn, (req, res, next) => {

    const { driverId } = req.params
    const { _id } = req.session.currentUser

    User
        .findByIdAndUpdate(_id, { $pull: { 'draftInfo.draft': driverId } }, { new: true })
        .then(() => res.redirect(`/user/profile/${_id}`))
        .catch(err => next(err))

})


module.exports = router
