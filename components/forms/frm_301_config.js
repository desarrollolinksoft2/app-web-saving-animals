import {
  FrmMiddle,
  FrmMiddleRight,
  FrmPhoto,
  FrmSearch,
  FrmTab0,
  FrmTab1,
  FrmTab2,
  FrmTab3,
  FrmTab4,
  FrmStar,
  FrmTitle,
  Subtitle,
  TopTitle,
} from "./frm_301";

const Frm_301_config = {
  title: "Productos",
  dsc: "Nombre del producto",
  view_default: "list",
  views: ["kanban", "list"],
  fnc_name: "fnc_inv_ct_pdt",
  fnc_valid: (data) => {
    //default: (data)=>{return data}
  //   if (data["tcon"] === "C") {
  //     data["id_con_rel"] = null;
  //   }
  //   if(!data["dsc_con"]){
  //     return null;
  //   }
    return data;
  },
  default_values: {
    id_cia: null,
    status: '',
    fav : false,
    dsc_pdt: '',
    data_img: null,
    bvender: false,
    bcomprar: false,
    tpdt: '',
    id_udm: null,
    id_udm_compra: null,
    precio_venta: '',
    costo: '',
    id_cat: null,
    ref_interna: '',
    cod_barras: '',
    notas_internas: '',
    dsc_venta: '',
    bdtpv: false,
    tag_imp_v: '',
    dsc_compra: '',
    dsc_recepcion: '',
    dsc_entrega: '',
    id_unspsc: null,
  },
  grid: {
    idRow: "id_pdt",
    col_name: "dsc_pdt",
    idRow_db:'pdt.id_pdt',
    kanban: {
      box: {
        fnc: "fnc_inv_ct_pdt",
        id: "id_pdt",
        fav: 'fav',
        image: "data_img",
        title: "dsc_pdt",
        subtitle: "dsc_con_rel",
      //   desc1: "dsc_prv__dsc_pais",
      //   desc2: "email",
      },
    },
    list: {
      columns: [
        {
          header: "Nombre",
          accessorKey: "dsc_pdt",
        },
      //   {
      //     header: "Móvil",
      //     accessorKey: "movil",
      //     size: 250,
      //   },
      //   {
      //     header: "Correo electrónico",
      //     accessorKey: "email",
      //     size: 500,
      //   },
      //   {
      //     header: "Ciudad",
      //     accessorKey: "id_dst",
      //     size: 150,
      //   },

      //   {
      //     header: "País",
      //     accessorKey: "id_pais",
      //     size: 100,
      //   },
      ],
    },
  },
 
  filters: [
    {
      list: [
          {
            title: 'Servicios',
            type: 'check',
            key: '1'
          },
          {
            title: 'Productos',
            type: 'check',
            key: '2'
          },
      ]
    },
    {
      list: [
          {
            title: 'Disponible en TPV',
            type: 'check',
            key: '3'
          },
          {
            title: 'Puede ser vendido',
            type: 'check',
            key: '4'
          },
          {
            title: 'Puede ser comprado',
            type: 'check',
            key: '4'
          },
      ]
    },
    {
      list: [
          {
            title: 'Favoritos',
            type: 'check',
            key: '3'
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
            title: 'Tipo de producto',
            type: 'check',
            key: '1'
          },
          {
            title: 'Categoría de producto',
            type: 'check',
            key: '2'
          },
          {
            title: 'Categoría de producto de TPV',
            type: 'check',
            key: '2'
          },
      ]
    },
  ],

  configControls: {},

  form_inputs: {
    imagenFields: ["data_img"],
    auditoria: true,
    
    frm_photo: (watch, control, errors, editConfig={}) => (
      <FrmPhoto watch={watch} control={control} errors={errors} editConfig={editConfig} />
    ),

    frm_star: (control, errors, watch, setValue, editConfig={}) => (
      <FrmStar control={control} errors={errors} watch={watch} setValue={setValue} editConfig={editConfig} />
    ),

    frm_title: (control, errors, editConfig={}) => (
      <FrmTitle control={control} errors={errors} editConfig={editConfig}/>
    ),
    
    frm_sub_title: (control, errors, watch, setValues, editConfig={}) => (
      <Subtitle
        control={control}
        errors={errors}
        fnc_name={"fnc_cia_ct_con"}
        watch={watch}
        setValues={setValues}
        editConfig={editConfig}
      />
    ),
   
    tabs: [
      {
        name: "Información general",
        content: (watch, control, errors, editConfig={}) => (
          <FrmTab0 watch={watch} control={control} errors={errors} editConfig={editConfig}/>
        ),
      },
      {
        name: "Ventas",
        content: (watch, control, errors, editConfig={}) => (
          <FrmTab1 watch={watch} control={control} errors={errors} editConfig={editConfig} />
        ),
      },
      {
        name: "Compras",
        content: (watch, control, errors, editConfig={}) => (
          <FrmTab2 watch={watch} control={control} errors={errors} editConfig={editConfig} />
        ),
      },
      {
        name: "Inventario",
        content: (watch,control, errors, editConfig={}) => (
          <FrmTab3 control={control} errors={errors} editConfig={editConfig}/>
        ),
      },
      {
        name: "Contabilidad",
        content: (watch,control, errors, editConfig={}) => (
          <FrmTab4 control={control} errors={errors} editConfig={editConfig}/>
        ),
      },
    ],
  },
};

export default Frm_301_config;
