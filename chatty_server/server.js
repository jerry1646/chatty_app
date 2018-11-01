const express = require('express');
const WebSocket = require('ws')
const uuidv4 = require('uuid/v4')
// const URI = require('urijs')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const SocketServer = WebSocket.Server;
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

const colors = ["#7610c9", "#4be78b", "#fe9920", "#d40000"]
const connectedUsers = {};
let lastColor = "";

function escapeTag(string){
  return string.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function parseURI(string){
  let urlReg = /(https?:\/\/.*?\.(?:png|jpg|gif))/gi
  let result = string.replace(urlReg, "<br><img src= '$1' style='max-width: 60%;'/>");
  return result
}

wss.broadcast = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN){
      client.send(JSON.stringify(message))
    }
  })
}

wss.on('connection', (ws) => {

  //Prevent same color for neibour users
  let newColor = lastColor;
  while (newColor == lastColor){
    newColor = colors[Math.floor(Math.random()*4)];
  }
  const userColor = newColor;
  lastColor = newColor;

  //Register user connection
  console.log('Client connected');
  ws.uuid = uuidv4();
  connectedUsers[ws.uuid] = ws;
  let connectionMessage = {
    type: "newConnection",
    numUsers: Object.keys(connectedUsers).length,
  }
  wss.broadcast(connectionMessage)

  //Process incoming message/notification
  ws.on('message', (msg) => {
    const newMessage = JSON.parse(msg)
    newMessage.id = uuidv4();
    switch (newMessage.type){
      case "postMessage":
        newMessage.type = "incomingMessage";
        newMessage.color= userColor
        newMessage.content = parseURI(escapeTag(newMessage.content))
        wss.broadcast(newMessage);
        break;
      case "postNotification":
        newMessage.type = "incomingNotification";
        newMessage.color= userColor
        wss.broadcast(newMessage);
        break;
      default:
        console.error("Unknown event type " + data.type)
    }
  })


  //Remove dead socket from registration
  ws.on('close', () => {
    delete connectedUsers[ws.uuid];
    connectionMessage = {
      type: "newConnection",
      numUsers: Object.keys(connectedUsers).length
    }
    wss.broadcast(connectionMessage)

  });
});