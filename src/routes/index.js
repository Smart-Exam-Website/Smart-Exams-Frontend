import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import AuthRoutes from './AuthRoutes'
import InstructorRoutes from './InstructorRoutes'
import MainRoutes from './MainRoutes'
import StudentRoutes from './StudentRoutes'
import UserRoutes from './UserRoutes'

const Routes = () => {
    const userType = useSelector(state=>state.auth.userType) || localStorage.getItem('userType')
    console.log(userType)
    return (
        <Switch>
            {MainRoutes.map((props, index) => <Route key={index} {...props} />)}

            {AuthRoutes.map((props, index) => <Route key={index}{...props} />)}

            {/* FOR ANY USER */}
            {userType && UserRoutes.map((props, index) => <Route key={index} {...props} />)}

            {/* ONLY FOR INSTRUCTOR */}
            {userType === 'instructor' && InstructorRoutes.map((props, index) => <Route key={index} {...props} />)}

            {/* ONLY FOR STUDENT */}
            {userType === 'student' && StudentRoutes.map((props, index) => <Route key={index} {...props} />)}

            <Redirect to={'/login'} />
        </Switch>
    )
}

export default Routes
