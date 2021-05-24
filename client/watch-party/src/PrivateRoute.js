import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const username = useSelector((state) => state.chat.username)
    
    // basic auth
    const isLoggedIn = (username !== ''); 
 
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : ( 
                    <Redirect to={{ pathname: '/', state: { from: props.match.params } }} />
                )
            }
        />
    )
}

export default PrivateRoute