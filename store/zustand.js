import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware'
import createAppSlice from './app_slice'
// import createUserSlice from './user_slice'
import createGridSlice from './grid_slice'
import createDataSlice from './data_slice'
import createFrmSlice from './frm_slice'
import createFrmDialogSlice from "./frm_dialog_slice";

export const useAppStore = create(
    devtools(
        // persist(
        (...a)=>({
         ... createAppSlice (...a),
        //  ... createUserSlice (...a),
         ... createGridSlice (...a),
         ... createDataSlice (...a),
         ... createFrmSlice (...a),
         ... createFrmDialogSlice (...a),
        }),
        {name: 'app-store'} //name storage
        // )
    )
)

export default useAppStore