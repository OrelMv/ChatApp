import React,{useState} from 'react'
import '../css/LogIn.css'

import io from 'socket.io-client'

const socket = io.connect('http://localhost:8000')

function LogIn(props) {

    const [userName, setUserName] = useState('')
    const [room, setRoom] = useState(0)

    let enterChat = function(){
        if(userName != '' && room != ''){
            sessionStorage.setItem('userName', userName)
            sessionStorage.setItem('room', room)
            props.history.push(`/chat/${userName}/${room}`)
        }
        else{
            alert("Enter UserName")
        }
        
    }

    return (

        <div className="logInBody">

            <div className="logInContent">

                <h1>Enter User Name</h1>

                <input className="userNameTxtBox" type="text" placeholder="User Name..." 
                    onChange={e => setUserName(e.target.value)}/> <br /> <br />

                <b>Room:</b> <select onChange={e => setRoom(e.target.value)}>
                    <option value="">choose room</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>

                <br /> <br />
                <input className="logInBtn" type="button" value="Enter Chat" onClick={enterChat} />

            </div>

        </div>
        
    )
}

export default LogIn
