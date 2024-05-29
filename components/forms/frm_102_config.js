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
  } from "./frm_102";
  
  const Frm_102_config = {
    title: "Compañías",
    dsc: "Nombre de la compañía",
    view_default: "list",
    views:  ["kanban", "list"],
    fnc_name: "fnc_cia_ct_cia",
    fnc_valid: (data) => {
      if (!data["dsc_cia"]) {
        return null;
      }
      return data;
    },
  
    default_values: {
      id_con: null,
      data_img: null,
      cod_tdir: "",
      nif: "",
      id_div: null,
      
      dsc_cia: "",

      calle: "",
      calle2: "",
      id_dst: null,
      id_prv: null,
      id_dpt: null,
      cp: "",
      id_pais: null,

      telf: "",
      movil: "",
      email: "",
      web: "",
    },
    grid: {
      idRow: "id_cia",
      col_name: "dsc_cia",
      idRow_db: 'cia.id_cia',
      kanban: {
        box: {
          id: "id_cia",
          // fav: 'fav',
          image: "data_img",
        //   title: "dsc_cia",
        //   subtitle: "dsc_con_rel",
        //   desc1: "dsc_prv__dsc_pais",
        //   desc2: "email",
        },
      },
      list: {
        columns: [
          {
            header: "Nombre de la compañía",
            accessorKey: "dsc_cia",
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
          },
        ],
      },
    },
  
    filters: [],
    group_by: [],
    configControls: {},

    form_inputs: {
      imagenFields: ["data_img"],
      auditoria: true,

      frm_photo: (watch, control, errors, editConfig={} ) => (
        <FrmPhoto watch={watch} control={control} errors={errors} editConfig={editConfig} />
      ),

      frm_title: (control, errors, editConfig={}) => (
        <FrmTitle control={control} errors={errors} editConfig={editConfig} />
      ),
  
      tabs: [
        {
          name: "Información general",
          content: (watch, control, errors, setValues, editConfig={}) => (
            <FrmTab0 watch={watch} control={control} errors={errors} setValues={setValues} editConfig={editConfig} />
          ),
        },
      ],

    },
  };
  
  export default Frm_102_config;
  