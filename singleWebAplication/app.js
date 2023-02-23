import Forms from './js/class/form.js'
import Usuarios from './js/class/usuario.js'
import UI from './js/class/ui.js'
import Montador from './js/class/mount.js'
import userData from './userData.json' assert {type: 'json'};


const interfaz = new UI;
const usuario = new Usuarios();
const montador = new Montador();
const form = new Forms("register");

const formR = document.forms['registerForm'];
const bodyTable = document.getElementById('table');

montador.mountData(userData,usuario)
interfaz.printUsers(usuario,bodyTable);
formR.addEventListener("submit",function(e){
    e.preventDefault();
    form.submit(formR, usuario);
    interfaz.printUsers(usuario, bodyTable)
})
