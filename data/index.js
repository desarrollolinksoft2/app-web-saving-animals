'use server'
import supabaseClient from "@/lib/supabase"

export async function fncExecute(fnc_name, id_gpo, ccod_user, caccion, cod_cia, form) {

    const supabase = await supabaseClient()
    
    // console.log(fnc_name)
    // console.log(id_gpo)
    // console.log(ccod_user)
    // console.log(caccion)
    // console.log(form)

    let query = {
        ic_fnc: fnc_name,
        in_id_gpo: id_gpo,
        in_id_cia: cod_cia,
        in_id_usu: ccod_user,
        ic_accion: caccion,
        ij_data: form?form:[]
    }
    console.log(query)
    const res = await supabase.rpc('fnc_execute2', query)
    // console.log(res)
    // console.log('respuesta line 16'+JSON.stringify(res))
    return JSON.stringify(res)
}


/*******manage bucket *********/

export async function uploadFile(bucketName, filePath, file, type) {
    const supabase = await supabaseClient()
    const res = await supabase.storage.from(bucketName).upload(filePath, file, type)
    return JSON.stringify(res)
}

export async function getPublicUrl(bucketName, filePath) {
    const res = supabase.storage.from(bucketName).getPublicUrl(filePath);
    return JSON.stringify(res)
}

export async function deleteFile(bucketName, filePath) {
    const res = supabase.storage.from(bucketName).remove([filePath]);
    return JSON.stringify(res)
}