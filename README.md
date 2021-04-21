# Chat Application
Chat application using React.js, Socket.io and MongoDB

### Introduction
- This project allows people to cummunicate with each other through chat
- They have the option to choose their room they would like to cummunicate
- My incentive to build this project is to practice how to work with socket.io

### Prerequisite
If you want to run this project, it is necessary to connect to it a MongoDB data base:\
activeUsersDB with one collection -> each document has username(string) and room(number).\
When you run this project you can leave this collection empty.

### Server Side In Detail
- Data base that contains the active users information (user is considered active if he connect to the socket).
- JSON file that contains the messages for each room.
- BL file with all the functionality of the data base.
- socketController file that listen for requests.

### Technologies
- Javascript
- React.js
- Socket.io
- Node.js
- MongoDB

