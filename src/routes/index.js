import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthRoutes from './AuthRoutes'
import InstructorRoutes from './InstructorRoutes'
import MainRoutes from './MainRoutes'

const Routes = () => {
    return (
        <Switch>
            {MainRoutes.map(props => <Route {...props} />)}
            {AuthRoutes.map(props => <Route {...props} />)}
            {InstructorRoutes.map(props => <Route {...props} />)}
        </Switch>
    )
}

export default Routes
