import Frm_login from "@/components/forms/frm_login"

const loginPage = () => {

  return (<>
    <div className="w-full">
      <h3 className='mt-5 text-center text-lg dark:text-gray-700 font-semibold'>Bienvenido de nuevo!</h3>
      <p className='pt-2 text-center text-gray-500 mb-0 mr-4 text-sm'>Inicie sesión para continuar con S7</p>
    </div>
    <div className="mt-4">
      <Frm_login />
    </div>

  </>)
}

export default loginPage