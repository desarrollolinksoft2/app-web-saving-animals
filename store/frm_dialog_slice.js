"use client"
import { toast } from "sonner";

const createFrmDialogSlice = (set,get)=>({
    frmDialogAction: null,
    setFrmDialogAction: (action) => set({ frmDialogAction: action }),
    frmDialogLoading: false,
    setFrmDialogLoading: (frmDialogLoading) => set({ frmDialogLoading: frmDialogLoading }),
    // frmDialogMewValue: null,
    // setFrmDialogMewValue: (newValue) => set({ frmDialogMewValue: newValue })
})

export default createFrmDialogSlice;