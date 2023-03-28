import connection from './conexion.cjs';

connection.connect();
let cliente={nombre:'Nepomuceno', apellido:'Gutierrez', rfc:'NEPO231010',ciudad:'Colima', CP:'28010', correo:'conocido@gmail.com'};
let factura={fecha:'2023/03/23', total:150, productos:[{fkProducto:1,cantidadOrdenada:5,precioIndividual:10},{fkProducto:2,cantidadOrdenada:5,precioIndividual:20}]};

connection.beginTransaction(function(err) {
    if (err) { throw err; }
    
    let queryInsertCliente = connection.query('INSERT INTO clientes SET ?', cliente, function (error, results, fields) {
        if (error){
            return connection.rollback(function(){
                throw error;    
            });
        }
            let querySelect = connection.query('SELECT * FROM clientes WHERE RFC = ?',cliente.rfc, function (error, results, fields) {
            if (error){
                return connection.rollback(()=>{
                    throw error;    
                });
            } 
            const idCliente = results[0].idCliente;
            const datosFactura = {
                fecha:factura.fecha,
                total:factura.total,
                fkCLiente: idCliente
            };
            let queryInsertFactura = connection.query('INSERT INTO pedidos SET ?',datosFactura,function(error,facturaInsertada,fields){
                if(error){
                    return connection.rollback(()=>{
                        throw error;
                    });
                }
                console.log(facturaInsertada);
                for(let i = 0; i < factura.productos.length; i++){
                    const detallesFactura = {
                        fkPedido: facturaInsertada.insertId, 
                        fkProducto: factura.productos[i].fkProducto, 
                        cantidadOrdenada: factura.productos[i].cantidadOrdenada, 
                        precioIndividual: factura.productos[i].precioIndividual,
                        numeroLineaPedido: i+1 
                    };    
                    let queryInsertDetalleFacturas = connection.query('INSERT INTO detallePedidos SET ?',detallesFactura,function(error, results, fields){
                        if(error){
                            return connection.rollback(()=>{
                                throw error;
                            });
                        }
                        console.log(results);
                    })
                }
                connection.query('SELECT * FROM detallePedidos WHERE fkPedido = ?',facturaInsertada.insertId,function(error,results,fields){
                    if(error){
                        return connection.rollback(()=>{
                            throw error;
                        });
                    }
                    console.log(results);
                });
                connection.rollback(()=>{
                    console.log("Se cancelo la transferencia");
                    connection.end();
                })
            });
        });
    });
    
  
      /*  
      connection.commit(function(err) {
          if (err) {
            return connection.rollback(function() {
              throw err;
            });
          }
          console.log('success!');
        });
        */
      });
      
    

   
/*let queryDelete = connection.query('DELETE FROM clientes WHERE RFC = ?',cliente.rfc, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    // console.log(fields);
});
*/
  