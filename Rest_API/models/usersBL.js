const User = require('./activeUsersSchema')

let getUsers = async function(){
    return new Promise((resolve, reject) => {
        User.find({}, (err, users) => {
            if(err){
                reject(err)
            }
            else{
                resolve(users)
            }
        })
    })
}

let getUserById = async function(userId){
    return new Promise((resolve, reject) => {
        User.findById(userId, (err, user) => {
            if(err){
                reject(err)
            }
            else{
                resolve(user)
            }
        })
    })
}

let addUser = async function(userObj){
    return new Promise((resolve, reject) => {
        let user = new User({
            userName: userObj.userName,
            room: userObj.room
        })

        user.save(err => {
            if(err){
                reject(err)
            }
            else{
                resolve(user)
            }
        })
    })
}

let deleteUser = async function(userId){
    return new Promise((resolve, reject) => {
        User.findByIdAndDelete(userId, err => {
            if(err){
                reject(err)
            }
            else{
                resolve("user has been removed")
            }
        })
    })
}

module.exports = {getUsers, getUserById, addUser, deleteUser}