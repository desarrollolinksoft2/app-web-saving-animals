'use client'
import { useEffect, useState } from "react"
import AutocompleteControlled from "../tools/inputs/autocomplete_controlled"
import RadioButtonControlled from "../tools/inputs/radio-button-controlled"
import TextControlled from "../tools/inputs/text_controlled"
import SelectControlled from "../tools/inputs/select_controlled"
import { Button, Typography } from "@mui/material"
import { MdOutlineAddCircleOutline } from "react-icons/md"
import useAppStore from "@/store/zustand"
import ImageInput from "../tools/inputs/image_input"
import useUserStore from "@/store/user_store"

const Frm_alm_prd = ({ control, errors }) => {
    return (<>
        <h3> formulario almacen producto</h3>
    </>)
}

export default Frm_alm_prd

const required = {required: { value: true, message: 'Este campo es requerido' }}

export function FrmPhoto({ control, errors }) {
    return (<>
        <div name="image_1920" className="o_field_widget o_field_image oe_avatar">
            
            <ImageInput name={'cimage'} control={control} errors={errors} />
            
        </div>
    </>)

}

export function TopTitle({ control, errors }) {
    const options = [
        { label: 'Individual', value: 'Individual' },
        { label: 'Compañía', value: 'Compañia' },
    ]

    return (<>
        <RadioButtonControlled name={'tip_persona'} control={control} errors={errors} options={options} />
    </>)
}

export function FrmTitle({ control, errors }) {
    const style = {
        fontSize: 26,
        lineHeight: "38px",
        color: "#111827",
    }
    return (<>
        <TextControlled name={'cdsc_prs'} control={control} rules={required} errors={errors} placeholder={'p. ej. Alberto Cervantes'} style={style} />
    </>)
}

export function Subtitle({ control, errors }) {


    return (<>
        <AutocompleteControlled name={'ccod_dprs21'} placeholder={'Nombre de la empresa ...'} 

            control={control} errors={errors} />
    </>)
}

export function FrmMiddle({ control, errors }) {
    const createOptions = useAppStore(state => state.createOptions)
    const userData = useUserStore(state => state.userData)
    const [paises, setPaises] = useState([])
    const [deps, setDeps] = useState([])

    const cargaData=async()=>{
        setPaises(await createOptions('fnc_em_ct_ubi_pais','cdsc_pais','ccod_pais'))
        setDeps(await createOptions('fnc_em_ct_ubi_dpt','cdsc_dpt','ccod_dpt'))
    }
    // const Paises= fnc_em_ct_ubi_pais

    const dirOptions=[
        {label:'Contacto',value:10},
        {label:'Dirección de factura',value:20},
        {label:'Dirección de entrega',value:30},
        {label:'Otra dirección',value:40}
    ]

    useEffect(()=>{
        if(userData){
            cargaData()
        }
    },[])
    useEffect(()=>{
        if(userData){
            cargaData()
        }
    },[userData])

    return (<>
        <div className="d-sm-contents">
            <div className="o_cell o_wrap_label">
                <label className="o_form_label">Número de identificación</label>
            </div>
            <div className="o_cell">
                <div className="o_field">
                    <AutocompleteControlled placeholder={'Tipo'} name={'id_tipo'} control={control} errors={errors} />
                </div>
                <div className="o_field">
                    <TextControlled name={'id_number'} control={control} errors={errors} placeholder={'Número'} />
                </div>
            </div>

        </div>
        <div className="d-sm-contents">
            <div className="o_cell o_wrap_label">
                <SelectControlled name={'direccion'} defaultValue="" control={control} errors={errors} options={dirOptions} />
            </div>
            <div className="o_cell">
                <div className="pt-6">
                    <div className="o_field">
                        <TextControlled name={'dir_calle'} control={control} errors={errors} placeholder={'calle ...'} />
                    </div>
                    <div className="o_field mt-1">
                        <TextControlled name={'dir_calle2'} control={control} errors={errors} placeholder={'calle2 ...'} />
                    </div>
                    <div className="o_field mt-1">
                        <AutocompleteControlled name={'id_distrito'} control={control} errors={errors} placeholder={'Distrito '} />
                    </div>
                    <div className="o_field mt-1">
                        <AutocompleteControlled name={'id_provincia'} control={control} errors={errors} placeholder={'Provincia'} />
                    </div>
                    <div className="flex gap-5 mt-1">
                        <div className="o_field w-8/12">
                            <AutocompleteControlled name={'id_dpt'} control={control} errors={errors} 
                            options={deps} placeholder={'Departamento'}  />
                        </div>
                        <div className="o_field w-4/12">
                            <TextControlled name={'cdprs_numasd'} control={control} errors={errors} placeholder={'C.P.'} />
                        </div>
                    </div>
                    <div className="o_field mt-1">
                        <AutocompleteControlled name={'id_pais'} control={control} errors={errors} placeholder={'País'} options={paises} />
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export function FrmMiddleRight({ control, errors }) {
    return (<>
        <div className="d-sm-contents">
            <div className="o_cell o_wrap_label">
                <label className="o_form_label">Puesto de trabajo</label>
            </div>
            <div className="o_cell">
                <div className="o_field">
                    <TextControlled name={'cdsc_puesto'} control={control} errors={errors} placeholder={'p. ej. Director de ventas'} />
                </div>
            </div>
        </div>
        <div className="d-sm-contents">
            <div className="o_cell o_wrap_label">
                <label className="o_form_label">Teléfono</label>
            </div>
            <div className="o_cell">
                <div className="o_field">
                    <TextControlled name={'telefono'} control={control} errors={errors} placeholder={''} />
                </div>
            </div>
        </div>
        <div className="d-sm-contents">
            <div className="o_cell o_wrap_label">
                <label className="o_form_label">Móvil</label>
            </div>
            <div className="o_cell">
                <div className="o_field">
                    <TextControlled name={'movil'} control={control} errors={errors} placeholder={''} />
                </div>
            </div>
        </div>
        <div className="d-sm-contents">
            <div className="o_cell o_wrap_label">
                <label className="o_form_label">Correo electrónico</label>
            </div>
            <div className="o_cell">
                <div className="o_field">
                    <TextControlled name={'email'} control={control} errors={errors} placeholder={''} />
                </div>
            </div>
        </div>
        <div className="d-sm-contents">
            <div className="o_cell o_wrap_label">
                <label className="o_form_label">Sitio web</label>
            </div>
            <div className="o_cell">
                <div className="o_field">
                    <TextControlled name={'web_page'} control={control} errors={errors} placeholder={'p. ej. https://www.system.com'} />
                </div>
            </div>
        </div>
        <div className="d-sm-contents">
            <div className="o_cell o_wrap_label">
                <label className="o_form_label">Título</label>
            </div>
            <div className="o_cell">
                <div className="o_field">
                    <TextControlled name={'title'} control={control} errors={errors} placeholder={''} />
                </div>
            </div>
        </div>
    </>)
}

export function FrmTab0({ control, errors }) {
    return (<div className="w-full">
        <Button
            // hidden={hidden}
            className="mt-5"
            // variant="contained"
            startIcon={<MdOutlineAddCircleOutline />}
        // onClick={handleDelete}
        >
            <Typography
                fontSize={"14.4px"}
                sx={{ textTransform: "none", fontWeight: "500" }}
            >
                Añadir
            </Typography>
        </Button>
    </div>)
}

export function FrmTab3({ control, errors }) {
    return (<>
        <div className="w-full mt-5">
            <div className="w-full">
                <TextControlled name={'cnotas'} control={control} errors={errors} 
                multiline={true} className={'InputNoLineEx w-full'}
                placeholder={'Notas internas'} />
            </div>
        </div>
    </>)
}