const validaInput = (name,config,state ) => {
    if(!config) return false;
    if(state==='v') return false;

    if (config.hasOwnProperty(name)) {
        let obj = config[name];
        // if(name==='id_con_rel'){
        //     console.log(obj)
        //     console.log(state)
        // }
        if(obj.hasOwnProperty(`hb_${state}`)) 
        {
            // console.log(obj[`hb_${state}`])
            return obj[`hb_${state}`];
        }else{
            return true;
        }
    } else {
        return true; 
    }
}

export default validaInput;