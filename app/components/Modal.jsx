import React from 'react'

const Modal = ({ closeModal, isOpen, isClosing }) => {


  return (
    <>
      {isOpen && (
        <div className=" fixed inset-0 flex items-end justify-center z-50">
          <div className=" absolute inset-0 bg-gray-900 bg-opacity-75" onClick={closeModal}></div>
          <div className={` ${!isClosing ? 'animate-bottom-top' : 'animate-top-bottom'}  h-[750px] absolute bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full`}>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Título de la ventana modal</h2>
              <p>Contenido de la ventana modal.</p>
            </div>
            <div className="px-4 py-3 bg-gray-100 text-right">
              <button onClick={closeModal} className="text-gray-700">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal