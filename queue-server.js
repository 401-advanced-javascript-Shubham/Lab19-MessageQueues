'use strict';

const uuid =  require('uuid').v4;
const io = require('socket.io')(3000);

let messages = {};

io.of('db', socket => {
    console.log('welcome to the delivery channel', socket.id);

    socket.on('subscribe', payload =>{
       const{event,id} = payload;
       if(!messages[event]) {messages[event] = {};} 
       if(!messages[event][id]) {messages[event][id] = {};}     
    });

    socket.on('package-delivered', payload => {

        let event =  'delivery';
        let messageID = uuid();

        for(let subscriber in messages[event]){
            messages[event][subscriber][messageID] = payload;
        }
        //console.log(messages);

        let message = { messageID,payload};
        io.of('db').emit('delivery', message);
    });

    socket.on('getMissed', payload => {
    
        let {clientID, event} = payload;

        console.log(payload);

        for(const messageID in messages[event][clientID]){
            let payload = messages[event][clientID][messageID];
            io.of('db').to(socket.id).emit(event, {messageID, payload})
            console.log('resend', messageID);
        }
    })

    socket.on('received', payload => {
        const {messageID,clientID, event} = payload;
        delete messages[event][clientID][messageID];
        console.log('After', messages)
    })
});