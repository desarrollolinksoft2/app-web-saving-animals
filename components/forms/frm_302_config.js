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
} from "./frm_302";

const Frm_302_config = {
  title: "Categorías de productos",
  dsc: "Categoría",
  view_default: "list",
  views:  ["list"],
  fnc_name: "fnc_inv_ct_cat",
  fnc_valid: (data) => {
    if (!data["dsc_cat"]) {
      return null;
    }
    return data;
  },

  default_values: {
    dsc_cat: "",
    dsc_cat_full: "",
    dsc_cat_rel: "",
    id_cat_rel: null,
  },
  grid: {
    idRow: "id_cat",
    col_name: "dsc_cat_full",
    idRow_db:'id_cat',
    kanban: {},
    list: {
      columns: [
        {
          header: "Categoría del producto",
          accessorKey: "dsc_cat_full",
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

    frm_title: (control, errors, editConfig={}) => (
      <FrmTitle control={control} errors={errors} editConfig={editConfig} />
    ),
    
    frm_middle: (control, errors, watch, setValues, editConfig={}, frmState) => (
      <FrmMiddle setValues={setValues} watch={watch} control={control} frmState={frmState} errors={errors} editConfig={editConfig} />
    ),

  },
};

export default Frm_302_config;
