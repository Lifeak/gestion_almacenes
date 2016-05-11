"use strict";
// Funcion que comprueba si el usuario logueado es administrador
function isLoggedinAdmin() {
    var token;
    if (localStorage.getItem(token) == "admin")
        return true;
    else
        return false;
}
exports.isLoggedinAdmin = isLoggedinAdmin;
//Funcion que comprueba si el usuario logueado es un encargado
function isLoggedinEncargado() {
    var token;
    if (localStorage.getItem(token) == "encargado")
        return true;
    else
        return false;
}
exports.isLoggedinEncargado = isLoggedinEncargado;
//Funcion que comprueba si el usuario esta logueado
function isLogged() {
    var token;
    if (localStorage.getItem(token) == "encargado" || localStorage.getItem(token) == "admin")
        return true;
    else {
        return false;
    }
}
exports.isLogged = isLogged;
