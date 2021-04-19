import React,{useState, useEffect} from 'react'
import '../../css/Chat.css'
import io from 'socket.io-client'

let socket = io.connect('http://localhost:8000')

function Chat(props) {

    const [textMsg, setTxtMsg] = useState('')
    const [allMessages, setMessages] = useState([])
    const [msgItems, setMsgItems] = useState('')
    const [userTypingMsg, setTypingMsg] = useState('')

    useEffect(() => {
        
        let room = sessionStorage.getItem('room')
        socket.emit('new_user', {
            userName: sessionStorage.getItem('userName'),
            room: room
        })

        socket.emit('get_all')
        socket.on('recieve_all', function(allMsgs){
            for(let i = 0; i < allMsgs.length; i++){
                if(allMsgs[i].room == props.room){
                    setMessages(allMsgs[i].messages)
                    break;
                }
            }
        })

    }, [])


    useEffect(() => {

        if(allMessages != null){
            let messagesItems = allMessages.map((message, index) => {
                return <div key={index}>
                    <div style={{display: 'flex'}}>
                        <div className="userName">
                            {message.userName}
                        </div>
                        <div className="msgTime">
                            {message.msgTime}
                        </div>
                    </div>
                    <div className="msgBody">
                        {message.msgBody}
                    </div>
                    <hr />
                </div>
            })
            setMsgItems(messagesItems)
        }
        

    }, [allMessages])




    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }
      
      

    let sendMsg = function(){
        socket.emit('clear_typing_msg', '')
        if(textMsg != ''){
            let msgObj = {
                userName: props.userName,
                msgTime: formatAMPM(new Date),
                msgBody: textMsg
            }
            socket.emit('message', msgObj)
            setTxtMsg('')

        }
        else{
            alert('text message box is empty')
        }
        
    }

    let declareUserIsTyping = function(){
        socket.emit('typing', props.userName)
    }

    let clearChat = function(){
        socket.emit('clear_chat', props.room)
    }



    //listeners --------------------------
    
    //find the messages of this specific room
    socket.on('messages_display', function(allMsgs){
        for(let i = 0; i < allMsgs.length; i++){
            if(allMsgs[i].room == props.room){
                setMessages(allMsgs[i].messages)
                break
            }
        }
    })

    socket.on('typing', function(userName){
        setTypingMsg(`${userName} is typing...`)
    })

    socket.on('clear_typing_msg', function(emptyMsg){
        setTypingMsg(emptyMsg)
    })

    //-----------------------------------------------


 
    return (
        <div className="messagesBody">
            {/* messages display */}
            <div className="messagesBox">
                <input type="button" value="Clear Chat" style={{float: 'right'}} onClick={clearChat} />
                {msgItems}
                {userTypingMsg}
            </div>

            {/* txt box and button */}
            <input type="text" value={textMsg} placeholder={`${props.userName}, Enter Text...`} 
                className="textBox" onChange={e => setTxtMsg(e.target.value)} 
                onKeyPress={declareUserIsTyping} /> 
            <input type="button" value="Send" className="sendBtn" onClick={sendMsg} />

        </div>
    )
}

export default Chat
