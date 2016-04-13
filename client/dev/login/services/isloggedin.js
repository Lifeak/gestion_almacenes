"use strict";
// Funcion que comprueba si el usuario logueado es administrador
function isLoggedinAdmin() {
    var token;
    if (localStorage.getItem(token) == "admin")
        return true;
}
exports.isLoggedinAdmin = isLoggedinAdmin;
//Funcion que comprueba si el usuario logueado es un encargado
function isLoggedinEncargado() {
    var token;
    if (localStorage.getItem(token) == "encargado")
        return true;
}
exports.isLoggedinEncargado = isLoggedinEncargado;
