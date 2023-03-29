import connection from './conexion.cjs';

connection.connect();
let cliente={
    nombre:'Nepomuceno', 
    apellido:'Gutierrez', 
    rfc:'NEPO231010',
    ciudad:'Colima', 
    CP:'28010', 
    correo:'conocido@gmail.com'
};

let factura={
    fecha:'2023/03/23', 
    total:150,
    folio:'111AAA1A-1AA1-1A11-11A1-11A1AA111A11', 
    productos:[{
        fkProducto:1,cantidadOrdenada:5,
        precioIndividual:10
    },
    {
        fkProducto:2,cantidadOrdenada:5,
        precioIndividual:20
    }]
};

connection.beginTransaction(function(err) { //uso de transaction para probar sin insertar datos al servidor
    if (err) { throw err; }
    
    //query para insertar al cliente de prueba
    let queryInsertCliente = connection.query('INSERT INTO clientes SET ?', cliente, function (error, results, fields) {
        if (error){ //si hay error, se cancela la transaccion
            return connection.rollback(function(){
                throw error;    
            });
        }
            //query que obtiene el id del cliente con el rfc del cliente en sesión
            let querySelect = connection.query('SELECT * FROM clientes WHERE RFC = ?',cliente.rfc, function (error, results, fields) {
            if (error){
                return connection.rollback(()=>{
                    throw error;    
                });
            } 
            const idCliente = results[0].idCliente; //obtiene y guarda la id del cliente en sesión
            const datosFactura = { //json con los datos a ingresar para la factura
                folio: factura.folio,
                fecha:factura.fecha,
                total:factura.total,
                fkCLiente: idCliente
            };
            //query para insertar la factura
            let queryInsertFactura = connection.query('INSERT INTO pedidos SET ?',datosFactura,function(error,facturaInsertada,fields){
                if(error){
                    return connection.rollback(()=>{
                        throw error;
                    });
                }
                console.log(facturaInsertada); //se renombro el parametro results a facturaInsertada para mayor claridad
                
                for(let i = 0; i < factura.productos.length; i++){//se cicla todos los productos que se van a agregar a la factura
                    const detallesFactura = {
                        fkPedido: facturaInsertada.insertId, 
                        fkProducto: factura.productos[i].fkProducto, 
                        cantidadOrdenada: factura.productos[i].cantidadOrdenada, 
                        precioIndividual: factura.productos[i].precioIndividual,
                        numeroLineaPedido: i+1 
                    };
                    //query por cada producto que solicita en una misma factura para agregar en sus detalles
                    let queryInsertDetalleFacturas = connection.query('INSERT INTO detallePedidos SET ?',detallesFactura,function(error, results, fields){
                        if(error){
                            return connection.rollback(()=>{
                                throw error;
                            });
                        }
                        console.log(results);
                    })
                }
                //query para leer los detalles de la factura que se acaba de crear
                connection.query('SELECT * FROM detallePedidos WHERE fkPedido = ?',facturaInsertada.insertId,function(error,results,fields){
                    if(error){
                        return connection.rollback(()=>{
                            throw error;
                        });
                    }
                    console.log(results);
                });
                let querySelectProductos = connection.query('SELECT * FROM productos',function(error,results,fields){
                    if(error){
                        return connection.rollback(()=>{
                            throw error;
                        });
                    }
                    console.log(results);
                })
                //rollback forzado para no mandar cambios al servidor
                connection.rollback(()=>{
                    console.log("Se cancelo la transferencia");
                    connection.end();//se termina la conexion luego de cancelar transferencia
                })
            });//end queryInsertFactura
        });//end querySelectCliente
    });//end queryInsertCliente
    
});//end beginTransaction
      
  