class Mount{

    mountData(Data, ObjContainer){
        Data.forEach(element => {
            ObjContainer.agregar(element);
        });
    }
}
export default Mount;