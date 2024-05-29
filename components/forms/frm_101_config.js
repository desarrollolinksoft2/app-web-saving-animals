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
} from "./frm_101";
const topTitleOptions = [
    { label: "Individual", value: "I" },
    { label: "Compañía", value: "C" },
  ];
const Frm_101_config = {
  title: "Contactos",
  dsc: "Contactos",
  view_default: "kanban",
  views: ["kanban", "list"],
  fnc_name: "fnc_cia_ct_con",
  fnc_valid: (data) => {
    //default: (data)=>{return data}
    if (data["tcon"] === "C") {
      data["id_con_rel"] = null;
    }
    if (!data["dsc_con"]) {
      return null;
    }
    return data;
  },

  default_values: {
    id_cia: null,
    status: "",
    tcon: "C",
    dsc_con: "",
    data_img: null,
    id_icon: null,
    dcon_num: "",
    id_con_rel: null,
    treg: "1",
    calle: "",
    calle2: "",
    id_dst: null,
    id_prv: null,
    id_dpt: null,
    cp: "",
    id_pais: null,
    pt_trab: "",
    telf: "",
    movil: "",
    email: "",
    web: "",
    id_cti: null,
    tag_eti: [],
    id_cdp_ven: null,
    id_ldp: null,
    id_cdp_com: null,
    cod_barras: "",
    id_pfi: null,
    referencia: "",
    id_cin: null,
    notas_internas: "",
  },
  grid: {
    idRow: "id_con",
    col_name: "dsc_con",
    idRow_db: 'con.id_con',
    kanban: {
      box: {
        fnc: "fnc_cia_ct_con",
        id: "id_con",
        // fav: 'fav',
        image: "data_img",
        title: "dsc_con",
        subtitle: "dsc_con_rel",
        desc1: "dsc_prv__dsc_pais",
        desc2: "email",
      },
    },
    list: {
      columns: [
        {
          header: "Nombre",
          accessorKey: "dsc_con",
          align: "left"
        },
        {
          header: "Móvil",
          accessorKey: "movil",
          size: 180,
          align: "left"
        },
        {
          header: "Correo electrónico",
          accessorKey: "email",
          size: 350,
          align: "left"
        },
        {
          header: "Departamento",
          accessorKey: "dsc_dpt",
          size: 200,
        },
        {
          header: "País",
          accessorKey: "dsc_pais",
          size: 120,
          cell: (props) => (<div className="text-cyan-600">{props.getValue()}</div>)
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
          title: 'Personas',
          type: 'check',
          key: 'tcon_I'
        },
        {
          title: 'Empresas',
          type: 'check',
          key: 'tcon_C'
        },
      ]
    },
    {
      list: [
        {
          title: 'Facturas de clientes',
          type: 'check',
          key: 'facturas_clientes'
        },
        {
          title: 'Facturas de proveedores',
          type: 'check',
          key: 'facturas_proveedores'
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
          title: 'Tipo',
          type: 'check',
          key: 'tcon_dsc',
        },
        {
          title: 'País',
          type: 'check',
          key: 'dsc_pais'
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
    imagenFields: ["data_img"],
    auditoria: true,
    frm_photo: (watch, control, errors, editConfig={}, frmState ) => (
      <FrmPhoto watch={watch} control={control} errors={errors} frmState={frmState} editConfig={editConfig} />
    ),
    frm_top_title: (control, errors, editConfig={}, frmState) => (
      <TopTitle control={control} errors={errors} editConfig={editConfig} frmState={frmState} options={topTitleOptions}/>
    ),
    frm_title: (control, errors, editConfig={}, frmState) => (
      <FrmTitle control={control} errors={errors} editConfig={editConfig} frmState={frmState}/>
    ),
    frm_sub_title: (control, errors, watch, setValues, editConfig={}, frmState) => (
      <Subtitle
        control={control}
        errors={errors}
        fnc_name={"fnc_cia_ct_con"}
        watch={watch}
        setValues={setValues}
        editConfig={editConfig}
        frmState={frmState}
      />
    ),
    frm_middle: (control, errors, watch, setValues, editConfig={}, frmState) => (
      <FrmMiddle setValues={setValues} watch={watch} control={control} frmState={frmState} errors={errors} editConfig={editConfig} />
    ),
    frm_middle_right: (control, errors, setValues, watch, editConfig, frmState) => (
      <FrmMiddleRight setValues={setValues} watch={watch} control={control} frmState={frmState} errors={errors} editConfig={editConfig}/>
    ),

    tabs: [
      {
        name: "Contactos y direcciones",
        content: (watch, control, errors, editConfig={}, frmState) => (
          <FrmTab0 control={control} errors={errors} editConfig={editConfig} frmState={frmState}/>
        ),
      },
      {
        name: "Venta y compra",
        content: (watch, control, errors, editConfig={}, frmState) => (
          <FrmTab1 watch={watch} control={control} errors={errors} editConfig={editConfig} frmState={frmState}/>
        ),
      },
      {
        name: "Facturación / Contabilidad",
        // content:()=>(<h2>content3</h2>),
      },
      {
        name: "Notas Internas",
        content: (watch, control, errors, editConfig={}, frmState) => (
          <FrmTab3 control={control} errors={errors} editConfig={editConfig} frmState={frmState}/>
        ),
      },
    ],
  },
};

export default Frm_101_config;
