"use strict";
function isLoggedin() {
    return !!localStorage.getItem('token');
}
exports.isLoggedin = isLoggedin;
