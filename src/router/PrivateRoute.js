import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import jwt_decode from 'jwt-decode';


export default function PrivateRoute( { redirectTo, role, children, ...rest } ){
    const authen = useSelector(state => state.authen);
    const user = jwt_decode(authen.user);
    console.log("authen",user.roles);
    console.log("role",role);
    console.log("tes",user.roles.some(element => element.titre === role))
    return (
        <Route {...rest}>
            { user.roles.some(element => element.titre === role)? children : <Redirect to={ { pathname: redirectTo }} />  }
        </Route>
    );
}




