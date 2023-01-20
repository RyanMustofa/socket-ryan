# Socket Express

## Custom Socket with express

this socket is use full for server node js

## Features

- Broadcast outside connection
- Free structure folder express + socket io
- No limit connection

## Installation

SocketRyan requires [Node.js](https://nodejs.org/) v16+ to run.

Before install please create db for application

Install the dependencies and devDependencies and start the server.

```sh
npm install socket-ryan
```

## Usage

Usage Package Socket Ryan for server

Start App:

```js
const WebSocket = require('socket-ryan');
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
....

const socket = new WebSocket(server);
app.socket = socket

// send spesific auth
app.use('/send',(req,res) => {
    let { app } = req
    let send = app.socket.to(auth_code).send(event,data)
    return res.send({
        send,
        message: 'Websocket Realtime'
    })
})

// send broadcast message
app.use('/broadcast',(req,res) => {
    let { app } = req
    let send = app.socket.broadcast(event,data)
    return res.send({
        send,
        message: 'Websocket Realtime'
    })
})

server.listen(3000,() => {
    console.log('Server has runnng in port 3000')
})
```

## License

MIT

**Free Software, Hell Yeah!**
