import { BsFillFileBarGraphFill } from "react-icons/bs";
// import FrmDefaultVnt from "../forms/frm_default_vnt";

const Nav_config_ven = {
    title: 'Ventas',
    dsc: 'ventas',
    menuId: 3,
    icon: <BsFillFileBarGraphFill />,
    // defaultOption: <FrmDefaultVnt />,
    items: [
        {
            title: 'Órdenes',
            dsc: 'Órdenes ',
            list: [
                {
                    title: 'Cotizaciones',
                    dsc: 'Cotizaciones',
                    path: ''
                },
                {
                    title: 'Órdenes',
                    dsc: 'Órdenes',
                    path: ''
                },
                {
                    title:'Equipos de ventas',
                    dsc: 'Equipos de ventas',
                    path: ''
                    // title:'Condición de Pago',
                    // dsc: 'Condición de Pago',
                    // path: '/web?menu=3&config=602'
                },
                {
                    title: 'Clientes',
                    dsc: 'Clientes',
                    path: '/web?menu=3&config=101'
                }
            ]
        },
        {
            title: 'Por facturar',
            dsc: 'Por facturar ',
            list: [
                {
                    title: 'Órdenes a facturar',
                    dsc: 'Órdenes a facturar',
                    path: ''
                },
                {
                    title: 'Órdenes para crear ventas adicionales',
                    dsc: 'Órdenes para crear ventas adicionales',
                    path: ''
                }
            ]
        },
        {
            title:'Productos',
            dsc: 'Productos',
            list:[
                {
                    title:'Productos',
                    dsc: 'Productos',
                    // path: '/web?menu=3&config=203'
                    path: ''
                },
                {
                    title:'Variantes de producto',
                    dsc: 'Variantes de producto',
                    path: ''
                },
                {
                    title:'Listas de precios',
                    dsc: 'Listas de precios',
                    path: ''
                }
            ]
        },
        {
            title:'Reportes',
            dsc: 'Reportes',
            list:[
                {
                    title:'Ventas',
                    dsc: 'Ventas',
                    path: ''
                },
                {
                    title:'Vendedores',
                    dsc: 'Vendedores',
                    path: ''
                },
                {
                    title:'Productos',
                    dsc: 'Productos',
                    path: ''
                },
                {
                    title:'Clientes',
                    dsc: 'Clientes',
                    path: ''
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
                },                {
                    title:'Equipos de ventas',
                    dsc: 'Equipos de ventas',
                    path: ''
                },
                {
                    title:'Órdenes de venta',
                    dsc: 'Órdenes de venta',
                    list:[
                        {
                            title:'Etiquetas',
                            dsc: 'Etiquetas',
                            path: ''
                        }
                    ]
                },
                {
                    title:'Productos',
                    dsc: 'Productos',
                    list:[
                        {
                            title:'Atributos',
                            dsc: 'Atributos',
                            path: ''
                        },
                        {
                            title:'Categorías de producto',
                            dsc: 'Categorías de producto',
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
                    title:'Unidades de medida',
                    dsc: 'Unidades de medida',
                    list:[
                        {
                            title:'Categorías de las unidades de medida',
                            dsc: 'Categorías de las unidades de medida',
                            path: ''
                        }
                    ]
                },
                {
                    title:'Planes de actividades',
                    dsc: 'Planes de actividades',
                    path: ''
                }
            ]
        }
    ]
}

export default Nav_config_ven;