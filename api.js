'use strict';

const io =  require('socket.io-client');
const express = require('express');
const app = express();

const uuid =  require('uuid').v4;
let flowersID = uuid();
let widgetsID = uuid();

const flowersSchema = {
    retailer :'1800-flowers',
    code : flowersID
}

const socket =  io.connect('http://localhost:3000/db');

app.get('/', (req,res) => {
  socket.emit('delivery', 'Testing get route');
  res.send('ok');
})

// app.post('/delivery/:retailer/:code', (req,res)=>{
//   res.send('send it');
// })

app.post('/delivery/1800-flowers/${flowersID}',flowers)

    function flowers(req,res,next){
        let record = req.body;
        flowersSchema.create(record)
           .then(createRecord => {
             res.status(200).json(createRecord);
           })
            .catch(error => next(error));
      }

app.listen(8080, () => console.log('api is running'));