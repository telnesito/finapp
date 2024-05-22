import React from 'react'
import Navbar from '../components/Navbar'
import { UserProvider } from '../customHooks/UserContext'

const Layout = ({ children }) => {
  return (
    <div>
      <UserProvider>

        {children}
        <Navbar page={'Chatbot'} />
      </UserProvider>

    </div>
  )
}

export default Layout