'use client'

import React from 'react'
import Navbar from '../components/Navbar'
import { UserProvider } from '../customHooks/UserContext'

const Layout = ({ children }) => {
  return (
    <UserProvider>
      <div>
        {children}
        <Navbar page={'Home'} />
      </div>

    </UserProvider>
  )
}

export default Layout