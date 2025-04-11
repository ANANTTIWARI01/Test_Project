import React from 'react'
import Header from './user/components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './user/components/Footer'
function First() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default First