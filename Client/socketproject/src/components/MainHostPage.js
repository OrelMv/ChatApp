import React from 'react'
import LogIn from './LogIn'
import MainChatPage from './Chat/MainChatPage'

import {Switch, Route, Link} from 'react-router-dom'

function MainHostPage() {
    return (
        <div>
            {/* switch between the log in page and the chat page */}
            <Switch>

                <Route path='/' exact component={LogIn}></Route>

                <Route path='/chat/:userName/:room' component={MainChatPage}></Route>

            </Switch>
        </div>
    )
}

export default MainHostPage
