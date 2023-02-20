function checkIfOwn(currentUser, user) {
    return currentUser._id === user._id.toString()
}


module.exports = { checkIfOwn }
