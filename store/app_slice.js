export const createAppSlice = (set, get) => ({
    appState: null,
    setAppState: (appState) => set({ appState: appState }),
    appTheme: null,
    setTheme: (theme) => set({ appTheme: theme }),
    appRoutes:[],
    setAppRoutes:(routes)=>set({appRoutes:routes}),
    appDialog:{open:false},
    setAppDialog:(dialog)=>set({appDialog:{...dialog}}),
    appDialogs:[],
    setAppDialogs:(dialogs)=>set({appDialogs:dialogs}),

})

export default createAppSlice