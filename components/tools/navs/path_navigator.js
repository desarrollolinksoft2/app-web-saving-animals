const pathNavigator = (pathname, route, searchparams, keys, deleteKeys = null,deleteAll=false) => {

    let params = deleteAll? new URLSearchParams(): new URLSearchParams(searchparams.toString());
    //reemplazar parametros
    for (let key in keys) {
        if (keys.hasOwnProperty(key)) {
            params.set(key, keys[key])
        }
    }
    //eliminar parametros
    if (deleteKeys) {
        deleteKeys.forEach(key => {
            params.delete(key)
        });
    }
    //navegar a la nueva ruta
    route.replace(pathname + "?" + params.toString())

}
export default pathNavigator