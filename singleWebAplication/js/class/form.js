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
}
export default Forms;