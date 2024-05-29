import { getDataEmpresa } from "@/data/auth"
import useAppStore from "./zustand"

export const createUserSlice = (set, get) => ({
    user: null,
    setUserSession:  (user) => {
        set((state)=>({ user: user }))

    },
    userData: null,
    userError: null,
    userEmpSelected: [],
    setUserEmpSelected: (emp) => {
        set((state) => ({ userEmpSelected: (state.userEmpSelected = emp) }))
    },
    userCiaEmp: [],
    setUserData: async () => {
        try {
            // console.log(get().user)
            let res = await getDataEmpresa(get().user.id)
            let {data, error} = JSON.parse(res)

            if(data?.[0]){
            set((state) => ({ userData: (state.userData = data[0].oj_data[0]) }))
            }else{
                set((state) => ({ userError: (state.userError = error) }))
            }

            // let emps = await get().executeFnc('fnc_cia_ct_cia','s',null)
            let emps = await useAppStore.getState().executeFnc('fnc_cia_ct_cia','s', [])
            if(emps){
                set((state) => ({ userCiaEmp: (state.userCiaEmp = emps) }))
            }else{
                set((state) => ({ userError: (state.userError = error) }))
            }
        }
        catch (err) {
            set((state) => ({ userError: (state.userError = err) }))
        }
    },
    changeEmpPred: (idemp) => {
        set((state) => ({ userData:  {...get().userData, id_pred: idemp} }))
    }
    
})

export default createUserSlice