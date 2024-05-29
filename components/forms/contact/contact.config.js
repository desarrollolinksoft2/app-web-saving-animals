
import { FrmTab3 } from "../frm_101";
import { address_topTitleOptions } from "./contact.const";
import { GeneralTopTitle, GeneralMiddleLeft, ModalContactMiddleRight } from "./form";
  
  const Frm_modal_contact_config = {
    title: "Contactos y dirección",
    dsc: "Contactos y dirección",
    view_default: "form",
    views: [],
    fnc_name: "fnc_cia_ct_con",
    fnc_valid: (data) => {
      //default: (data)=>{return data}
      if (data["tcon"] === "C") {
        data["id_con_rel"] = null;
      }
      if (!data["dsc_con"]) {
        return null;
      }
      return data;
    },
  
    default_values: {
      id_cia: null,
      status: "",
      tcon: "Contact",
      dsc_con: "",
      data_img: null,
      id_icon: null,
      dcon_num: "",
      id_con_rel: null,
      treg: "1",
      calle: "",
      calle2: "",
      id_dst: null,
      id_prv: null,
      id_dpt: null,
      cp: "",
      id_pais: null,
      pt_trab: "",
      telf: "",
      movil: "",
      email: "",
      web: "",
      id_cti: null,
      tag_eti: [],
      id_cdp_ven: null,
      id_ldp: null,
      id_cdp_com: null,
      cod_barras: "",
      id_pfi: null,
      referencia: "",
      id_cin: null,
      notas_internas: "",
    },
    grid: {
      idRow: "id_con",
      col_name: "dsc_con",
      idRow_db: 'con.id_con',
      kanban: {
        box: {
          fnc: "fnc_cia_ct_con",
          id: "id_con",
          // fav: 'fav',
          image: "data_img",
          title: "dsc_con",
          subtitle: "dsc_con_rel",
          desc1: "dsc_prv__dsc_pais",
          desc2: "email",
        },
      },
      list: {
        columns: [
          {
            header: "Nombre",
            accessorKey: "dsc_con",
            align: "left"
          },
          {
            header: "Móvil",
            accessorKey: "movil",
            size: 180,
            align: "left"
          },
          {
            header: "Correo electrónico",
            accessorKey: "email",
            size: 350,
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
            cell: (props) => (<div className="text-cyan-600">{props.getValue()}</div>)
          },
          {
            header: "Compañía",
            accessorKey: "dsc_cia",
            size: 210,
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
            key: 'tcon_I'
          },
          {
            title: 'Empresas',
            type: 'check',
            key: 'tcon_C'
          },
        ]
      },
      {
        list: [
          {
            title: 'Facturas de clientes',
            type: 'check',
            key: 'facturas_clientes'
          },
          {
            title: 'Facturas de proveedores',
            type: 'check',
            key: 'facturas_proveedores'
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
            title: 'Tipo',
            type: 'check',
            key: 'tcon_dsc',
          },
          {
            title: 'País',
            type: 'check',
            key: 'dsc_pais'
          },
        ]
      },
    ],
  
    configControls: {
      // tcon:{
      //   hb_e: false
      // },
      // id_con_rel: {
      //   hb_e: false
      // },
      // dsc_con: {
      //   hb_e: false
      // },
      // dcon_num: {
      //   hb_e: false
      // },
      // telf: {
      //   hb_e: false
      // },
      // data_img:{
      //   hb_n: false
      // }
    },
    
    form_inputs: {
      auditoria: false,
      frm_top_title: (control, errors, editConfig={}, frmState) => (
        <GeneralTopTitle control={control} errors={errors} editConfig={editConfig} frmState={frmState} options={address_topTitleOptions}/>
      ),
      frm_title: (control, errors, editConfig={}, frmState) => (
        <></>
      ),
      frm_middle: (control, errors, watch, setValues, editConfig={}, frmState) => (
        <GeneralMiddleLeft setValues={setValues} watch={watch} control={control} frmState={frmState} errors={errors} editConfig={editConfig} />
      )    
      ,
      frm_middle_right: (control, errors, setValues, watch, editConfig, frmState) => (
        
        <ModalContactMiddleRight setValues={setValues} watch={watch} control={control} frmState={frmState} errors={errors} editConfig={editConfig}/>
      ),
      frm_middle_bottom:(control,errors,editConfig,frmState)=>(
        <FrmTab3 control={control} errors={errors} editConfig={editConfig} frmState={frmState}/>
      )
    },
  };
  
  export default Frm_modal_contact_config;
  