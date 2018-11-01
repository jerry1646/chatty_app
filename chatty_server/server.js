const express = require('express');
const WebSocket = require('ws')
const uuidv4 = require('uuid/v4')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const SocketServer = WebSocket.Server;
const wss = new SocketServer({ server });

// Username colors can be any one of the following four
const colors = ["#7610c9", "#4be78b", "#fe9920", "#d40000"]
let lastColor = "";

// Object to keep track of active connections
const connectedUsers = {};


// Utility functions
function escapeTag(string){
  return string.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}


function parseURI(string){
  let urlReg = /(https?:\/\/.*?\.(?:png|jpg|gif))/gi
  let result = string.replace(urlReg, "<br><img src= '$1' style='max-width: 60%;'/>");
  return result
}

function randomColor(){
  let newColor = lastColor;
  while (newColor == lastColor){
    newColor = colors[Math.floor(Math.random()*4)];
  }
  lastColor = newColor;
  return newColor;
}

wss.broadcast = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN){
      client.send(JSON.stringify(message))
    }
  })
}


// Socket management functions

function registerUser(ws){
  ws.uuid = uuidv4();
  ws.username = 'anonymous';
  ws.userColor = randomColor();
  connectedUsers[ws.uuid] = ws;

  let connectionMessage = {
    type: "newConnection",
    id: uuidv4(),
    numUsers: Object.keys(connectedUsers).length,
  }
  wss.broadcast(connectionMessage);
}

function messageHandler(msg){
  const newMessage = JSON.parse(msg)
  newMessage.id = uuidv4();

  switch (newMessage.type){
    case "postMessage":
      newMessage.type = "incomingMessage";
      newMessage.color= this.userColor
      newMessage.content = parseURI(escapeTag(newMessage.content))
      wss.broadcast(newMessage);
      break;
    case "postNotification":
      this.username = newMessage.username;
      newMessage.type = "incomingNotification";
      newMessage.color= this.userColor
      wss.broadcast(newMessage);
      break;
    default:
      console.error("Unknown event type " + data.type)
  }
}

function disconnectHandler(){
  delete connectedUsers[this.uuid];
  connectionMessage = {
    type: "disConnection",
    id: uuidv4(),
    numUsers: Object.keys(connectedUsers).length,
    content: this.username + " has disconnected"
  }
  wss.broadcast(connectionMessage)
}


// Web socket manager

wss.on('connection', (ws) => {

  //Register user connection
  registerUser(ws);

  //Process incoming message/notification
  ws.on('message', messageHandler)


  //Remove dead socket from registration
  ws.on('close', disconnectHandler);
});