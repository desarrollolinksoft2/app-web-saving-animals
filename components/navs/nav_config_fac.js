import { BsFillFileBarGraphFill } from "react-icons/bs";
// import FrmDefaultVnt from "../forms/frm_default_vnt";

const Nav_config_fac = {
    title: 'Facturación',
    dsc: 'Facturación',
    menuId: 3,
    icon: <BsFillFileBarGraphFill />,
    defaultOption: 601,
    items: [
        {
            title: 'Clientes',
            dsc: 'Clientes ',
            list: [
                {
                    title: 'Facturas',
                    dsc: 'Facturas',
                    path: '/web?menu=con&config=601'
                },
                {
                    title: 'Notas de crédito',
                    dsc: 'Notas de crédito',
                    path: ''
                },
                {
                    title:'Importes a pagar',
                    dsc: 'Importes a pagar',
                    path: ''
                },
                {
                    title: 'Pagos',
                    dsc: 'Pagos',
                    path: ''
                },
                {
                    title: 'Productos',
                    dsc: 'Productos',
                    path: ''
                },
                {
                    title: 'Clientes',
                    dsc: 'Clientes',
                    path: '/web?menu=fac&config=603'
                }
            ]
        },
        {
            title: 'Proveedores',
            dsc: 'Proveedores',
            list: [
                {
                    title: 'Facturas',
                    dsc: 'Facturas',
                    path: ''
                },
                {
                    title: 'Reembolsos',
                    dsc: 'Reembolsos',
                    path: ''
                },
                {
                    title: 'Importes a pagar',
                    dsc: 'Importes a pagar',
                    path: ''
                },
                {
                    title: 'Pagos',
                    dsc: 'Pagos',
                    path: ''
                },
                {
                    title: 'Cuentas bancarias',
                    dsc: 'Cuentas bancarias',
                    path: ''
                },
                {
                    title: 'Productos',
                    dsc: 'Productos',
                    path: '/web?menu=fac&config=301'
                },
                {
                    title: 'Proveedores',
                    dsc: 'Proveedores',
                    path: ''
                }
            ]
        },
        {
            title:'Reportes',
            dsc: 'Reportes',
            list:[
                {
                    title:'Gestión',
                    dsc: 'Gestión',
                    list:[
                        {
                            title:'Análisis de facturas',
                            dsc: 'Análisis de facturas',
                            path: ''
                        }
                    ]
                }
            ]
        },
        {
            title: 'Configuración',
            dsc: 'Configuración',
            list:[
                {
                    title:'Ajustes',
                    dsc: 'Ajustes',
                    path: ''
                },
                {
                    title:'Facturación',
                    dsc: 'Facturación',
                    list:[
                        {
                            title:'Condiciones de pago',
                            dsc: 'Condiciones de pago',
                            path: '/web?menu=fac&config=602'
                        },
                        {
                            title:'Incoterms',
                            dsc: 'Incoterms',
                            path: ''
                        }
                    ]
                },
                {
                    title:'Bancos',
                    dsc: 'Bancos',
                    list:[
                        {
                            title:'Agregar una cuenta bancaria',
                            dsc: 'Agregar una cuenta bancaria',
                            path: ''
                        }
                    ]
                },
                {
                    title:'Contabilidad',
                    dsc: 'Contabilidad',
                    list:[
                        {
                            title:'Impuestos',
                            dsc: 'Impuestos',
                            path: '/web?menu=fac&config=201'
                        },
                        {
                            title:'Diarios',
                            dsc: 'Diarios',
                            path: ''
                        },
                        {
                            title:'Divisas',
                            dsc: 'Divisas',
                            path: ''
                        },
                        {
                            title:'Posiciones fiscales',
                            dsc: 'Posiciones fiscales',
                            path: ''
                        },
                        {
                            title:'Grupos de diarios',
                            dsc: 'Grupos de diarios',
                            path: ''
                        },
                        {
                            title:'Tipos de Documentos',
                            dsc: 'Tipos de Documentos',
                            path: ''
                        }
                    ]
                },
                {
                    title:'Pagos en línea',
                    dsc: 'Pagos en línea',
                    list:[
                        {
                            title:'Proveedores de pago',
                            dsc: 'Proveedores de pago',
                            path: ''
                        },
                        {
                            title:'Métodos de pago',
                            dsc: 'Métodos de pago',
                            path: ''
                        }
                    ]
                },
                {
                    title:'Gestión',
                    dsc: 'Gestión',
                    list:[
                        {
                            title:'Categorías de productos',
                            dsc: 'Categorías de productos',
                            path: '/web?menu=fac&config=302'
                        }
                    ]
                },
                {
                    title:'Perú',
                    dsc: 'Perú',
                    list:[
                        {
                            title:'Certificados',
                            dsc: 'Certificados',
                            path: ''
                        }
                    ]
                }
            ]
        }
    ]
}

export default Nav_config_fac;