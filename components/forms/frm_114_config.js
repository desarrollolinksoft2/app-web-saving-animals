import {
    Frm_bar_buttons,
    Frm_bar_status,
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
  } from "./frm_114";
  
  const Frm_114_config = {
    title: "Usuarios",
    dsc: "Nombre",
    view_default: "list",
    views:  ["kanban", "list"],
    fnc_name: "fnc_cia_ct_usu",
    fnc_valid: (data) => {
      if (!data["dsc_usu"]) {
        return null;
      }
      return data;
    },
  
    default_values: {
      id_con: null,
      data_img: null,
      status: "",
      email: "",
      email_status: "",
      id_cia: null,
    },
    grid: {
      idRow: "id_usu",
      col_name: "dsc_usu",
      idRow_db: 'usu.id_usu',
      kanban: {
        box: {
          id: "id_usu",
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
            header: "Nombre",
            accessorKey: "dsc_usu",
            align: "left"
          },
          {
            header: "Usuario",
            accessorKey: "email",
            size: 250,
          },
          {
            header: "Última autenticación",
            accessorKey: "email_status",
            size: 200,
          },
          {
            header: "Compañía",
            accessorKey: "dsc_cia",
            size: 200,
          },
          {
            header: "Estado",
            accessorKey: "email_status",
            size: 150,
          },
        ],
      },
    },
  
    filters: [],
    group_by: [],
    configControls: {},

    form_inputs: {
      imagenFields: ["data_img"],
      auditoria: false,

      frm_bar_buttons: (control, errors,editConfig={}) => (
        <Frm_bar_buttons control={control} errors={errors} editConfig={editConfig} />
      ),
      frm_bar_status: (control, errors,editConfig={}) => (
        <Frm_bar_status control={control} errors={errors} editConfig={editConfig} />
      ),
      frm_photo: (watch, control, errors, editConfig={} ) => (
        <FrmPhoto watch={watch} control={control} errors={errors} editConfig={editConfig} />
      ),
      frm_title: (control, errors, editConfig={}) => (
        <FrmTitle control={control} errors={errors} editConfig={editConfig} />
      ),
      frm_sub_title: (control, errors, watch, setValues, editConfig={}, frmState) => (
        <Subtitle
          control={control}
          errors={errors}
          fnc_name={""}
          watch={watch}
          setValues={setValues}
          editConfig={editConfig}
          frmState={frmState}
        />
      ),
  
      tabs: [
        {
          name: "Permisos de acceso",
          content: (watch, control, errors, setValues, editConfig={}) => (
            <FrmTab0 watch={watch} control={control} errors={errors} setValues={setValues} editConfig={editConfig} />
          ),
        },
      ],

    },
  };
  
  export default Frm_114_config;
  