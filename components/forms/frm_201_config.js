import {
    FrmMiddle,
    FrmMiddleRight,
    FrmPhoto,
    FrmSearch,
    FrmTab0,
    FrmTab1,
    FrmTab3,
    FrmTitle,
    Subtitle,
    TopTitle,
  } from "./frm_201";
  
  const Frm_201_config = {
    title: "Impuestos",
    dsc: "Impuesto",
    view_default: "list",
    fnc_name: "fnc_con_ct_imp",
    configControls:{

    },
    fnc_valid: (data) => {
      return data;
    },
    default_values: {
      id_cia: null,
      status: "",
      nom_imp: "",
      dsc_imp: "",
      calculo: "Porciento",
      id_tbt: null,
      unece: "",
      id_aigv: null,
      timp: "Ventas",
      aimp: "",
      importe: "0",
      etiqueta: "",
      id_impg: null,
      id_pais: null,
      incluido_precio: false,
      afecta_subsecuentes: false,
    },
    grid: {
      idRow: "id_imp",
      col_name: "dsc_imp",
      idRow_db:'imp.id_imp',
      kanban: {
        box: {
          id: "id_imp",
          title: "dsc_imp",
          subtitle: "dsc_con_rel",
          desc1: "dsc_prv__dsc_pais",
          desc2: "email",
        },
      },
      list: {
        columns: [
          {
            header: "Nombre del impuesto",
            accessorKey: "nom_imp",
            size: 230,
            align: "left"
          },
          {
            header: "Descripción",
            accessorKey: "dsc_imp",
            align: "left"
          },
          {
            header: "Tipo de Impuesto",
            accessorKey: "timp",
            size: 210,
            align: "left"
          },
          {
            header: "Ámbito del impuesto",
            accessorKey: "aimp",
            size: 210,
            align: "left"
          },
          {
            header: "Etiqueta en facturas",
            accessorKey: "etiqueta",
            size: 210,
          },
          {
            header: "Compañía",
            accessorKey: "dsc_cia",
            size: 210,
          },
        ],
      },
    },
   
    filters: [
      {
        list: [
            {
              title: 'Venta',
              type: 'check',
              key: '1'
            },
            {
              title: 'Compra',
              type: 'check',
              key: '2'
            },
        ]
      },
      {
        list: [
            {
              title: 'Servicios',
              type: 'check',
              key: '3'
            },
            {
              title: 'Bienes',
              type: 'check',
              key: '4'
            },
        ]
      },
      {
        list: [
            {
              title: 'Archivado',
              type: 'check',
              key: 'status_I'
            },
        ]
      },
    ],
  
    group_by: [
      {
        list: [
            {
              title: 'Compañía',
              type: 'check',
              key: '1'
            },
            {
              title: 'Tipo de Impuesto',
              type: 'check',
              key: '2'
            },
            {
              title: 'Ámbito del impuesto',
              type: 'check',
              key: '2'
            },
        ]
      },
    ],

    configControls: {
      id_cia: {
        hb_n: false,
        hb_e: false,
      },
    },
    
    form_inputs: {
      imagenFields: [],
      auditoria: true,

      frm_middle: (control, errors,watch, setValues, editConfig={}) => (
        <FrmMiddle setValues={setValues} watch={watch} control={control} errors={errors} editConfig={editConfig} />
      ),

      frm_middle_right: (control, errors,setValues, watch, editConfig={} ) => (
        <FrmMiddleRight setValues={setValues} watch={watch} control={control} errors={errors} editConfig={editConfig} />
      ),
  
      tabs: [
        {
          name: "Opciones avanzadas",
          content: (watch,control, errors,editConfig={}) => (
            <FrmTab0 watch={watch} control={control} errors={errors} editConfig={editConfig} />
          ),
        },
      ],
    },
  };
  
  export default Frm_201_config;
  