import { fncExecute } from "@/data"
import useUserStore from "./user_store"

const createGridSlice = (set,get)=>({
    gridError:null,
    gridData:[],
    setData:(data)=>set({gridData:data}),
    // gridDataFilters:[],
    // setGridDataFilters:(data)=>set({gridDataFilters:data}),
    setGridData: async(fnc_name, idRow=null)=>{
    //    console.log(get().gridDataFilters)
        set({gridError:null})
        try{
            let filtros= useUserStore.getState().filters
            // console.log(filtros)
            // set((state)=>({frmLoading:(state.frmLoading= true)}))   
            const res = await get().executeFnc(fnc_name,'s',filtros)
            // console.log(res)
            // const {data,error} = JSON.parse(res)
            if(res?.length>0){
                if(idRow){
                    res.sort((a,b)=>b[idRow]-a[idRow])
                }
                set((state)=>({gridData:(state.gridData= res) }))
            }else{
                set((state)=>({gridData:(state.gridData= []) }))
            }
            // set((state)=>({frmLoading:(state.frmLoading= false)}))   
        }catch(e){
            set({gridError:e})
            // console.log(e)
        }
    },
    itemsPerPage:5,
    setItemsPerPage:(itemsPerPage)=>set({itemsPerPage:itemsPerPage}),
    globalFilter:'',
    setGlobalFilter:(filter)=>set({globalFilter:filter}),
    rowSelection:{},
    setRowSelection: (fn) => set((state) => ({ rowSelection: fn(state.rowSelection) })),
    kanbanDataFiltered:[],
    setKanbanDataFiltered:(data)=>set({kanbanDataFiltered:data}),
    kanbanCurrentData:[],
    setKanbanCurrentData:(data)=>set({kanbanCurrentData:data}),
    kanbanCurrentPage:1,
    setKanbanCurrentPage:(page)=>set({kanbanCurrentPage:page}),
    table:null,
    setTable:(table)=>set({table:table}),
    listCurrentPage:1,
    setListCurrentPage:(page)=>set({listCurrentPage:page}),
    listGroupBy: [], //'tcon_dsc', 'dsc_pais', 'nom_icon'
    setListGroupBy: (data) => set({ listGroupBy: data }),
    tableData: [],
    setTableData: (data) => set({ tableData: data }),
    groupedList: [],
    setGroupedList: (data) => set({ groupedList: data })
})

export default createGridSlice