import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const CheckAuth = ({ isAuthenticated, user, children }) => {
    const location = useLocation()

    if(location.pathname === "/"){
        if (!isAuthenticated){
            return <Navigate to="/auth/login" />;
        }else{
            if(user?.role === 'admin'){
                return <Navigate to="/admin/dashboard" />;
            }else{
                return <Navigate to="/shop/home" />
            }
        }
    }

    // Redirect to login if not authenticated and not on login/register pages
    if (!isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/register"))) {
        return <Navigate to="/auth/login" />
    }

    // Redirect to admin dashboard or shop home if authenticated and on login/register pages
    if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
        if (user?.role === 'admin') {
            return <Navigate to="/admin/dashboard" />
        } else {
            return <Navigate to="/shop/home" />
        }
    }

    // Redirect to unauth page if authenticated but trying to access admin routes without admin role
    if (isAuthenticated && (user?.role !== 'admin') && (location.pathname.includes("admin"))) {
        return <Navigate to="/unauthpage" />
    }

    // Redirect to admin dashboard if authenticated admin is trying to access shop routes
    if (isAuthenticated && (user?.role === 'admin') && (location.pathname.includes("shop"))) {
        return <Navigate to="/admin/dashboard" />
    }

    // If none of the above conditions are met, render the children
    return children;
}

export default CheckAuth;