'use client'
import './inputs.css'
import { useEffect, useRef, useState } from "react"
import { Controller } from "react-hook-form"
import { MdOutlineEdit } from "react-icons/md";
import { LiaTrashAlt } from "react-icons/lia";
import TooltipCustom from '../extras/tooltip_custom';
import { deleteImages, uploadImages } from '@/data/storage/manager_files';

import { BiHighlight } from "react-icons/bi";
import { GrTrash } from "react-icons/gr";
import { toast } from 'sonner';
import useAppStore from '@/store/zustand';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ValidaEstado from '../functions/valida-estado';
import validaInput from '../functions/valida-input';

const ImageInput = ({ watch, name, control, errors, rules, maxSize = 300, editConfig={frmState:null, config:{}} }) => {

    const { frmState, config } = editConfig
    // const { readOnly, hidden } = ValidaEstado(frmState, config )
    let editView = validaInput(name, config, frmState)
    const [tmpFiles, setTmpFiles] = useState([])

    const inputRef = useRef(null)
    const inputValue = useRef(null)
    const [files, setFiles] = useState(watch(name))
    const [openDialog, setOpenDialog] = useState(false)
    const [uriViewer, setUriViewer] = useState(null)
    // console.log(watch())
    const [prev, setPrev] = useState(null)

    const openViewer = (uri) => {
        setUriViewer(uri)
        setOpenDialog(true)
    }

    const handleFileChange = async (e, field) => {
        const file = e.target.files[0];
        if (file) {

            const reader = new FileReader();
            console.log(reader)
            reader.onloadend = () => {
                if (file.size > maxSize * 1024) {
                    toast.warning('El tamaño de la imagen supera el límite permitido')
                    return;
                }
                if (!file.type.includes('image')) {
                    toast.warning('El archivo seleccionado no es una imagen')
                    return;
                }
                // console.log(reader)
                let tmpfile = [{
                    // path: null,
                    publicUrl: reader.result,
                }]
                // console.log(tmpfile)
                setFiles(tmpfile)
                field.onChange(tmpfile)

            };

            reader.onerror = (err) => {
                // console.log(err)
                toast.error('Error al cargar la imagen ' + err)
            }
            reader.readAsDataURL(file);
            //   setFiles(file);

            //   return reader.readAsDataURL(file);
        }
    }

    /*
        const sendImages = async (images ) => {
            if(images){
                // console.log('ingresó')
                if(images.length > 1){
                    console.log('Solo se permite una imagen')
                    return;
                }
                // console.log('ejecutar subida')
                var res = await uploadImages(images,'images')
                setTmpFiles([...tmpFiles,...res])
                // inputValue.current.value= JSON.stringify(res)
                if(res.length > 0){
                    setFiles(res)
                    // field.onChange(res)
                    console.log(res)
                }
                return res;
            }else{
                return null;
            }
        }*/
    useEffect(() => {
        // console.log(files)
        setFiles(watch(name))
    }, [watch(name)])

    return (<>
        <Controller
            control={control}
            name={name}
            rules={rules}
            // defaultValue={''}
            render={({ field }) => {
                return (<>
                    <div className="group d-inline-block position-relative opacity-trigger-hover">
                        <div className="absolute w-full  bottom-0 opacity-0 group-hover:opacity-100">
                            {!!editView &&
                                <div className='flex justify-between items-center '>
                                    <span>
                                        <TooltipCustom title={'Editar'}>
                                            <button type='button' onClick={() => inputRef.current.click()}
                                                className="o_select_file_button rounded-full p-1 m-1 hover:bg-gray-300" data-tootip='Editar' >

                                                <BiHighlight className='w-4 h-4' />
                                            </button>
                                        </TooltipCustom>
                                    </span>
                                    {
                                        (files?.length > 0 || files !== null) &&
                                        <TooltipCustom title={'Limpiar'}>
                                            <button type='button'  onClick={() => {
                                                field.onChange(null)
                                                // setFiles(null)
                                            }}
                                                style={{ textAlign: '-webkit-center' }}
                                                className="o_select_file_button rounded-full p-1 m-1 hover:bg-gray-300" data-tootip='Limpiar' >

                                                <GrTrash style={{ fontSize: "14px" }} />
                                            </button>
                                        </TooltipCustom>
                                    }
                                </div>
                            }
                        </div>
                        <input

                            ref={inputRef}
                            type="file"
                            accept="image/*" // Aceptar solo imágenes
                            onChange={async (e) => {
                                // let tmpImage = await handleUploadImages(e)
                                await handleFileChange(e, field)
                                //  console.log(tmpImage)
                                // if(field.onChange){

                                // field.onChange(JSON.stringify(tmpImage))
                                // }
                            }} // Aquí manejas el cambio del input
                            hidden
                            // onBlur={field.onBlur}
                            className="hidden"
                        />
                        {/* <input {...field}  type='text' className='hidden'  /> */}
                        {
                            (files?.[0]?.publicUrl) ? (<>
                                <img
                                    // loading="lazy"
                                    className="img img-fluid cursor-pointer"
                                    onClick={() => openViewer(files[0]?.publicUrl)}
                                    // alt="Archivo binario"
                                    src={files[0]?.publicUrl}
                                // name="image_1920"
                                // style=""
                                />

                            </>) : (<>
                                <img
                                    // loading="lazy"
                                    className="img img-fluid"
                                    // alt="Archivo binario"
                                    src="https://ieshxewzsqejofmijifu.supabase.co/storage/v1/object/public/application/icons/placeholder.png"
                                // name="image_1920"
                                // style=""
                                />
                            </>)

                        }
                    </div>
                </>)
            }}
        />
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>

            </DialogTitle>
            <DialogContent>
                <img src={uriViewer} alt="Imagen" width={'100%'} />
            </DialogContent>
            <DialogActions>
                <button onClick={() => setOpenDialog(false)}>Cerrar</button>
            </DialogActions>
        </Dialog>
    </>)
}

export default ImageInput