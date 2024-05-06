import React from 'react'
import Navbar from '../components/Navbar'

const Layout = ({ children }) => {
  return (
    <div>
      {children}
      <Navbar page={'Chatbot'} />
    </div>
  )
}

export default Layout