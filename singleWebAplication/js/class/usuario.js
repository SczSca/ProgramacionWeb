class Usuarios {
    constructor(){
        this.data = [];
        this.last = null;
    }
    agregar(newUser){
        this.last ? newUser['id'] = this.last['id'] + 1 : newUser['id'] = 1;
        this.data.push(newUser);
        this.last = newUser;
    }
    buscar(username){
        let i = 0;
        let notFound = true;
        let userPosicion = null;
        while(this.data[i] && notFound){
            if(this.data[i]['username'] == username){
                notFound = false;
                userPosicion = i;
            }
            i++;
        }
        return userPosicion;
    }
    listar(){
        return this.data;
    }

}


export default Usuarios;