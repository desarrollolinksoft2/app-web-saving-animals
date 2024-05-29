'use client'
import * as forms from "@/components/forms"
import Frm_web_options_list from "@/components/tools/form/frm_web_options"
import Frm_web_options_row from "@/components/tools/form/frm_web_options_form"
import Manager_content from "@/components/tools/manager_content"
import useUserStore from "@/store/user_store"
import useAppStore from "@/store/zustand"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const Home = () => {
    const user = useUserStore(state => state.user)
    const userData = useUserStore(state => state.userData)
    const setUserData = useUserStore(state => state.setUserData)
    const gridData = useAppStore(state => state.gridData)
    const setGridData = useAppStore(state => state.setGridData)
    const router = useRouter()
    const searchParams = useSearchParams();
    const configId = searchParams.get('config');
    const config = configId ? forms[`Frm_${configId}_config`] : forms.Frm_web_config
    const menu = searchParams.get('menu') || null;
    const idRow= config?.grid?.idRow

    //actualizar cuando cambie config en la url
    useEffect(() => {

        if (userData) {
            setGridData(config?.fnc_name,idRow)
        }
    }, [searchParams.get('config')])

    useEffect(()=>{
        if(user){
            setUserData()
        }
    },[user])

    // useEffect(()=>{
    //     if(gridData.length === 0){
    //         setGridData(config?.fnc_name,idRow)
    //     }
    // }, [])

    return (
        <>
            <div className="o_action_manager">
                <div className="o_form_view o_view_controller o_action o_xxl_form_view h-100">
                    <div className="o_form_view_container">
                        {(menu === '1' || menu === null) ? (
                        <>
                            <div className="o_content">
                                {config.form}
                            </div>
                        </>
                        ) :
                        (
                        <>
                            {config && <Manager_content config={config} view={config.view_default} />}
                        </>
                        )
                        }
                    </div>
                </div>
            </div>

            {/* <div className="flex w-full">
                <div className="w-full rounded-md">
                    <div className={`w-full flex flex-wrap md:flex-nowrap  md:justify-between items-center px-3`}>
                        <div className="w-full flex  items-center ">
                            
                            {config.title}
                        </div>
                        <div className="w-full text-xs ">
                            
                        </div>
                        <div className="w-full flex mx-1">
                            <div className="w-full flex justify-end items-center">
                               
                            </div>
                        </div>
                    </div>
                    <div className="w-full  mt-2  o_content">
                        
                        {config.form}
                    </div>
                </div>
            </div> */}
        </>
    )
}
export default Home