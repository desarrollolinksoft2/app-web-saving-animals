const ValidaEstado=(formStatus, field,ve_BD=false, n_bd=null )=>{
    // if(isAction){
    //     var actions= {v:false, e:false, d:false }
    //     actions.v=field[`ac_view_${formStatus}`]
    //     actions.e=field[`ac_edit_${formStatus}`]
    //     actions.d=field[`ac_del_${formStatus}`]
    //     return actions
    // }
    // console.log(n_bd)
    var props={readOnly:null, hidden: null}
    
    props.readOnly=(typeof field[`hb_${formStatus}`]==='undefined') ? false:!field[`hb_${formStatus}`]
    props.hidden=(typeof field[`vs_${formStatus}`]==='undefined') ? false:!field[`vs_${formStatus}`]
    if(formStatus==='e' && ve_BD===true) {
        // console.log('vamos a validar')
        props.readOnly= n_bd==1? true: false
        props.hidden= n_bd==1? true: false
    }
    return props
}

export default ValidaEstado

