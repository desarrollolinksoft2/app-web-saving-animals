'use client'
import useUserStore from "@/store/user_store";
import { Button, Divider, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const MenuEmpresa = ({ config = null }) => {
    const userEmpSelected = useUserStore(state => state.userEmpSelected)
    const user = useUserStore(state => state.user)
    const setUserEmpSelected = useUserStore(state => state.setUserEmpSelected)
    const userCiaEmp = useUserStore(state => state.userCiaEmp)
    const userData = useUserStore(state => state.userData)
    const changeEmpPred = useUserStore(state => state.changeEmpPred)
    const [anchorEl, setAnchorEl] = useState(null)
    const [empPred, setEmpPred] = useState(null)
    const id = 'id_cia'
    const name = 'dsc_cia'
    const id_pred = 'id_cia_pred'
    // const [empresas, setEmpresas] = useState([])
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const isSelected = (emp) => {
        return userEmpSelected.some((item) => item?.[id] === emp?.[id])
    }

    const handleChange = (emp) => {
        let existEmp = userEmpSelected.some((item) => item?.[id] === emp?.[id])
        if (existEmp) {

            if (userEmpSelected.length < 2) {
                toast.warning("Debe quedar al menos una empresa seleccionada")
                return;
            } else {
                let newList = userEmpSelected.filter((item) => item?.[id] !== emp?.[id])
                if (emp?.[id] === empPred?.[id]) {
                    setEmpPred(newList[0])
                    changeEmpPred(newList[0]?.[id])
                    // handleClose()
                }
                setUserEmpSelected(newList)
                return
            }
        } else {
            setUserEmpSelected([...userEmpSelected, emp])

        }
    }
    const changePred = (emp) => {
        handleClose()
        setUserEmpSelected([emp])
        setEmpPred(emp)
        changeEmpPred(emp[id])
    }

    const cargaInicial = () => {

        if (userData && userCiaEmp.length > 0) {
            if (userEmpSelected.length < 1 || empPred === null) {

                let itemPred = userCiaEmp.find((item) => item?.[id] == userData?.[id_pred])
                // console.log(itemPred)
                
                setEmpPred(itemPred)
                setUserEmpSelected([itemPred])
            }
        }
    }

    //cargar predeterminado

    useEffect(() => {
        if (userData && userCiaEmp) {
            cargaInicial()
        }
        // console.log(userCiaEmp)
    }, [user,userData, userCiaEmp])

    useEffect(() => {
        if (userData && userCiaEmp) {
            cargaInicial()
        }
    }, [])

    // if (userData && userCiaEmp) {
    //     cargaInicial()
    // } else {
    //     return (<></>)
    // }

    return (<>
        <div onClick={handleClick} className="text-xs text-gray-600 cursor-pointer dark:text-gray-300 focus:outline-none">
            {empPred && empPred?.[name]}
        </div>
        {userCiaEmp?.length > 0 && 
        
        <Menu
            anchorEl={anchorEl}
            id="emp-menu"
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}>
            {
                userCiaEmp.map((item, i) => (
                    <MenuItem key={i} >
                        <div className="flex  gap-2">
                            <label className="flex g ml-2 font-medium cursor-pointer ">
                                <input
                                    className={`m-1 group-hover:bg-sgreen-400 group-hover:text-sgreen-200 cursor-pointer  `}
                                    type="checkbox"
                                    checked={isSelected(item)}
                                    onChange={() => handleChange(item)}
                                />

                            </label>
                            <Divider orientation="vertical" flexItem />
                            <div onClick={() => changePred(item)} className={`mr-2 ${item[id] == empPred?.[id] ? 'font-bold' : ''}`}>
                                {item?.[name]}
                            </div>
                        </div>
                    </MenuItem>
                ))
            }

        </Menu>}

    </>);
}

export default MenuEmpresa;