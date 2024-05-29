
import TextControlled from "../tools/inputs/text_controlled"
import Frm_alm_prd, { FrmMiddle, FrmMiddleRight, FrmPhoto, FrmTab0, FrmTab3, FrmTitle, Subtitle, TopTitle } from "./frm_alm_prd"

const Frm_alm_prd_config = {
    title: 'Producto',
    dsc: 'almacen Producto',
    form: <Frm_alm_prd />,
    view_default: 'list',
    fnc_name: "fnc_al_ct_it",
    grid:{
        idRow: 'id_al_ct_it',
        col_name: 'cdsc_it',
        kanban:{
          box:{
            id:'id_al_ct_it',
            image:'cimg_dft',
            title:'cdsc_it',
            subtitle:'cdsc_lin',
            desc1:'cdsc_slin',
            desc2:'cdsc_um',
          }
        },
        list:{
            columns:[
                {
                    header:'descripción',
                    accessorKey: 'cdsc_it',
                    
                  },
                  {
                    header:'Línea',
                    accessorKey: 'cdsc_lin',
                    size:250,
                  },
                  {
                    header:'subLínea',
                    accessorKey: 'cdsc_slin',
                    size:200,
                  },
                  {
                    header:'Codigo',
                    accessorKey: 'ccod_it',
                    size:100,
                  },
                  
                  {
                    header:'U/M',
                    accessorKey: 'cdsc_um',
                    size:150,
                  },
                  {
                    header:'Estado',
                    accessorKey: 'cest',
                    size:80,
                  }
            ]
        },
    },
    form_inputs:{
      auditoria:true,
      frm_photo: (control, errors)=>(<FrmPhoto control={control} errors={errors} />),
      frm_top_title: (control, errors)=>(<TopTitle control={control} errors={errors} />),
      frm_title: (control, errors)=>(<FrmTitle control={control} errors={errors} />),
      frm_sub_title: (control, errors)=>(<Subtitle control={control} errors={errors} />),
      frm_middle: (control, errors)=>(<FrmMiddle control={control} errors={errors} />),
      frm_middle_right: (control, errors)=>(<FrmMiddleRight control={control} errors={errors} />),

      tabs:[
        {
          name: 'Contactos y direcciones',
          content:(control, errors)=>(<FrmTab0 control={control} errors={errors} />),
        },
        {
          name: 'Venta y compra',
          // content:(control,errors)=>(<FrmTab1 control={control} errors={errors} />),
        },
        {
          name: 'Facturación / Contabilidad',
          // content:()=>(<h2>content3</h2>),
        },
        {
          name: 'Notas Internas',
          content:(control,errors)=>(<FrmTab3 control={control} errors={errors} />),
        }

      ]
    }
}

export default Frm_alm_prd_config