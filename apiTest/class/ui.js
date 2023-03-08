class UI{
    showPostsFrom(selectedUser,container){ // manda a llamar los posts de determinado usuario y genera DOM donde se despliega
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`)
        .then(response => response.json())
        .then(posts => {
            let i = 1;
            posts.forEach(post =>{
                const divPost = document.createElement('div');
                const h2Tag = document.createElement('h2');
                const pBody = document.createElement('p');
                h2Tag.innerHTML = post.title + " Post: " + i;
                pBody.innerHTML = post.body
                divPost.appendChild(h2Tag);
                divPost.appendChild(pBody);
                container.appendChild(divPost);
                i++;
            })
        })
    }
    generateFormEdit(userId, form){ // genera los elementos del formulario edit con valores del usuario seleccionado
        const labelName = document.createElement('label');
        const inputName = document.createElement('input');
        const labelUsername = document.createElement('label');
        const inputUsername = document.createElement('input');
        const labelEmail = document.createElement('label');
        const inputEmail = document.createElement('input');
        const inputSubmit = document.createElement('input');
        const inputCancel = document.createElement('input');
    
        labelName.setAttribute('for', 'name');  
        inputName.setAttribute('name','name');
        inputName.setAttribute('type','text');
        inputName.setAttribute('class','inputsData');
        labelUsername.setAttribute('for', 'username');
        inputUsername.setAttribute('name','username');
        inputUsername.setAttribute('type','text');
        inputUsername.setAttribute('class','inputsData');
        labelEmail.setAttribute('for', 'email');
        inputEmail.setAttribute('name','email');
        inputEmail.setAttribute('type','email');
        inputEmail.setAttribute('class','inputsData');
        inputSubmit.setAttribute('value','Guardar');
        inputSubmit.setAttribute('type','submit');
        inputCancel.setAttribute('value','Cancelar');
        inputCancel.setAttribute('type','button');

        //se le asigna todos los elementos creados al form como elementos hijos
        const elementChildren = [labelName,inputName,labelUsername,inputUsername,labelEmail,inputEmail,inputSubmit,inputCancel];
        elementChildren.forEach(element =>{
            form.appendChild(element);
        })

        //obtiene los valores del usuario que se montaran al input
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user =>{
            inputName.value = user.name;
            inputUsername.value = user.username;
            inputEmail.value = user.email;
        })
    }
}
export default UI;