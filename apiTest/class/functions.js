class Functions {
    eraseChildren(parentElement){
        let firstElementChild = parentElement.firstElementChild;
        while(firstElementChild){
            firstElementChild.remove();
            firstElementChild = parentElement.firstElementChild;
        }
    }
    inputsToJson(inputArr){
        let json = {};
        for(let i = 0; i < inputArr.length; i++){
            //sobreescribir json con su nueva propiedad y el valor de este
            let propName = inputArr[i].name;
            let propValue = inputArr[i].value;
            json[propName] = propValue;
        }
        return json;
    }
    updateObject(id, typeObj, jsonParam){
        return fetch(`https://jsonplaceholder.typicode.com/${typeObj}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(jsonParam),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => json);
        }
}
export default Functions;