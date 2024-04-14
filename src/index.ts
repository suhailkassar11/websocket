import { WebSocket,WebSocketServer } from "ws";
import http from "http"

const server = http.createServer(function(request:any, response:any){
    console.log((new Date()) + 'Received request for' + request.url);
    response.end("hi there");
});

const wss = new WebSocketServer({server});

wss.on('connection',function connection(ws){
    ws.on('error',(err)=>console.error(err))

    ws.on('message', function message(data,isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState===WebSocket.OPEN){
                client.send(data,{binary:isBinary})
            }
        })
    })
    ws.send('Hello! there')
})

server.listen(8080,function(){
    console.log((new Date())+ 'server is listening on port 8080')
})