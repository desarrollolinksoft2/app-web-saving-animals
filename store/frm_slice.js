"use client"
import { toast } from "sonner";

const createFrmSlice = (set, get) => ({
    frmError: null,
    frmLoading: false,
    setFrmLoading: (frmloading) => set({ frmLoading: frmloading }),
    frmNameForm: null,
    setFrmNameForm: (frmNameForm) => set({ frmNameForm: frmNameForm }),
    frmIsChanged: false,
    setFrmIsChanged: (frmIsChanged) => set({ frmIsChanged: frmIsChanged }),
    frmItemSelected: null,
    setFrmItemSelected: async (config, toDialog = false) => {

        if (!config) {
            set({ frmItemSelected: null })
            return
        }
        // set((state)=>({frmLoading:(state.frmLoading= true)}))   
        let { fnc_name, idName, value } = config
        // console.log(config)
        set({ frmError: null })
        try {
            const res = await get().executeFnc(fnc_name, 's', [
                // opLogico: 'AND',
                // columna: idName, // 'con.id_con', 
                // opComparacion: '=',
                // valor: value

                ["filter_id", value]

            ])
            // const {data,error} = JSON.parse(res)
            // console.log(res)
            if (res) {
                if (toDialog) {
                    return res[0]
                }
                set((state) => ({ frmItemSelected: (state.frmItemSelected = res[0]) }))
            }
            // set((state)=>({frmLoading:(state.frmLoading= false)}))
        } catch (e) {
            set({ frmError: e })
        }
    },
    frmConfigControls: null,
    setFrmConfigControls: (frmConfigControls) => set({ frmConfigControls: frmConfigControls }),
    frmInit: null,
    setFrmInit: (frmInit) => set({ frmInit: frmInit }),
    frmState: null,
    setFrmState: (frmState) => set({ frmState: frmState }),
    frmAction: null,
    setFrmAction: (frmAction) => set({ frmAction: frmAction }),
    frmList: [],
    setFrmList: (frmList) => set({ frmList: frmList }),
    frmListIndex: 0,
    setFrmListIndex: (frmListIndex) => set({ frmListIndex: frmListIndex }),
    frmCreater: async (fnc_name, data, idfield, callback) => {
        set({ frmError: null })
        try {
            const res = await get().executeFnc(fnc_name, 'i', data)
            // const {data,error} = JSON.parse(res)
            if (res?.[idfield]) {
                await callback(res[idfield])
            } else {
                toast.error('Error al crear registro')
            }
        } catch (e) {
            toast.error('Error al crear registro')
            set({ frmError: e })
        }
    },
    frmSaveExpress: {
        state: false,
        fnc: null
    },
    setFrmSaveExpress: (state, fnc = null) => set({ frmSaveExpress: { state, fnc } }),
    setFrmData: async (fnc_name, frm, id) => {
        let action = frm[id] ? 'u' : 'i'
        set({ frmError: null })
        try {
            const res = await get().executeFnc(fnc_name, action, frm)
            // const {data,error} = JSON.parse(res)
            if (res) {
                set((state) => ({ frmData: (state.frmData = res) }))
            }
        } catch (e) {
            set({ frmError: e })
        }
    },
    frmFncEnlaceInterno: async (config) => {
        let { currentName, currentPath, nItem, nItemSelected, fnc_next } = config
        let lastPath = get().appRoutes[get().appRoutes.length - 1].path
        
         if (lastPath !== currentPath) 
            {
            await get().setFrmSaveExpress(true, async() => {
                let hRoute = {
                    name: get().frmItemSelected?.[currentName] || 'Nuevo',
                    path: currentPath,
                    list: get().frmList,
                    index: get().frmListIndex
                }
                get().setAppRoutes([...get().appRoutes, hRoute])
                get().setFrmList([nItem])
                get().setFrmListIndex(0)
                await get().setFrmItemSelected(nItemSelected)

                fnc_next()
            })
        }else{ 
                // console.log(lastPath)
                // console.log(currentPath)
                fnc_next()
        }

    }

})
export default createFrmSlice