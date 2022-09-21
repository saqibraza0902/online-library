import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const Private = ({ allowedRoles }) => {
    const location = useLocation();
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('role'))
    // console.log(allowedRoles)
    const setAuth = () => {
        // console.log(token)
        if (!token || token === 'null') {
            return false
        } else {
            return true
        }
    }

    const auth = setAuth()
    
    return (
        user === allowedRoles && auth === true ?
            <Outlet />
            :
            <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default Private