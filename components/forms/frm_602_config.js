import { FrmMiddle, FrmTitle, Subtitle } from "./frm_602";

const Frm_602_config = {
  title: "Condiciones de pago",
  dsc: "Condición de pago",
  view_default: "list",
  fnc_name: "fnc_fac_ct_cdp",
  configControls: {},
  fnc_valid: (data) => {
    if (!data["dsc_cdp"]) {
      return null;
    }
    return data;
  },

  default_values: {
    dsc_cdp: "",
    id_cia: null,
  },
  grid: {
    idRow: "id_cdp",
    col_name: "dsc_cdp",
    idRow_db: "cdp.id_cdp",
    kanban: {
      box: {
        id: "id_cdp",
        // fav: 'fav',
        //   image: "data_img",
        title: "dsc_cdp",
        //   subtitle: "dsc_con_rel",
        //   desc1: "dsc_prv__dsc_pais",
        //   desc2: "email",
      },
    },
    list: {
      columns: [
        {
          header: "Nombres",
          accessorKey: "dsc_cdp",
        },
      ],
    },
  },

  filters: [
    {
      list: [
        {
          title: "Archivado",
          type: "check",
          key: "status_I",
        },
      ],
    },
  ],

  group_by: [],
  configControls: {},

  form_inputs: {
    imagenFields: [],
    auditoria: false,

    frm_title: (control, errors, editConfig = {}) => (
      <FrmTitle control={control} errors={errors} editConfig={editConfig} />
    ),

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

export default Frm_602_config;
