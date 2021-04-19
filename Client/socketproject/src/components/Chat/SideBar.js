//here we'll display all the active users 
import React, {useEffect, useState} from 'react'
import '../../css/SideBar.css'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:8000')

function SideBar(props) {

    const [activeUsers, setActiveUsers] = useState([])
    const [usersItems, setUsersItems] = useState('')


    socket.on('active_users', function(activeUsers){
        //array of users
        let users = activeUsers.filter(user => user.room == props.room)
        setActiveUsers(users)
    })

    useEffect(() => {

        let usersItems = activeUsers.map(user => {
            let userClassName = "user"
            if(props.userName == user.userName){
                userClassName = "currentUser"
            }
            return <div key={user._id} className={userClassName}>
                <b>{user.userName}</b>
                <hr />
            </div>
        })
        setUsersItems(usersItems)

    }, [activeUsers])

    return (
        <div className="sideBarBody">
            <h2 style={{textAlign: 'center', fontFamily: 'cursive'}}>Room {props.room}</h2>
            <h2 style={{textAlign: 'center', fontFamily: 'cursive'}}>Active Users</h2>
            <hr />
            <div>
                {usersItems}
            </div>
        </div>
    )
}

export default SideBar
