const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    }
    else {
        res.render('auth/login', { errorMessage: 'Log in to continue' })
    }
}


const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    }
    else {
        res.redirect('/students')
    }
}

const checkRole = (...roles) => (req, res, next) => {

    if (roles.includes(req.session.currentUser.role)) {
        next()
    }
    else {
        res.render('auth/login', { errorMessage: 'Forbidden access' })
    }
}

const ADMINorOwn = (req, res, next) => {
    const { id } = req.params
    if (req.session.currentUser._id === id) {
        next()
    }
    else if (req.session.currentUser.role === 'ADMIN') {
        next()
    }
    else {
        res.render('auth/login', { errorMessage: 'Forbidden access' })
    }
}




module.exports = { isLoggedIn, isLoggedOut, checkRole, ADMINorOwn }