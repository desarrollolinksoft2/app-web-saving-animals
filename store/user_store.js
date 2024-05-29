import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware'
import createUserSlice from './user_slice'
import { createFiltersSlice } from "./app_filters_slice";


const useUserStore =  create(
    devtools(
        persist(
            (...a)=>({
                ... createUserSlice (...a),
                ... createFiltersSlice (...a)
            }), {name: 'session-store'}
        )
        )
)

export default useUserStore;