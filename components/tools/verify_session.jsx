'use client'

import useUserStore from "@/store/user_store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const VerifySession = ({ data }) => {
    
    const setUserSession = useUserStore(state => state.setUserSession)
    const user = useUserStore(state => state.user)
    const setUserData = useUserStore(state => state.setUserData)
    const route = useRouter()
    const { session } = data
    const setSession = async() => {

        if (user) {
            setUserData()
            
        }else{
            setUserSession(session.user)
        }
    }

    useEffect(() => {
        if (data.session ) {
            setSession()
        }
    }, [])

    useEffect(() => {
        if(user){
            
            setUserData()
        }
    },[user])

    return (<>

    </>)
}

export default VerifySession