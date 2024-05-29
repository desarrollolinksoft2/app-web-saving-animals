
import Nav_builder from '@/components/navs/nav_builder';
import VerifySession from '@/components/tools/verify_session';
import { readUserSession } from '@/data/auth';
import { redirect } from 'next/navigation';
import { Toaster } from 'sonner';
import DialogMessage from '@/components/tools/dialog_message';
import Loading from '@/components/tools/extras/loading';
import AccountMenu from '@/components/tools/navs/nav_account';
import MenuEmpresa from '@/components/tools/navs/menu_empresa';



const WebLayout = async ({ children }) => {

  const { data } = await readUserSession()
  if (!data.session) {
    console.log(data.session)
    redirect('/auth/login')
  }

  return (<>
    <VerifySession data={data} />
    <Toaster
      position='top-right'
      expand={false}
      richColors
      closeButton
      loadingIcon
      toastOptions={{
        style: {
          width: 'auto',
          padding: '0.5rem 1rem',
          right: '0.5rem',
        }
      }}
      offset={20}
    />
    {/* <FrmChargeData /> */}
    <header className="o_navbar">
      <nav className="o_main_navbar">

        <Nav_builder />

        <div
          className="o_menu_systray d-flex flex-shrink-0 ms-auto"
          role="menu"
        >
          <div className="flex justify-end">
            {/*
            <div className="flex items-center mr-1">
              <button className="flex mx-2 text-gray-600 dark:text-gray-300 focus:outline-none">
                <IoChatbubblesSharp className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center mr-1">
              <button className="flex mx-2 text-gray-600 dark:text-gray-300 focus:outline-none">
                <AiOutlineClockCircle className="h-5 w-5" />
              </button>
            </div>
             */}
            <div className="flex items-center mr-1">
              <MenuEmpresa />
            </div>
            <div className="flex items-center mr-1">
              {/* <button className="h-6 w-6 flex justify-center items-center mx-2 bg-green-600 rounded text-gray-200 dark:text-gray-300 focus:outline-none">
                        <span className="font-bold">D</span>
                      </button> */}
              <AccountMenu />
            </div>
          </div>
        </div>
      </nav>
    </header>
    {children}
    <DialogMessage /> 
    <Loading />
  </>)
}

export default WebLayout;