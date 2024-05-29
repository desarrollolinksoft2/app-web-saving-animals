'use client'
import useUserStore from "@/store/user_store";
import { useAppStore } from "@/store/zustand";
import { useEffect } from "react";

const FrmChargeData = () => {
    const ubigeo = useAppStore(state => state.ubigeo)
    const setDataUbigeo = useAppStore(state => state.setDataUbigeo)
    const userData = useUserStore(state => state.userData)
    const configUbigeo = {
        dpt: {
            fnc_name: 'fnc_cia_ct_ubi_dpt',
            label: 'dsc_dpt',
            value: 'id_dpt'
        },
        prv: {
            fnc_name: 'fnc_cia_ct_ubi_prv',
            label: 'dsc_prv',
            value: 'id_prv'
        },
        dtr: {
            fnc_name: 'fnc_cia_ct_ubi_dst',
            label: 'dsc_dst',
            value: 'id_dst'
        },
        pais: {
            fnc_name: 'fnc_cia_ct_ubi_pais',
            label: 'dsc_pais',
            value: 'id_pais'
        }
    }

    useEffect(() => {
        if(userData){
            if (ubigeo.distritos.length < 1) {
                setDataUbigeo(configUbigeo)
            }
        }
    }, [userData])

    return (<></>)

}

export default FrmChargeData