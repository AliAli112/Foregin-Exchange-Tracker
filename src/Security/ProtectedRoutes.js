import React from 'react';
import { render } from 'react-dom';
import { Route , Redirect } from 'react-router-dom'


export const ProtectedRoutes = ({ component: Component, ...rest }) => {
    return (
        <Route 
         {...rest}
         render = {props => {
             if(JSON.parse(sessionStorage.getItem('user') || '{}').isloggedIn === true){
                 return <Component { ...props} />
             }else {
                 return (
                     <Redirect
                     to= {{
                         pathname: '/login',
                         state: {
                            from: props.location}
                         }}
                    />
                 )
             }
         }}/>
    )
}