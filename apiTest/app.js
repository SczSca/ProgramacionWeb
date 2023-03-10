import Functions from './class/functions.js'
import UI from './class/ui.js'
import Usuario from './class/usuario.js'

//objetos con metodos a utilizar
const functions = new Functions();
const ui = new UI();

//elementos del DOM
const selectForm = document.forms['selectUsersForm'];
const editForm = document.forms['editUsersForm'];
const mnuUsers = selectForm.menuUsers;

//variables globales dinamicas
let inputs; //arr donde se almacenara los inputs del formulario con los datos que se quieran transformar en json
let typeObj; //tipo de objeto o tabla a la que se quiera actualizar los datos
let options = ""//elementos <option> con sus respectivos valores

//obtiene los usuarios y los agrega al menu desplegable
fetch('https://jsonplaceholder.typicode.com/users')//asignarlo a un metodo
.then(response => response.json())
.then(users => {
    users.forEach(user=>{
        options += `<option value='${user.id}'>${user.username} </option> `
    })
 mnuUsers.innerHTML = options
})

mnuUsers.addEventListener('change',e=>{ //muestra los posts del usuario seleccionado
    e.preventDefault();
    const divPosts = document.getElementById("posts");
    functions.eraseChildren(divPosts);
    ui.showPostsFrom(mnuUsers,divPosts);
    
})
selectForm.addEventListener('submit', e =>{// genera el formulario de edicion con los datos del usuario seleccionado
    e.preventDefault();
    functions.eraseChildren(editForm);
    ui.generateFormEdit(mnuUsers.value,editForm);
    inputs = editForm.getElementsByClassName('inputsData');
})

editForm.addEventListener('submit', e =>{//actualiza los datos del usuario seleccionado
    e.preventDefault();
    typeObj = "posts";
    functions.updateObject(mnuUsers.value,typeObj,functions.inputsToJson(inputs))
    .then(respuesta=>console.log(respuesta)); //como esta funcionando mediante promesas, debemos esperar la respuesta.
    // console.log()
    
});
