class Forms{
    constructor(type){
        this.type = type;
    }
    
    submit(form, registeredUsers){
        if(this.type == "register"){
            const newUser = {
                "id": 0,
                "name": form.name.value,
                "username": form.username.value,
                "email": form.email.value,
                "website": String(form.website.value),
                "edad": String(form.edad.value),
                // "contraseña": String(form.password.value)
            }
            registeredUsers.agregar(newUser);
            form.reset();
        }
    }
    showUserFound(userPosition, registeredUsers, form){
        if(userPosition != null){
            form.name.value = registeredUsers[userPosition].name;
            form.username.value = registeredUsers[userPosition].username;
            form.email.value = registeredUsers[userPosition].email;
            form.website.value = registeredUsers[userPosition].website;
            form.edad.value = registeredUsers[userPosition].edad;
            this.toggleDisableInputs(form,true);
            return registeredUsers[userPosition].id;
        }
        else{
            form.reset();
            this.toggleDisableInputs(form,false);
        }
    }
    toggleDisableInputs(form, disableBool){
        let inputs = form.getElementsByTagName("input");
        for(let i = 0; i < inputs.length; i++){
            inputs[i].disabled = disableBool;
        }
    }
}
export default Forms;