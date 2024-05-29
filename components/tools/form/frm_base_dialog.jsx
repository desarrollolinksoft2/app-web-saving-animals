import useAppStore from "@/store/zustand"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import CustomTabs from "./custom_tabs"
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { uploadStringImages } from "@/data/storage/manager_files";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import pathNavigator from "../navs/path_navigator";

const FrmBaseDialog = ({ config, values=null, fnClose =null }) => {
    const frmConfigControls = useAppStore(state => state.frmConfigControls)
    const setFrmConfigControls = useAppStore(state => state.setFrmConfigControls)
    const appDialogs = useAppStore((state) => state.appDialogs);
    const setAppDialogs = useAppStore((state) => state.setAppDialogs);
    // const setAppDialog = useAppStore((state) => state.setAppDialog);
    const frmDialogAction = useAppStore(state => state.frmDialogAction)
    const setFrmDialogAction = useAppStore(state => state.setFrmDialogAction)
    const frmDialogLoading = useAppStore(state => state.frmDialogLoading)
    const setFrmDialogLoading = useAppStore(state => state.setFrmDialogLoading)
    // const frmDialogNewValue = useAppStore(state => state.frmDialogNewValue)
    // const setfrmDialogNewValue = useAppStore(state => state.setfrmDialogNewValue)
    const appDialog = useAppStore(state => state.appDialog)
    const executeFnc = useAppStore(state => state.executeFnc)
    const [frmDialogState, setFrmDialogState] = useState('n')

    const frm_bar_buttons = config.form_inputs?.frm_bar_buttons
    const frm_bar_status = config.form_inputs?.frm_bar_status
    const frm_photo = config.form_inputs?.frm_photo
    const frm_top_title = config.form_inputs?.frm_top_title
    const frm_star = config.form_inputs?.frm_star
    const frm_title = config.form_inputs?.frm_title
    const frm_sub_title = config.form_inputs?.frm_sub_title
    const frm_middle = config.form_inputs?.frm_middle
    const frm_middle_right = config.form_inputs?.frm_middle_right
    const frm_middle_bottom = config.form_inputs?.frm_middle_bottom
    const frmItemSelected = null // { status: 'I' }
    const fnc_name = config.fnc_name
    const col_name = config.grid.col_name
    const idRow = config.grid.idRow
    const idRow_db = config.grid.idRow_db
    const fnc_valid = config.fnc_valid
    const imagenFields = config.form_inputs?.imagenFields
    const listTabs = config.form_inputs?.tabs
    const defaul_values_config = config.default_values
    

    const nvalues = values ? { ...values} : defaul_values_config

    const { control, watch, handleSubmit, reset, setValue, formState: { errors, isDirty } } = useForm(
        // { defaultValues: defaul_values_config }
        { defaultValues: nvalues }
    )

    const manageFilesToUpload = async (originForm, currentForm, field) => {
        const obj1 = originForm?.[field]?.[0] ? originForm[field][0] : null
        const obj2 = currentForm?.[field]?.[0] ? currentForm[field][0] : null
        const path1 = obj1?.path || null
        const path2 = obj2?.path || null
        // const obj = currentForm?.[field]?.[0] ? currentForm[field][0] : null

        if (path2) return obj1
        if (path1 !== path2) {
            // console.log(obj1)
            // console.log(obj2)
            //eliminar imagen antigua
            if (obj1?.path) {
                console.log(obj1)
                let res = await deleteImages([obj1], 'images')
                if (res) { console.log(res) }
            }
        }
        if (obj2?.publicUrl) {
            //subir imagen
            let uniqueName = uuidv4()
            let res = await uploadStringImages(obj2.publicUrl, 'images', uniqueName)
            if (res) {
                // console.log(res)
                return res
                
            } else {
                toast.error('Error al subir la imagen')
            }
        }

        return null
    }

    const saveCore = async (currentForm) => {

        let validForm = fnc_valid(currentForm)
        if (validForm) {

            if (imagenFields?.length > 0) {
                for (const field of imagenFields) {
                    // console.log(field)
                    //si currentForm tiene id el registro ya existe
                    let res = await manageFilesToUpload(nvalues, currentForm, field) ///(currentForm[idRow] ? nvalues : null, currentForm, field)
                    // console.log(res)
                    currentForm[field] = res ? [res] : null
                }
            }

            let action = validForm?.[idRow] ? 'u' : 'i'

            // console.log(validForm)
            let res = await executeFnc(fnc_name, action, validForm)
            // console.log('se guardo correctamente')
            // if (frmSaveExpress) {
            //     setFrmSaveExpress(false)
            // }
            // setFrmLoading(false);
            // setFrmDialogLoading(false)
            // setAppDialog({ open: false });
            // console.log(res)
            // setfrmDialogNewValue(res)
            // console.log(frmDialogAction)
            // console.log(appDialogs)
            frmDialogAction.dialog.afterSave(res)
            // setAppDialogs([]);
            
            // setAppDialog({...appDialog,open: false})
            setFrmDialogAction(null)
            fnClose();
            return {
                validForm,
                res,
                action
            };
        } else {
            toast.error('Error al validar el formulario')
            // setFrmLoading(false);
            setFrmDialogLoading(false)
            return null;
        }
    }

    const ExecuteAction = async (action) => {
        switch (action) {
            case 'save':

                // setFrmLoading(true);
                
                handleSubmit(saveCore,()=>{
                    // setFrmLoading(false);
                    setFrmDialogLoading(false)
                    setFrmDialogAction(null)
                })()
                
                break;
            default:
                break;
        }
    }


    useEffect(() => {
        //*** debemos usar una variable independiante */
        if (config) {
            setFrmConfigControls(config.configControls)
        }
    }, [config])

    // useEffect(()=>{
    //     console.log(watch())
    // },[watch()])

    useEffect(()=>{
        // console.log(frmDialogAction)
        if(frmDialogAction){
            // setFrmDialogLoading(true)
            ExecuteAction(frmDialogAction.action)
        }
    },[frmDialogAction])

    return (<>
        {/*  <div className="o_content">
             <div className="o_form_renderer o_form_editable d-flex flex-nowrap h-100 o_form_saved">
             <div className="o_form_sheet_bg"> */}
        <main className="modal-body p-0">
            <div className="o_form_view o_view_controller">
                <div className="o_form_view_container">
                    <div className="o_content">
                        <div className="o_form_renderer o_form_editable d-flex flex-column o_form_dirty">
                            <div className="o_form_sheet_bg">
                                {(frm_bar_buttons || frm_bar_status) && (
                                    <>
                                        <div className="o_form_bar">

                                            <div className="o_form_bar_buttons">
                                                {frm_bar_buttons && (
                                                    <>
                                                        {frm_bar_buttons(control, errors, frmConfigControls, frmDialogState)}
                                                    </>
                                                )}
                                            </div>

                                            {frm_bar_status && (
                                                <>
                                                    <div className="o_form_bar_status">
                                                        <div className="bar_status">
                                                            {frm_bar_status(control, errors, frmConfigControls, frmDialogState)}
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                        </div>
                                    </>
                                )}
                                <div className="o_form_sheet position-relative">

                                    {frmItemSelected?.status === 'C' && <div className="ribbon">Archivado</div>}

                                    <form  >  {/* onSubmit={handleSubmit(onSubmit)} */}

                                        {frm_photo && frm_photo(watch, control, errors, frmConfigControls, frmDialogState)}

                                        {frm_title !== undefined && (
                                            <div className={`oe_title ${frm_top_title !== undefined && "mb-6"}`}>

                                                {frm_top_title !== undefined ? (
                                                    <div className="o_field_widget">
                                                        {frm_top_title && frm_top_title(control, errors, frmConfigControls, frmDialogState)}
                                                    </div>
                                                ) : (
                                                    <div className="o_cell o_wrap_label mb-1">
                                                        <label className="o_form_label">{config.dsc}</label>
                                                    </div>
                                                )}

                                                <h1>
                                                    {frm_star !== undefined ? (
                                                        <>
                                                            <div className="d-flex">

                                                                {frm_star(control, errors, watch, setValue, frmConfigControls, frmDialogState)}

                                                                <div className="o_field_widget o_field_field_partner_autocomplete text-break">
                                                                    {frm_title && frm_title(control, errors)}
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="o_field_widget o_field_field_partner_autocomplete text-break">
                                                            {frm_title && frm_title(control, errors, frmConfigControls, frmDialogState)}
                                                        </div>
                                                    )}
                                                </h1>

                                                <div className="o_row">
                                                    {/* <div className="o_field_widget o_field_res_partner_many2one"> */}
                                                    <div className="o_field_widget o_field_res_partner_many2one">
                                                        {frm_sub_title && frm_sub_title(control, errors, watch, setValue, frmConfigControls, frmDialogState)}
                                                    </div>
                                                </div>

                                            </div>
                                        )}

                                        {(frm_middle || frm_middle_right) && (
                                            <div className={`o_group ${frm_title !== undefined ? "mt-4" : ""}`}>
                                                <div className="lg:w-1/2">
                                                    <div className="o_inner_group grid">
                                                        {frm_middle && frm_middle(control, errors, watch, setValue, frmConfigControls, frmDialogState)}
                                                    </div>
                                                </div>
                                                <div className="lg:w-1/2">
                                                    <div className="o_inner_group grid">
                                                        {frm_middle_right && frm_middle_right(control, errors, setValue, watch, frmConfigControls, frmDialogState)}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className={`w-full ${(frm_middle || frm_middle_right) ? ("mt-5") : ("")}`}>
                                            {
                                                listTabs && <CustomTabs list={listTabs} watch={watch} control={control} errors={errors} setValues={setValue} editConfig={frmConfigControls} frmState={frmDialogState} />
                                            }
                                        </div>

                                        {/* {frm_footer && frm_footer(control, errors, watch, setValue)} */}
                                        {frm_middle_bottom && frm_middle_bottom(control, errors, frmConfigControls, frmDialogState)}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        {/* </div> </div> </div> */}
    </>);
}

export default FrmBaseDialog;