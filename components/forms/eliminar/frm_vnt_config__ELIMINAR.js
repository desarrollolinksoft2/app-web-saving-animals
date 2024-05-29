import Frm_vnt from "./frm_vnt"

const Frm_vnt_config = {
    title: 'Ventas',
    dsc: 'ventas',
    form: <Frm_vnt />,
    view_default: 'kanban',
    grid:{
        idRow: 'id',
        col_name: '',
        kanban:{},
        list:{},        

    }
}

export default Frm_vnt_config