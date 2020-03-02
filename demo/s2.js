'use strict';

const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000/db');

socket.on('testEvent',  obj => {
    const {messageID, payload} = obj;
    console.log('S2', payload);
})