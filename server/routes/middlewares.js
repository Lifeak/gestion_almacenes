"use strict";

const middlewares = {

    isLogged : function (req, res, next) {
        /*if (req.user) return next();
        res.redirect('/');*/
        console.log("eeeeeeeee");
        next();
    }
};
module.exports = middlewares;