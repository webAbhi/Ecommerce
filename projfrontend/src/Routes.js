import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import Home from "./core/Home"
import AdminDashboard from './user/AdminDashBoard';
import Signin from './user/Signin';
import Signup from './user/Signup';
import UserDashboard from './user/UserDashBoard';


const Routes = () =>{
    return(
        <BrowserRouter>
          <Switch>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/" exact component={Home}/>
            <PrivateRoute path="/user/dashboard" exact component={UserDashboard}/>
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
          </Switch>      
        </BrowserRouter> 
    )
}

export default Routes;