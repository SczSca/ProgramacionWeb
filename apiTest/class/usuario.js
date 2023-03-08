class Usuario{
    constructor(name,username,email){
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
    }
    objToJson(){
        let usuario = {
            name: this.name,
            username: this.username,
            email: this.email
        }
        return usuario;
    }
}

export default Usuario;