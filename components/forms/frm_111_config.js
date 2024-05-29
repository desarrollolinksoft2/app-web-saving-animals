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
  } from "./frm_111";
  
  const Frm_111_config = {
    title: "Bancos",
    dsc: "Nombre",
    view_default: "list",
    views:  ["list"],
    fnc_name: "fnc_cia_ct_ban",
    fnc_valid: (data) => {
      if (!data["nom_ban"]) {
        return null;
      }
      return data;
    },
  
    default_values: {
      status: "",
      nom_ban: "",
      cod_iban: "",
      calle: "",
      calle2: "",
      id_dst: null,
      id_prv: null,
      id_dpt: null,
      cp: "",
      id_pais: null,
      telf: "",
      email: "",
    },
    grid: {
      idRow: "id_ban",
      col_name: "nom_ban",
      idRow_db: 'ban.id_ban',
      kanban: {},
      list: {
        columns: [
          {
            header: "Nombre",
            accessorKey: "nom_ban",
            align: "left"
          },
          {
            header: "Código de identificación bancaria (BIC/SWIFT)",
            accessorKey: "cod_iban",
            size: 700,
          },
          {
            header: "País",
            accessorKey: "dsc_pais",
            size: 120,
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

      frm_title: (control, errors, editConfig={}) => (
        <FrmTitle control={control} errors={errors} editConfig={editConfig} />
      ),

      frm_middle: (control, errors, watch, setValues, editConfig={}, frmState) => (
        <FrmMiddle setValues={setValues} watch={watch} control={control} frmState={frmState} errors={errors} editConfig={editConfig} />
      ),
      
      frm_middle_right: (control, errors, setValues, watch, editConfig, frmState) => (
        <FrmMiddleRight setValues={setValues} watch={watch} control={control} frmState={frmState} errors={errors} editConfig={editConfig}/>
      ),

    },
  };
  
  export default Frm_111_config;
  