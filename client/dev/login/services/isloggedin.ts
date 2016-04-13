// Funcion que comprueba si el usuario logueado es administrador
export function isLoggedinAdmin(){
	let token: string;
    if (localStorage.getItem(token) == "admin")
    	return true;
  }

//Funcion que comprueba si el usuario logueado es un encargado
export function isLoggedinEncargado() {
	let token: string;
    if (localStorage.getItem(token) == "encargado")
		return true;
}