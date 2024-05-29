import ColorSquare from "../interfaces/color-square";
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
} from "./frm_103";

const Frm_103_config = {
  title: "Etiquetas de contacto",
  dsc: "Etiquetas de contacto",
  view_default: "list",
  views: ["list"],
  fnc_name: "fnc_cia_ct_cet",
  configControls: {},
  fnc_valid: (data) => {
    if (!data["dsc_cet"]) {
      return null;
    }
    return data;
  },
  default_values: {
    status: "",
    dsc_cet: "",
    color_cet: "",
    id_cet_rel: null,
    status_switch: null,
  },
  grid: {
    idRow: "id_cet",
    col_name: "dsc_cet_full",
    idRow_db: "cet.id_cet",
    kanban: {},
    list: {
      columns: [
        {
          header: "Etiqueta",
          accessorKey: "dsc_cet_full",
          align: "left",
        },
        {
          header: "Color",
          accessorKey: "color_cet",
          size: 250,
          align: "right",
          cell: (row)=>(<ColorSquare color={row.getValue()}  />)
        },
      ],
    },
  },

  filters: [
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

export default Frm_103_config;
