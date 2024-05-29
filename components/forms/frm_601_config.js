import {
    Frm_bar_buttons,
    Frm_bar_status,
    FrmMiddle,
    FrmMiddleRight,
    // Frm_footer,
    FrmPhoto,
    FrmSearch,
    FrmTab0,
    FrmTab1,
    FrmTab3,
    FrmTitle,
    Subtitle,
    TopTitle,
  } from "./frm_601";
  
  const Frm_601_config = {
    title: "Facturas",
    dsc: "Factura de cliente",
    view_default: "list",
    fnc_name: "fnc_fac_ts_doc",
    configControls:{},
    fnc_valid: (data) => {
      if(!data["numero"]) {
        return null;
      }
      return data;
    },
    default_values: {
      id_cia: null,
      tdoc: "",
      status: "",
      status2: "",
      numero: "",
      id_con_cliente: null,
      fecha_documento: "",
      ref_pago: "",
      fecha_vencimiento: "",
      id_cdp: null,
      id_div: null,
      ref_cliente: "",
      id_con_vendedor: null,
      id_eqv: null,
      id_ncb: null,
      fecha_entrega: "",
      id_pfi: null,
      terminos_condiciones: "",
      importe_total: "",
    },
    grid: {
      idRow: "id_doc",
      col_name: "dsc_con_cliente",
      idRow_db:'doc.id_doc',
      kanban: {
        box: {
          id: "id_doc",
          // fav: 'fav',
          image: "data_img",
          title: "dsc_con_cliente",
          subtitle: "dsc_con_rel",
          desc1: "dsc_prv__dsc_pais",
          desc2: "email",
        },
      },
      list: {
        columns: [
          {
            header: "Número",
            accessorKey: "numero",
            size: 150,
          },
          {
            header: "Cliente",
            accessorKey: "dsc_con_cliente",
          },
          {
            header: "Fecha de factura",
            accessorKey: "fecha_documento",
            size: 200,
          },
          {
            header: "Fecha de vencimiento",
            accessorKey: "fecha_vencimiento",
            size: 200,
          },
  
          {
            header: "Total en divisa",
            accessorKey: "importe_total",
            size: 200,
          },
        ],
      },
    },
    
  filters: [
    {
      list: [
        {
          title: 'Mis facturas',
          type: 'check',
          key: 'tcon_I'
        },
      ]
    },
    {
      list: [
        {
          title: 'Borrador',
          type: 'check',
          key: 'tcon_I'
        },
        {
          title: 'Publicado',
          type: 'check',
          key: 'tcon_C'
        },
        {
          title: 'Cancelado',
          type: 'check',
          key: 'tcon_C'
        },
      ]
    },
    {
      list: [
        {
          title: 'Enviado',
          type: 'check',
          key: 'facturas_clientes'
        },
        {
          title: 'No enviado',
          type: 'check',
          key: 'facturas_proveedores'
        },
      ]
    },
    {
      list: [
        {
          title: 'Para revisar',
          type: 'check',
          key: 'status_I'
        },
      ]
    },
    {
      list: [
        {
          title: 'No pagado',
          type: 'check',
          key: 'tcon_I'
        },
        {
          title: 'Pagado',
          type: 'check',
          key: 'tcon_C'
        },
        {
          title: 'Vencidas',
          type: 'check',
          key: 'tcon_C'
        },
      ]
    },
  ],

  group_by: [
    {
      list: [
        {
          title: 'Comercial',
          type: 'check',
          key: 'gBy_Vendedor'
        },
        {
          title: 'Estado',
          type: 'check',
          key: 'gBy_Empresa'
        },
      ]
    },
  ],

  configControls: {
    // tcon:{
    //   hb_e: false
    // },
    // id_con_rel: {
    //   hb_e: false
    // },
    // dsc_con: {
    //   hb_e: false
    // },
    // dcon_num: {
    //   hb_e: false
    // },
    // telf: {
    //   hb_e: false
    // },
    // data_img:{
    //   hb_n: false
    // }
  },
 
    form_inputs: {
      auditoria: true,

      frm_bar_buttons: (control, errors,editConfig={}) => (
        <Frm_bar_buttons control={control} errors={errors} editConfig={editConfig} />
      ),
      frm_bar_status: (control, errors,editConfig={}) => (
        <Frm_bar_status control={control} errors={errors} editConfig={editConfig} />
      ),
      frm_title: (control, errors,editConfig={}) => (
        <FrmTitle control={control} errors={errors} editConfig={editConfig}/>
      ),
      frm_middle: (control, errors,watch, setValues,editConfig={}) => (
        <FrmMiddle setValues={setValues} watch={watch} control={control} errors={errors} editConfig={editConfig} />
      ),
      frm_middle_right: (control, errors,editConfig={}) => (
        <FrmMiddleRight control={control} errors={errors} editConfig={editConfig}/>
      ),
  
      tabs: [
        {
          name: "Líneas de factura",
          content: (watch,control, errors,editConfig={}) => (
            <FrmTab0 control={control} errors={errors} editConfig={editConfig}/>
          ),
        },
        {
          name: "Otra información",
          content: (watch, control, errors,editConfig={}) => (
            <FrmTab1 watch={watch} control={control} errors={errors} editConfig={editConfig}/>
          ),
        },
      ],

      // frm_footer: (control, errors) => (
      //   <Frm_footer control={control} errors={errors} />
      // ),

    },
  };
  
  export default Frm_601_config;
  