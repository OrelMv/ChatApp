# Chat Application
Chat application using React.js, Socket.io and MongoDB

## Introduction
- This project allows people to communicate with each other through chat
- They have the option to choose their room they would like to communicate
- My incentive to build this project is to practice how to work with socket.io

## Prerequisite
If you want to run this project, it is necessary to connect to it a MongoDB data base:\
activeUsersDB with one empty collection -> "activeusers" 

## Set up
- Run index.js file in Rest_API file
- In Client/socketproject file run:
1. npm install
2. npm start

## Server Side In Detail
- Data base that contains the active users information (user is considered active if he connect to the socket).
- JSON file that contains the messages for each room.
- BL file with all the functionality of the data base.
- socketController file that listen for requests.

## How To Use The Application
- In welcome page choose your username and the room you would like to enter.
- In chat page there is a side bar that dispaly all the active users in this chat room.
- Enter the text you want and press send.
- Delete a current window tab will disconnect and remove the user from the chat.

### Technologies
- Javascript
- React.js
- Socket.io
- Node.js
- MongoDB

