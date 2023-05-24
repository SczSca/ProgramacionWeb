const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// Almacenar las conexiones de los clientes
const clients = new Set();

wss.on('connection', (ws) => {
  // Agregar nuevo cliente a la lista
  clients.add(ws);

  ws.on('message', (message) => {
    // Enviar el mensaje a todos los clientes conectados
    const jsonMessage = JSON.stringify(message)
    const jsonData = JSON.parse(String.fromCharCode(...JSON.parse(jsonMessage).data))
    if (jsonData.type === 'login'){
        broadcast(JSON.stringify(jsonData));
    }else if(jsonData.type === 'message'){
        broadcast(JSON.stringify(jsonData));
    }else if(jsonData.type === 'exit'){
        broadcast(JSON.stringify(jsonData));
    }else{
        console.error(`Error: Invalid type "${jsonData.type}"`);
    }
    console.log(JSON.parse(String.fromCharCode(...JSON.parse(jsonMessage).data)));
    
  });

  ws.on('close', () => {
    // Eliminar cliente de la lista cuando se desconecta
    clients.delete(ws);
    console.log('Client disconnected');
  });
});

function broadcast(message, isBinary) {
  // Enviar el mensaje a todos los clientes conectados
  clients.forEach((client) => {
    client.send(message, { binary: isBinary});
    
  });
}