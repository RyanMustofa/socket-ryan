# Socket Express

## Custom Socket with express

this socket is use full for server node js

## Features

- Broadcast outside connection
- Free structure folder express + socket io
- No limit connection

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v16+ to run.

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
app.io = socket.io
```

## License

MIT

**Free Software, Hell Yeah!**
