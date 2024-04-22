import React from 'react'

const Modal = ({ closeModal, isOpen, isClosing, children }) => {


  return (
    <>
      {isOpen && (
        <div className="absolute bottom-0 inset-0 flex items-end justify-center z-[450]">
          <div className=" absolute inset-0 bg-gray-900 bg-opacity-75" onClick={closeModal}></div>
          <div className={` ${!isClosing ? 'animate-bottom-top' : 'animate-top-bottom'}  h-[750px] absolute bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full`}>
            <div className="p-6">
              {children}
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default Modal