
import React from 'react'

const Tabs = ({ children }) => {
  return (
    <div className='flex rounded p-1 border border-gray-1000'>
      {children}
    </div>
  )
}

export default Tabs