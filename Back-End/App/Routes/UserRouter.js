var user = require('../Controller/UserController');

module.exports = function(app){

    app.route('/:lang/signup')
        .post(user.signup);

    app.route('/:lang/signin')
        .post(user.signin);

    app.route('/:lang/signout')
        .post(user.signout);

    app.route('/:lang/recovery')
        .post(user.recovery);

    app.route('/:lang/loggedin')
        .get(user.loggedin);

};
