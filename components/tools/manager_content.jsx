'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Grid_kanban from "../grids/grid_kanban";
import Grid_list from "../grids/grid_list";
import useAppStore from "@/store/zustand";
import useWindowWidth from "../hooks/window_width";
import Frm_base from "../forms/frm_base";
import Frm_web_options_form from "./form/frm_web_options_form";
import Frm_web_options from "./form/frm_web_options";
import useHasScroll from "../hooks/has_scroll";
import { toast } from "sonner";
import pathNavigator from "./navs/path_navigator";
import useUserStore from "@/store/user_store";
import MultiDialog from "./extras/multi_dialog";
import GridMasterList from "../grids/grid_master_list";

const Manager_content = ({ config, view }) => {

    const route = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const divRef = useRef(null)
    const [ref, hasScroll] = useHasScroll(divRef)
    const gridData = useAppStore(state => state.gridData)
    const setData = useAppStore(state => state.setData)
    const userData = useUserStore(state => state.userData)
    const setGridData = useAppStore(state => state.setGridData)
    const userEmpSelected = useUserStore(state => state.userEmpSelected)
    const frmItemSelected = useAppStore(state => state.frmItemSelected)
    const setFrmItemSelected = useAppStore(state => state.setFrmItemSelected)
    const filters = useUserStore(state => state.filters)
    const frmState = useAppStore(state => state.frmState)
    const table = useAppStore(state => state.table)
    const setTable = useAppStore(state => state.setTable)
    const listGroupBy = useAppStore(state => state.listGroupBy)
    const viewType = searchParams.get('view_type') ? searchParams.get('view_type') : null
    const [idForm, setIdForm] = useState(searchParams.get('id') ? searchParams.get('id') : null)
    const moduleId = searchParams.get('menu')
    const windowWidth = useWindowWidth()
    const fnc_name = config?.fnc_name
    const idRow = config?.grid?.idRow
    const idRow_db = config?.grid?.idRow_db
    const view_default = config?.view_default

    const updateViewUrl = (view_param) => {
        // console.log(view_default)
        if (moduleId !== 1 && config) {
            // console.log('actualizar vista')
            if (!view_param || view_param !== 'null') {
                let view_default_query = ""
                const view_type = searchParams.get("view_type")
                if(!view_type) view_default_query = `&view_type=${view_default}`

                let url = pathname + '?' + searchParams.toString() + view_default_query
                route.replace(url)
            }
        }
    }



    // const verifyItemSelected = async () => {
    //     await setGridData(fnc_name, config?.grid?.idRow) 
    // }

    const verifyForm = () => {
        if (viewType === 'form' && frmItemSelected && frmState !== 'n') {
            let existsItem = gridData.find((item) => item[idRow] === frmItemSelected[idRow]) || null
            if (!existsItem) {
                pathNavigator(pathname, route, searchParams, {}, ["prev_view", "id", "view_type"])
            }
        }

    }

    const updateGridData = async () => {
        // updateViewUrl(viewType, view)
        if (config) {
            await setGridData(fnc_name, idRow)
        }
    }

    useEffect(() => {
        //verificar que el formulario pertenece a una consulta válida
        let view = searchParams.get('view_type') ? searchParams.get('view_type') : null
        if (view === 'form' && idForm) {
            verifyForm()
        }

        // console.log(gridData)
    }, [gridData])

    useEffect(() => {
        if (gridData?.length === 0 && config) {
            updateGridData()
        }
        if (viewType === 'undefined' || viewType === null) {
            // updateViewUrl(viewType)
            pathNavigator(pathname, route, searchParams, {}, ["menu","prev_view", "id", "view_type"])
        }

    }, [searchParams.toString()])

    useEffect(() => {
        // console.log('actualizar por config')
        if (config) {
            updateGridData()
            updateViewUrl(viewType)
        }
    }, [config])

    useEffect(() => {
        // console.log('actualizar por filtro')
        updateGridData()
    }, [filters])

    useEffect(() => {
        // verifyItemSelected()
        // console.log('actualizar por empresa')
        updateGridData()
    }, [userEmpSelected])

    useEffect(() => {
        updateViewUrl(viewType)
        if (gridData.length === 0 && config) {
            // console.log('actualizar por estar vacío')
            setGridData(fnc_name, idRow)
        }
    }, [userData])

    if (!config) {
        toast.error('No se ha encontrado la configuración')
        return null
    }

    return (
        <>
            <div className="o_control_panel d-flex flex-column gap-3 gap-lg-1 px-4 pt-2 pb-4">
                {
                    viewType === "form" ? <Frm_web_options_form config={config} /> : <Frm_web_options viewType={viewType} config={config} />
                }
            </div>
            <div className="o_content">
                {
                    viewType === 'kanban' && (
                        <>
                            <div className="o_kanban_renderer o_renderer d-flex o_kanban_ungrouped align-content-start flex-wrap justify-content-start">
                                {config && (<Grid_kanban data={gridData} config={config} />)}
                            </div>
                        </>
                    )
                }
                {viewType === 'list' && (
                    <>
                        <div ref={divRef} className="o_list_renderer o_renderer table-responsive">
                            {config && (<GridMasterList data={gridData} setData={setData} config={config} width={windowWidth} table={table} setTable={setTable} />)}
                            {/* {config && (<Grid_list hasScroll={hasScroll} data={gridData} config={config} width={windowWidth} table={table} setTable={setTable} />)} */}
                        </div>
                    </>
                )}
                {viewType === 'form' && (
                    <>
                        <div className="o_form_renderer o_form_editable d-flex flex-nowrap h-100 o_form_saved">
                            <div className="o_form_sheet_bg">
                                {
                                    config && (<Frm_base config={config} />)
                                }
                            </div>
                            {config.form_inputs?.auditoria && (
                                <div className="o-mail-Form-chatter oe_chatter o-aside">
                                    Auditoria
                                </div>
                            )}
                        </div>
                    </>
                )}
                {viewType === 'draglist' && (
                    <>
                        <div ref={divRef} className="o_list_renderer o_renderer table-responsive">
                            {config && (<GridMasterList data={gridData} setData={setData} config={config} width={windowWidth} table={table} setTable={setTable} isDragable={true} />)}
                            {/* {config && (<Grid_list hasScroll={hasScroll} data={gridData} config={config} width={windowWidth} table={table} setTable={setTable} />)} */}
                        </div>
                    </>
                )}
            </div>
            <MultiDialog />
        </>
    )
}

export default Manager_content