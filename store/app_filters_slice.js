import useAppStore from "./zustand"

export const createFiltersSlice = (set, get)=>({
    filters:[],
    setFilters:(filters)=>set({filters:filters}),
    addFilter:(filter)=>set(state=>({filters:[...state.filters,filter]})),
    removeFilter:(filter)=>set(state=>({filters:state.filters.filter(f=>f!==filter)})),
    clearFilters:()=>set({filters:[]})
})

