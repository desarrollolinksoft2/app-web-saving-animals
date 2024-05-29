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
  } from "./frm_101";
  
  const Frm_603_config = {
    title: "Clientes",
    dsc: "Clientes",
    view_default: "kanban",
    fnc_name: "fnc_cia_ct_con",
    configControls:{},
    fnc_valid: (data) => {
      //default: (data)=>{return data}
      if (data["tcon"] === "C") {
        data["id_con_rel"] = null;
      }
      if(!data["dsc_con"]){
        return null;
      }
      return data;
    },
  
    default_values: {
      // id_con: null,
      tcon: "C",
      // tcon_dsc: "",
      dsc_con: "",
      id_icon: null,
      dcon_num: "",
      id_con_rel: null,
      tcon: "1",
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
      notas_int: "",
      id_cdp_ven: null,
      id_tfa: null,
      id_cdp_com: null,
      data_img: null,
    },
    grid: {
      idRow: "id_con",
      col_name: "dsc_con",
      idRow_db:'con.id_con',
      kanban: {
        box: {
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
            header: "Nombres",
            accessorKey: "dsc_con",
          },
          {
            header: "Móvil",
            accessorKey: "movil",
            size: 250,
          },
          {
            header: "Correo electrónico",
            accessorKey: "email",
            size: 500,
          },
          {
            header: "Ciudad",
            accessorKey: "id_dst",
            size: 150,
          },
  
          {
            header: "País",
            accessorKey: "id_pais",
            size: 100,
          },
        ],
      },
    },
    form_inputs: {
      imagenFields: ["data_img"],
      auditoria: true,
      frm_photo: (watch, control, errors, editConfig={}) => (
        <FrmPhoto watch={watch} control={control} errors={errors} editConfig={editConfig} />
      ),
      frm_top_title: (control, errors,editConfig={}) => (
        <TopTitle control={control} errors={errors} editConfig={editConfig} />
      ),
      frm_title: (control, errors,editConfig={}) => (
        <FrmTitle control={control} errors={errors} editConfig={editConfig}/>
      ),
      frm_sub_title: (control, errors, watch, setValues,editConfig={}) => (
        <Subtitle
          control={control}
          errors={errors}
          fnc_name={"fnc_cia_ct_con"}
          watch={watch}
          setValues={setValues}
          editConfig={editConfig}
        />
      ),
      frm_middle: (control, errors,watch, setValues,editConfig={}) => (
        <FrmMiddle setValues={setValues} watch={watch} control={control} errors={errors} editConfig={editConfig}/>
      ),
      frm_middle_right: (control, errors,editConfig={}) => (
        <FrmMiddleRight control={control} errors={errors} editConfig={editConfig}/>
      ),
  
      tabs: [
        {
          name: "Contactos y direcciones",
          content: (watch,control, errors,editConfig={}) => (
            <FrmTab0 control={control} errors={errors} editConfig={editConfig}/>
          ),
        },
        {
          name: "Venta y compra",
          content: (watch, control, errors,editConfig={}) => (
            <FrmTab1 watch={watch} control={control} errors={errors} editConfig={editConfig}/>
          ),
        },
        {
          name: "Facturación / Contabilidad",
          // content:()=>(<h2>content3</h2>),
        },
        {
          name: "Notas Internas",
          content: (watch,control, errors,editConfig={}) => (
            <FrmTab3 control={control} errors={errors} editConfig={editConfig}/>
          ),
        },
      ],
    },
  };
  
  export default Frm_603_config;
  