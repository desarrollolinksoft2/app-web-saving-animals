import { FaClipboardList } from "react-icons/fa6";

const Nav_config_con = {
    title: 'Contactos',
    dsc: 'Contactos',
    icon: <FaClipboardList />,
    defaultOption: 101,
    // defaultOption2: '/web?menu=con&config=101&view_type=kanban',
    items:[
        {
            title: 'Contactos',
            dsc: 'Contactos',
            path: '/web?menu=con&config=101&view_type=kanban'
        },
        {
            title: 'Configuración',
            dsc: 'Configuración',
            list:[
                {
                    title:'Etiquetas de contacto',
                    dsc: 'Etiquetas de contacto',
                    path: '/web?menu=con&config=103'
                },
                {
                    title:'Títulos de contacto',
                    dsc: 'Títulos de contacto',
                    path: '/web?menu=con&config=104'
                },
                {
                    title:'Industrias',
                    dsc: 'Industrias',
                    path: '/web?menu=con&config=105'
                },
                /*
                {
                    title:'Localización',
                    dsc: 'Localización',
                    list:[
                        {
                            title:'Países',
                            dsc: 'Países',
                            path: '/web?menu=con&config=106'
                        },
                        {
                            title:'Departamentos',
                            dsc: 'Departamentos',
                            path: '/web?menu=con&config=107'
                        },
                        {
                            title:'Provincias',
                            dsc: 'Provincias',
                            path: '/web?menu=con&config=108'
                        },
                        {
                            title:'Distritos',
                            dsc: 'Distritos',
                            path: '/web?menu=con&config=109'
                        }
                    ]
                },
                */
                {
                    title:'Cuentas bancarias',
                    dsc: 'Cuentas bancarias',
                    list:[
                        {
                            title:'Bancos',
                            dsc: 'Bancos',
                            path: '/web?menu=con&config=111'
                        },
                        {
                            title:'Cuentas bancarias',
                            dsc: 'Cuentas bancarias',
                            path: '/web?menu=con&config=112'
                        }
                    ]
                },
                {
                    title:'Tipo de Identificación',
                    dsc: 'Tipo de Identificación',
                    path: '/web?menu=con&config=113'
                }
            ]
        }

    ]
}

export default Nav_config_con;