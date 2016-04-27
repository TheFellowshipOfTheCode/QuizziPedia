exports.loggedin = function(req, res, next) {
    res.send(req.isAuthenticated() ? req.user : '0');
};