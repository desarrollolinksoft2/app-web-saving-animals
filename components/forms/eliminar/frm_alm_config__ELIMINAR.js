const { default: Frm_alm } = require("./frm_alm");

const Frm_alm_config = {
    title: 'Almacén',
    dsc: 'Almacén',
    form: <Frm_alm />,
    view_default: 'kanban',
    grid:{
        idRow: 'id',
        col_name: '',
        kanban:{},
        list:{},        

    }
}

export default Frm_alm_config