'use server'

import supabaseClient from "@/lib/supabase"


export const signInWithEmail = async (email,password) => {
    const supabase = await supabaseClient()
    const result = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    return JSON.stringify(result)
}

export const signOut = async () => {
    const supabase =await supabaseClient()
    const result = await supabase.auth.signOut()
    return JSON.stringify(result)
}

export async function readUserSession(){
    const supabase= await supabaseClient()

    return supabase.auth.getSession();
    
}

///////traer datos de la empresa del usuario

export async function getDataEmpresa(idusu) {
    
    const supabase = await supabaseClient()
    const res = await supabase.rpc('get_sessiondata',{idusu})
console.log(res);
    return JSON.stringify(res)
}