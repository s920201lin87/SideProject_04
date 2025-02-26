//檢測登陸middleware
module.exports = (req, res, next) => {
    if (!req.session.username) {
        return res.redirect('/login');
    }
    next();
}