import React from 'react'

const AuthLayout = ({ children }) => {
    
  return (
    <>
      <section className="h-screen bg-cmain text-gray-900">
        <div className="h-full">

          <div className="g-6 flex h-full flex-wrap items-center justify-center">

            <div className="dark:text-gray-200  shrink-1 mb-12 grow-0 basis-auto 
                        md:mb-0 md:w-7/12 md:shrink-0 lg:w-5/12 xl:w-4/12">
              <div className='w-full items-center '>
                <h1 className='text-center dark:text-gray-100 text-4xl mb-10 font-extrabold'><span className='text-cyan-700'>S</span>7</h1>

              </div>
              <div className='w-full dark:bg-gray-200 border-2 border-gray-800 shadow-md p-10 rounded-md'>

                {children}
                <div className="p-2 mt-4">

                  <div className='p-3'>
                      
                  </div>
                </div>

              </div>
              <div className='w-full items-center '>
                <h1 className='text-center text-sm mt-10 font-normal'>Todos los derechos reservados © 2024 Linksoft Perú</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AuthLayout