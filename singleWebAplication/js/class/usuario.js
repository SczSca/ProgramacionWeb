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
        return this.data
    }
    rankForBSearch(key){
        let lo = 0;
        let hi = this.data.length - 1;
        let mid = 0;
        while(lo <= hi){
            mid = Math.floor(lo + (hi - lo) / 2);
            if(this.data[mid]['id'] > key){
                hi = mid - 1;
            }
            else if(this.data[mid]['id'] < key){
                lo = mid + 1;
            }
            else {
                return [1,mid];
            }
        }
        return [null,mid];
        //checar si funciona retornando un solo valor if(found) return mid; elseif(notfound) return null;
    }
    binarySearch(code){
        let posicion = this.rankForBSearch(code);
        if(posicion[0] == null)    return posicion[0];
        else                    return this.data[posicion[1]];
    }
    getUserNameFrom(posicion){
        return this.data[posicion]['username'];
    }
}


export default Usuarios;