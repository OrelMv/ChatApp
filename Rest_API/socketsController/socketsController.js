let io = require('../index')
const usersBL = require('../models/usersBL')

const jFile = require('jsonfile')

//client made a connection to the socket
io.on('connection', function(socket){
    console.log("user connected")


    //adding new user to active users db
    socket.on('new_user', async function(userObj){
        let user = await usersBL.addUser(userObj)
        socket.user = user
        let users = await usersBL.getUsers()
        io.emit('active_users', users)
    })

    //get all msgs
    socket.on('get_all', function(){
        jFile.readFile('./jsonFile/usersMessages.json', (err, data) => {
            if(err){
                console.log(err);
            }
            else{
                socket.emit('recieve_all', data.roomsData)
            }
        })
    })

    // adding a msg 
    socket.on('message', function(msgContent){
        return new Promise(async(resolve, reject) => {
            let currentUser = await usersBL.getUserById(socket.user._id) 
            jFile.readFile('./jsonFile/usersMessages.json', (err, data) => {
                if(err){
                    reject(err)
                }
                else{
                    let roomIndex = data.roomsData.findIndex(x => x.room == currentUser.room)
                    data.roomsData[roomIndex].messages.push(msgContent)
                    jFile.writeFile('./jsonFile/usersMessages.json', data, err => {
                        if(err){
                            reject(err)
                        }
                        else{
                            io.emit('messages_display', data.roomsData)
                            resolve("msg added")
                        }
                    })
                }
                
            })
        })
    })

    socket.on('typing', function(userName){
        socket.broadcast.emit('typing', userName)
    })

    socket.on('clear_typing_msg', function(emptyMsg){
        io.emit('clear_typing_msg', emptyMsg)
    })

    socket.on('clear_chat', function(chatRoomNumber){
        jFile.readFile('./jsonFile/usersMessages.json', (err, data) => {
            if(err){
                console.log(err)
            }
            else{
                let roomIndex = data.roomsData.findIndex(x => x.room == chatRoomNumber)
                data.roomsData[roomIndex].messages = []
                jFile.writeFile('./jsonFile/usersMessages.json', data, err => {
                    if(err){
                        console.log(err)
                    }
                    else{
                        io.emit('messages_display', data.roomsData)
                    }
                })
            }
        })
    })


    //user disconnect --> remove user from active users db
    socket.on('disconnect', async function(){
        console.log("user disconnected")
        if(socket.user != null){
            let userId = socket.user._id
            await usersBL.deleteUser(userId)
            let activeUsers = await usersBL.getUsers()
            io.emit('active_users', activeUsers)


            if(activeUsers.length == 0){
                jFile.readFile('./jsonFile/usersMessages.json', (err, data) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        data.roomsData.forEach(room => {
                            room.messages = []
                        })

                        jFile.writeFile('./jsonFile/usersMessages.json', data, err => {
                            if(err){
                                console.log(err)
                            }
                        } )
                    }
                })
                
            }
        }
    })

})