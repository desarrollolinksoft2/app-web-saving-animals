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
  } from "./frm_104";
  
  const Frm_104_config = {
    title: "Títulos de contacto",
    dsc: "Título de contacto",
    view_default: "list",
    fnc_name: "fnc_cia_ct_cti",
    configControls: {},
    fnc_valid: (data) => {
      if (!data["dsc_cti"]) {
        return null;
      }
      return data;
    },
    default_values: {
      dsc_cti: "",
      abr_cti: "",
    },
    grid: {
      idRow: "id_cti",
      col_name: "dsc_cti",
      idRow_db: "cti.id_cti",
      kanban: {
        box: {
          id: "id_cti",
          title: "dsc_cti",
          //   subtitle: "dsc_con_rel",
          //   desc1: "dsc_prv__dsc_pais",
          //   desc2: "email",
        },
      },
      list: {
        columns: [
          {
            header: "Título",
            accessorKey: "dsc_cti",
            align: "left",
          },
          {
            header: "Abreviatura",
            accessorKey: "abr_cti",
            size: 400,
            align: "left",
          },
        ],
      },
    },
  
    filters: [],
    group_by: [],
  
    configControls: {},
  
    form_inputs: {
      imagenFields: [],
      auditoria: false,
      frm_middle: (control, errors, watch, setValues, editConfig = {}) => (
        <FrmMiddle
          setValues={setValues}
          watch={watch}
          control={control}
          errors={errors}
          editConfig={editConfig}
        />
      ),
    },
  };
  
  export default Frm_104_config;
  