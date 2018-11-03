Chatty App
=====================

A minimal single room chat app built with ReactJS, Express and Websocket. This application allows users to send/receive real-time messages and share images by simply sending an URL.

### Getting Started

1. Clone the repository.
2. In both "chatty_client" and "chatty_server" directories, run `npm install` command to install dependencies.
3. In both "chatty_client" and "chatty_server" directories, run `npm start` command and the app will be served at `http://localhost:3000`


### Screenshots

!["Chat and share gifs with friends"](https://github.com/jerry1646/chatty_app/blob/master/docs/chatty-message.png)
!["Messages are shared real-time in the chat room"](https://github.com/jerry1646/chatty_app/blob/master/docs/chatty-image-message.png)

### Dependencies

#### Client side

* react
* react-dom
* ws

#### Server side

* express
* uuid
* ws