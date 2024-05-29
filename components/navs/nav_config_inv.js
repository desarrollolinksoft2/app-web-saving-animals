import { FaClipboardList } from "react-icons/fa6";

const Nav_config_inv = {
    title: 'Inventario',
    dsc: 'Inventario',
    icon: <FaClipboardList />,
    defaultOption: 602,
    items:[
        {
            title: 'Información general',
            dsc: 'Información general',
            path: ''
        },
        {
            title: 'Operaciones',
            dsc: 'Operaciones',
            list:[
                {
                    title: 'Traslados',
                    dsc: 'Traslados',
                    list:[
                        {
                            title: 'Recibidos',
                            dsc: 'Recibidos',
                            path: ''
                        },
                        {
                            title:'Entregados',
                            dsc: 'Entregados',
                            path: ''
                        }
                    ]
                },
                {
                    title: 'Ajustes',
                    dsc: 'Ajustes',
                    list:[
                        {
                            title:'Inventario físico',
                            dsc: 'Inventario físico',
                            path: ''
                        },
                        {
                            title: 'Desechar',
                            dsc: 'Desechar',
                            path: ''
                        }
                    ]
                },
                {
                    title: 'Aprovisionamiento',
                    dsc: 'Aprovisionamiento',
                    list:[
                        {
                            title:'Reabastecimiento',
                            dsc: 'Reabastecimiento',
                            path: ''
                        }
                    ]
                }
            ]
        },
        {
            title: 'Productos',
            dsc: 'Productos',
            list:[
                {
                    title: 'Productos',
                    dsc: 'Productos',
                    path: '/web?menu=2&config=101'
                },
                {
                    title: 'Variantes del producto',
                    dsc: 'Variantes del producto',
                    path: ''
                }
            ]
        },
        {
            title:'Reportes',
            dsc: 'Reportes',
            list:[
                {
                    title:'Existencias',
                    dsc: 'Existencias',
                    path: ''
                },
                {
                    title: 'Historial de movimientos',
                    dsc: 'Historial de movimientos',
                    path: ''
                },
                {
                    title: 'Análisis de movimientos',
                    dsc: 'Análisis de movimientos',
                    path: ''
                },
                {
                    title: 'Valoración',
                    dsc: 'Valoración',
                    path: ''
                },
                {
                    title: 'Antigüedad del inventario',
                    dsc: 'Antigüedad del inventario',
                    path: ''
                },
                {
                    title: 'Rendimiento',
                    dsc: 'Rendimiento',
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
                },
                {
                    title:'Gestión del almacén',
                    dsc: 'Gestión del almacén',
                    list:[
                        {
                            title:'Almacenes',
                            dsc: 'Almacenes',
                            path: ''
                        },
                        {
                            title:'Tipos de operaciones',
                            dsc: 'Tipos de operaciones',
                            path: ''
                        }
                    ]
                },
                {
                    title:'Productos',
                    dsc: 'Productos',
                    list:[
                        {
                            title:'Categorías de productos',
                            dsc: 'Categorías de productos',
                            path: ''
                        },
                        {
                            title:'Atributos',
                            dsc: 'Atributos',
                            path: ''
                        },
                        {
                            title:'Embalajes del producto',
                            dsc: 'Embalajes del producto',
                            path: ''
                        },
                        {
                            title:'Reglas de reordenamiento',
                            dsc: 'Reglas de reordenamiento',
                            path: ''
                        }
                    ]
                },
                {
                    title:'Unidades de medida',
                    dsc: 'Unidades de medida',
                    list:[
                        {
                            title:'Categorías de unidades de medida',
                            dsc: 'Categorías de unidades de medida',
                            path: ''
                        }
                    ]
                }
            ]
        }
    ]
}

export default Nav_config_inv;