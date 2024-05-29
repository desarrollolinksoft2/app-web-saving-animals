'use client'

import { signInWithEmail } from "@/data/auth"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { Toaster, toast } from "sonner"
import { AiOutlineLoading } from "react-icons/ai";
import useUserStore from "@/store/user_store"

const Frm_login = () => {
    
    const setUserSession = useUserStore(state => state.setUserSession)
    const [loginLoading, setLoginLoading] = useState(false)
    const route = useRouter();

    const user = useRef(null)
    const pass = useRef(null)

    const login=async(e)=>{
        e.preventDefault()
        setLoginLoading(true)
        const result= await signInWithEmail(user.current.value,pass.current.value)
        const {data, error}=JSON.parse(result)
        
        if(error){
            toast.error('credenciales invalidas')
            setLoginLoading(false)
        }else{
            setUserSession(data.user)
            
            route.push('/web')
        }
    }


    return (<>

        <form onSubmit={(e)=>login(e)} >
            <div className="mt-4">
                <input ref={user} className="w-full" type="text" placeholder="Usuario" />
            </div>
            <div className="mt-4">
                <input ref={pass} className="w-full" type="password" placeholder="Contraseña" />
            </div>
            <button type="submit" disabled={loginLoading} className="w-full text-center mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold p-3 rounded-md">
                {loginLoading ? <AiOutlineLoading  className="animate-spin h-5 w-5 text-gray-200"/> : 'Ingresar'}
            </button>
        </form>
        <Toaster />
    </>)
}

export default Frm_login