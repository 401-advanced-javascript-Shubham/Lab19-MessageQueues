'use strict';

const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000/db');

const clientID = "mytestsubscriber";

socket.emit('subscribe', {id: clientID, event: 'delivery'});

socket.emit('getMissed', {clientID: clientID, event: 'delivery'});


socket.on('package-delivered',  obj => {
    const {messageID, payload} = obj;
    let message = {event: 'delivery',clientID, messageID}
    socket.emit('received', message);
    console.log('TE', payload);
})