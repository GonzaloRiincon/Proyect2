const getIndexPage = (req, res, next) => {
    res.render("index", { layout: false })
}

module.exports = { getIndexPage }