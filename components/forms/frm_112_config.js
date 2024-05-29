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
  } from "./frm_112";
  
  const Frm_112_config = {
    title: "Cuentas bancarias",
    dsc: "Número de cuenta",
    view_default: "list",
    views:  ["list"],
    fnc_name: "fnc_cia_ct_con_cba",
    fnc_valid: (data) => {
      if (!data["num_cba"]) {
        return null;
      }
      return data;
    },
  
    default_values: {
      id_cia: null,
      status: "",
      num_cba: "",
      id_ban: null,
      nom_titular: "",
      id_con: null,
      id_div: null,
    },
    grid: {
      idRow: "id_cba",
      col_name: "num_cba",
      idRow_db: 'cba.id_cba',
      kanban: {},
      list: {
        columns: [
          {
            header: "Número de cuenta",
            accessorKey: "num_cba",
            align: "left"
          },
          {
            header: "Banco",
            accessorKey: "nom_ban",
            size: 350,
          },
          {
            header: "Compañía",
            accessorKey: "dsc_cia",
            size: 270,
          },
          
          {
            header: "Titular",
            accessorKey: "dsc_con",
            size: 300,
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
            key: '1'
          },
          {
            title: 'Empresas',
            type: 'check',
            key: '2'
          },
        ]
      },
      {
        list: [
          {
            title: 'Facturas de cliente',
            type: 'check',
            key: '3'
          },
          {
            title: 'Facturas de proveedores',
            type: 'check',
            key: '4'
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
            title: 'Vendedor',
            type: 'check',
            key: '1'
          },
          {
            title: 'Empresa',
            type: 'check',
            key: '2'
          },
        ]
      },
    ],

    configControls: {},
    
    form_inputs: {
      imagenFields: [],
      auditoria: true,

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
  
  export default Frm_112_config;
  