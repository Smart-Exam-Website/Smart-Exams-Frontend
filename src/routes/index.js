import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthRoutes from './AuthRoutes'
import InstructorRoutes from './InstructorRoutes'
import MainRoutes from './MainRoutes'

const Routes = () => {
    return (
        <Switch>
            {MainRoutes.map((props,index) => <Route key={index} {...props} />)}
            {AuthRoutes.map((props,index) => <Route key={index}{...props} />)}
            {InstructorRoutes.map((props,index) => <Route key={index} {...props} />)}
        </Switch>
    )
}

export default Routes
