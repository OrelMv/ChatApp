import React from 'react'

import SideBar from './SideBar'
import Chat from './Chat'

function MainChatPage(props) {



    return (
        <div>
            <SideBar room={props.match.params.room} userName= {props.match.params.userName} />
            <Chat userName={props.match.params.userName} room={props.match.params.room} />
        </div>
    )
}

export default MainChatPage
