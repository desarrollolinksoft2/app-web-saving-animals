import {
    FrmMiddle,
  } from "./frm_105";
  
  const Frm_105_config = {
    title: "Industrias",
    dsc: "Industrias",
    view_default: "list",
    fnc_name: "fnc_cia_ct_cin",
    fnc_valid: (data) => {
      if (!data["nom_cin"]) {
        return null;
      }
      return data;
    },
    default_values: {
      status: "",
      nom_cin: "",
      nomc_cin: "",
    },
    grid: {
      idRow: "id_cin",
      col_name: "nomc_cin",
      idRow_db: "cin.id_cin",
      kanban: {},
      list: {
        columns: [
          {
            header: "Nombre",
            accessorKey: "nom_cin",
            align: "left",
            size: 200,
          },
          {
            header: "Nombre completo",
            accessorKey: "nomc_cin",
            align: "left",
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
  
  export default Frm_105_config;
  