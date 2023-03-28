class Functions {
    eraseChildren(parentElement){ // metodo que elimina elementos hijos de un elemento padre
        let firstElementChild = parentElement.firstElementChild;
        while(firstElementChild){
            firstElementChild.remove();
            firstElementChild = parentElement.firstElementChild;
        }
    }
    inputsToJson(inputArr){ //elemento que genera json en base a los inputs de un form 
        let json = {};
        for(let i = 0; i < inputArr.length; i++){
            //sobreescribir json con su nueva propiedad y el valor de este
            let propName = inputArr[i].name;
            let propValue = inputArr[i].value;
            json[propName] = propValue;
        }
        return json;
    }
    updateObject(id, typeObj, jsonParam){//metodo que llama metodo PUT de la API para actualizar registro de cualquier obj/tabla
        return fetch(`https://jsonplaceholder.typicode.com/${typeObj}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(jsonParam),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => {return json;}); //{return json} no retorna en consola
        }
}
export default Functions;
