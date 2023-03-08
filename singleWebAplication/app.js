import Forms from './js/class/form.js'
import Usuarios from './js/class/usuario.js'
import Posts from './js/class/post.js'
import UI from './js/class/ui.js'
import Montador from './js/class/mount.js'

import userData from './userData.json' assert {type: 'json'}
import UserPosts from './userPosts.json' assert {type: 'json'}

const interfaz = new UI;
const usuarios = new Usuarios();
const posts = new Posts();
const montador = new Montador();
const form = new Forms("register");

const inputSearch = document.getElementById('inputSearch');
const formR = document.forms['registerForm'];
const bodyTable = document.getElementById('table');
const usersSelectTag = document.getElementById('usersSelect');
const divUsersPosts = document.getElementById('usersPosts');

montador.mountData(userData,usuarios);
montador.mountData(UserPosts, posts);
interfaz.printUsers(usuarios.listar(),bodyTable);
interfaz.mountUsersToSelect(usuarios.listar(),usersSelectTag);
interfaz.printPosts(posts.getPosts(),usuarios.listar(),divUsersPosts);

formR.addEventListener("submit",function(e){
    e.preventDefault();
    form.submit(formR, usuarios);
    interfaz.printUsers(usuarios.listar(), bodyTable)
})
inputSearch.addEventListener("change",function(e){
    e.preventDefault();
    console.log(usuarios.buscar(inputSearch.value))
    form.showUserFound(usuarios.buscar(inputSearch.value), usuarios.listar(), formR);

})
usersSelectTag.addEventListener("change",function(e){
    e.preventDefault();
    interfaz.showUserPostsFromSelectedUser(divUsersPosts,this);
})
