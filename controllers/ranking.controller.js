const User = require('../models/User.model')

const rankingList = (req, res, next) => {
    User
        .find()
        .populate('draftInfo.draft')
        .then(users => {
            const promises = users.map((user, i) => {
                const actualizedPoints = user.draftInfo.draft.reduce((totalPoints, draftItem) => totalPoints + draftItem.points, 0)
                return User.findByIdAndUpdate(user._id, { $set: { 'draftInfo.totalPoints': actualizedPoints } }, { new: true })
                    .populate('draftInfo.draft')
            })
            Promise
                .all(promises)
                .then((usersArr) => {
                    usersArr.sort((a, b) => b.draftInfo.totalPoints - a.draftInfo.totalPoints)
                    res.render('ranking/list', { users: usersArr })
                })
                .catch((err) => next(err));

        })
        .catch(err => next(err))
}


module.exports = { rankingList }