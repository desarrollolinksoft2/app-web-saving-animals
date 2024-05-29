import { BsFillFileBarGraphFill } from "react-icons/bs";
// import FrmDefaultVnt from "../forms/frm_default_vnt";

const Nav_config_aju = {
    title: 'Ajustes',
    dsc: 'Ajustes',
    menuId: 3,
    icon: <BsFillFileBarGraphFill />,
    defaultOption: 602,
    items: [
        {
            title: 'Ajustes generales',
            dsc: 'Ajustes generales'
        },
        {
            title: 'Configuración',
            dsc: 'Configuración',
            list:[
                {
                    title:'Usuarios',
                    dsc: 'Usuarios',
                    path: '/web?menu=aju&config=114'
                },
                {
                    title:'Compañías',
                    dsc: 'Compañías',
                    path: '/web?menu=aju&config=102'
                }
            ]
        }
    ]
}

export default Nav_config_aju;