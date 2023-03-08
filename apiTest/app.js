import Functions from './class/functions.js'
import UI from './class/ui.js'
import Usuario from './class/usuario.js'

const functions = new Functions();
const ui = new UI();

const selectForm = document.forms['selectUsersForm'];
const editForm = document.forms['editUsersForm'];
const mnuUsers = selectForm.menuUsers;

let inputs;
let typeObj;
let options = ""
fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then(users => {
    users.forEach(user=>{
        options += `<option value='${user.id}'>${user.username} </option> `
    })
 mnuUsers.innerHTML = options
})

mnuUsers.addEventListener('change',e=>{
    e.preventDefault();
    const divPosts = document.getElementById("posts");
    functions.eraseChildren(divPosts);
    ui.showPostsFrom(mnuUsers,divPosts);
    
})
selectForm.addEventListener('submit', e =>{
    e.preventDefault();
    functions.eraseChildren(editForm);
    ui.generateFormEdit(mnuUsers.value,editForm);
    inputs = editForm.getElementsByClassName('inputsData');
})

editForm.addEventListener('submit', e =>{
    e.preventDefault();
    typeObj = "posts";
    functions.updateObject(mnuUsers.value,typeObj,functions.inputsToJson(inputs)
    // console.log()
    )
});
