"use client";
import { set, useForm } from "react-hook-form";
import CustomTabs from "../tools/form/custom_tabs";
import { useEffect, useState } from "react";
import useAppStore from "@/store/zustand";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import pathNavigator from "../tools/navs/path_navigator";
import compareObjects from "../tools/functions/compare_objects";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { deleteImages, uploadStringImages } from "@/data/storage/manager_files";

import { IconButton, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextControlled from "../tools/inputs/text_controlled";

const Frm_base = ({ config }) => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const idForm = searchParams?.get("id") ? searchParams.get("id") : null;
  const prev_view = searchParams?.get("prev_view")
    ? searchParams.get("prev_view")
    : null;
  const setAppDialog = useAppStore((state) => state.setAppDialog);
  const setFrmNameForm = useAppStore((state) => state.setFrmNameForm);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const executeFnc = useAppStore((state) => state.executeFnc);
  const setFrmItemSelected = useAppStore((state) => state.setFrmItemSelected);
  const setFrmLoading = useAppStore((state) => state.setFrmLoading);
  const frmState = useAppStore((state) => state.frmState);
  const setFrmState = useAppStore((state) => state.setFrmState);
  const frmAction = useAppStore((state) => state.frmAction);
  const setFrmAction = useAppStore((state) => state.setFrmAction);
  const setGridData = useAppStore((state) => state.setGridData);
  const gridData = useAppStore((state) => state.gridData);
  const frmList = useAppStore((state) => state.frmList);
  const frmListIndex = useAppStore((state) => state.frmListIndex);
  const setFrmList = useAppStore((state) => state.setFrmList);
  const setFrmListIndex = useAppStore((state) => state.setFrmListIndex);
  const frmIsChanged = useAppStore((state) => state.frmIsChanged);
  const setFrmIsChanged = useAppStore((state) => state.setFrmIsChanged);
  const frmSaveExpress = useAppStore((state) => state.frmSaveExpress);
  const frmConfigControls = useAppStore((state) => state.frmConfigControls);
  const setFrmConfigControls = useAppStore(
    (state) => state.setFrmConfigControls
  );
  const setFrmSaveExpress = useAppStore((state) => state.setFrmSaveExpress);
  const appRoutes = useAppStore((state) => state.appRoutes);
  const setAppRoutes = useAppStore((state) => state.setAppRoutes);
  const [response, setResponse] = useState(null);
  const [easyPass, setEasyPass] = useState(false);
  const frm_bar_buttons = config.form_inputs?.frm_bar_buttons;
  const frm_bar_status = config.form_inputs?.frm_bar_status;
  const frm_photo = config.form_inputs?.frm_photo;
  const frm_top_title = config.form_inputs?.frm_top_title;
  const frm_star = config.form_inputs?.frm_star;
  const frm_title = config.form_inputs?.frm_title;
  const frm_sub_title = config.form_inputs?.frm_sub_title;
  const frm_middle = config.form_inputs?.frm_middle;
  const frm_middle_right = config.form_inputs?.frm_middle_right;

  // const frm_footer = config.form_inputs?.frm_footer
  const fnc_name = config.fnc_name;
  const col_name = config.grid.col_name;
  const idRow = config.grid.idRow;
  const idRow_db = config.grid.idRow_db;
  const fnc_valid = config.fnc_valid;
  const imagenFields = config.form_inputs?.imagenFields;
  const listTabs = config.form_inputs?.tabs;
  const defaul_values_config = config.default_values;
  //const defaultValues = frmItemSelected //frmState==='n'? defaul_values_config : frmItemSelected //newForm ? defaul_values_config : frmItemSelected
  // console.log(defaultValues)

  const {
    control,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm({ defaultValues: defaul_values_config });

  const duplicateFunction = async () => {
    let currentForm = { ...watch() };
    let res = await executeFnc(fnc_name, "r", { [idRow]: currentForm[idRow] });

    if (res) {
      await setGridData(config.fnc_name, idRow);

      setFrmItemSelected({ fnc_name, idName: idRow_db, value: res });

      currentForm[idRow] = res[idRow];
      setFrmList([currentForm]);
      setFrmListIndex(0); //(frmList.length)
      pathNavigator(pathname, route, searchParams, {
        view_type: "form",
        id: res[idRow],
      });

      toast.success("Se duplico con éxito");
    } else {
      toast.error("Error al duplicar");
    }
  };

  const deleteFunction = async () => {
    setFrmLoading(true);
    let currentForm = { ...watch() };
    let res = await executeFnc(fnc_name, "d", { [idRow]: currentForm[idRow] });

    // En caso de error devolver sin modificar al estado "Vista"
    if (res?.code > 204) {
      setFrmLoading(false);
      setEasyPass(true);
      setFrmState("e");
      return;
    }
    //Eliminar imagenes
    if (imagenFields?.length > 0) {
      for (const field of imagenFields) {
        // let field = imagenFields[i]
        // console.log(field)
        await eraseImagesByDelete(currentForm, field);
      }
    }
    if (appRoutes.length > 1) {
      let listRoutes = appRoutes;
      let lastItem = listRoutes.pop();
      setAppRoutes([...listRoutes]);
      if (lastItem?.list) setFrmList(lastItem.list);
      if (lastItem?.index) setFrmListIndex(lastItem.index);
      route.replace(pathname + "?" + lastItem?.path);
      return;
    }
    if (frmList.length > 1) {
      let newList = frmList.filter(
        (item) => item[idRow] !== currentForm[idRow]
      );
      let newItemSelected = newList[frmListIndex]
        ? newList[frmListIndex]
        : newList[frmListIndex - 1];
      if (!newList[frmListIndex]) setFrmListIndex(frmListIndex - 1);
      let newId = newItemSelected[idRow];
      setFrmList(newList);
      await setFrmItemSelected({ fnc_name, idName: idRow_db, value: newId });
      pathNavigator(pathname, route, searchParams, {
        view_type: "form",
        id: newId,
      });
      //update gridList
      await setGridData(fnc_name, idRow);
      return;
    } else {
      await setGridData(fnc_name, idRow);
      var nparams = {
        view_type: prev_view ? prev_view : config.view_default,
      };
      pathNavigator(pathname, route, searchParams, nparams, [
        "prev_view",
        "id",
      ]);
    }
    // setFrmLoading(false)
  };

  const dialogChangeStatus = () => {
    let currentForm = { ...watch() };
    let status = "A";
    if (currentForm[idRow] === null) {
      status = "A";
    }
    if (currentForm[idRow]) {
      status = currentForm["status"];
    }

    if (status === "I") {
      handleChangeStatus(currentForm);
    }

    if (status === "A") {
      setAppDialog({
        title: "Confirmación",
        content: "¿Está seguro que desea Archivar este registro?",
        open: true,
        handleConfirm: () => {
          handleChangeStatus(currentForm);
        },
        handleCancel: () => {
          returnStatePrev();
        },
        textConfirm: "Archivar",
        actions: true,
      });
      return;
    }
  };

  const handleChangeStatus = async (currentForm) => {
    if (currentForm[idRow]) {
      setValue("status", frmItemSelected["status"] === "A" ? "I" : "A");
      await saveFunction();
      // setFrmLoading(false);
      // return;
    }
    if (!currentForm[idRow]) {
      //grabar y despues actualizar status
      let { res, validForm, action } = await saveCore({ ...watch() });
      if (res) {
        // let newObject=res[idRow]
        setValue("status", "I");
        setValue(idRow, res[idRow]);
        // console
        await saveFunction();
        // setFrmLoading(false);
        // return;
      }
    }
  };

  const undoFunction = () => {
    if (frmItemSelected && frmItemSelected?.[idRow]) {
      console.log("pasamos a vista");
      setFrmState("e");
      reset();
    } else {
      setFrmState("n");
      reset();
    }
  };

  const returnStatePrev = () => {
    let currentForm = { ...watch() };
    setEasyPass(true);
    if (currentForm?.[idRow]) {
      setFrmState("e");
    } else {
      setFrmState("n");
    }
    // setFrmLoading(false)
    // setFrmAction(null)
  };

  const eraseImagesByDelete = async (currentForm, field) => {
    // console.log(currentForm)
    // console.log(field)
    let image = currentForm[field]?.[0]?.path || null;
    if (image) {
      console.log(image);
      let error = await deleteImages(currentForm[field], "images");
      // console.log(error)
      if (error) {
        if (error.length > 0 && error[0].error) {
          toast.error("Error al borrar la imagen", { description: error });
        }
      }
    } else {
      console.log("no existe imagen");
    }
  };

  const manageFilesToUpload = async (originForm, currentForm, field) => {
    const obj1 = originForm?.[field]?.[0] ? originForm[field][0] : null;
    const obj2 = currentForm?.[field]?.[0] ? currentForm[field][0] : null;
    const path1 = obj1?.path || null;
    const path2 = obj2?.path || null;

    if (path2) return obj1;
    if (path1 !== path2) {
      // console.log(obj1);
      // console.log(obj2);
      //eliminar imagen antigua
      if (obj1?.path) {
        console.log(obj1);
        let res = await deleteImages([obj1], "images");
        if (res) {
          console.log(res);
        }
      }
    }
    if (obj2?.publicUrl) {
      //subir imagen
      let uniqueName = uuidv4();
      let res = await uploadStringImages(obj2.publicUrl, "images", uniqueName);
      if (res) {
        console.log(res);
        return res;
      } else {
        toast.error("Error al subir la imagen");
      }
    }

    return null;
  };

  const saveCore = async (currentForm) => {
    // if (!currentForm[col_name]) {
    //     // setFrmLoading(false);
    //     return;
    // }
    let validForm = fnc_valid(currentForm);
    // console.log(validForm)

    if (validForm) {
      if (imagenFields?.length > 0) {
        for (const field of imagenFields) {
          // console.log(field);
          //si currentForm tiene id el registro ya existe
          let res = await manageFilesToUpload(
            //si currentForm tiene id el registro ya existe
            currentForm[idRow] ? frmItemSelected : null,
            currentForm,
            field
          );
          // console.log(res);
          currentForm[field] = res ? [res] : null;
        }
      }
      
      // let validForm = fnc_valid(currentForm);

      let action = validForm?.[idRow] ? "u" : "i";
      // console.log(fnc_name)
      // console.log(action)
      // console.log(validForm);
      let res = await executeFnc(fnc_name, action, validForm);
      // console.log('se guardo correctamente')
      if (frmSaveExpress) {
        setFrmSaveExpress(false);
      }
      // setFrmLoading(false);
      return {
        validForm,
        res,
        action,
      };
    } else {
      toast.error("Error al validar el formulario");
      setFrmLoading(false);
      return null;
    }
  };

  const saveFunction = async () => {
    setFrmLoading(true);
    let { res, validForm, action } = await saveCore({ ...watch() });
    console.log(res)
    // console.log(validForm)
    // console.log(action)
    
    if (res) {
    // if (res['type'] === "success") {
      await setGridData(config.fnc_name, idRow);

      if (action === "i") {
        validForm[idRow] = res[idRow];
        //agregar al inicio de la lista el nuevo registro
        setFrmList([validForm, ...frmList]);
        setFrmListIndex(0);
        pathNavigator(pathname, route, searchParams, {
          view_type: "form",
          id: res[idRow],
        });
      } else {
        if (idForm !== validForm[idRow]) {
          pathNavigator(pathname, route, searchParams, {
            view_type: "form",
            id: res[idRow],
          });
        }
      }
      await setFrmItemSelected({
        fnc_name,
        idName: idRow_db,
        value: validForm[idRow],
      });

      // toast.success('Guardado con éxito')
    }
    // else {
    //   // setFrmLoading(false);
    //   // toast.error('Error al guardar')
    // }
  };

  const handleChange = () => {
    if (frmState == "n" || frmState === "e") {
      setFrmIsChanged(isDirty);
    }
  };

  const registroExpress = async () => {
    // if (frmSaveExpress) {
    if (frmIsChanged) {
      handleSubmit(
        async () => {
          // console.log('voy a guardar')
          await saveCore({ ...watch() });

          frmSaveExpress?.fnc();
          setFrmSaveExpress(false);
        },
        () => {
          setFrmSaveExpress(false);
          setFrmLoading(false);
          return;
        }
      )();

      return;
    } else {
      frmSaveExpress?.fnc();
      setFrmSaveExpress(false);
    }

    // }
  };

  const changefrmState = async (frmStatus) => {
    switch (frmStatus) {
      case "n":
        if (easyPass) {
          setEasyPass(false);
          setFrmLoading(false);
          break;
        }
        reset({ ...defaul_values_config });
        setFrmItemSelected(null);
        // reset()
        // setFrmIsChanged(false)
        // resetForm()
        // setFrmLoading(false);
        break;
      case "e":
        if (easyPass) {
          setEasyPass(false);
          setFrmLoading(false);
          break;
        }
        if (frmItemSelected) {
          reset({ ...frmItemSelected });
        }

        break;
      case "v":
        break;
      /*
            case 'ps':
                // saveFunction();
                handleSubmit(saveFunction,returnStatePrev)()
                break;
            
            case 'us':
                handleSubmit(dialogChangeStatus, returnStatePrev)()
                
                break;
            case 'u':
                undoFunction();
                break;
            case 'd':
                await deleteFunction();
                break;
            case 'r':
                duplicateFunction();
                break;*/
    }
  };

  const executeAction = async (action) => {
    switch (action) {
      case "ps":
        // saveFunction();
        handleSubmit(saveFunction, () => {
          setFrmLoading(false);
        })();
        setFrmAction(null);
        break;
      case "us":
        handleSubmit(dialogChangeStatus, returnStatePrev)();
        // SubmitErrorHandler()
        setFrmAction(null);
        break;
      case "u":
        undoFunction();
        setFrmAction(null);
        break;
      case "d":
        await deleteFunction();
        setFrmAction(null);
        break;
      case "r":
        duplicateFunction();
        setFrmAction(null);
        break;
      // case 'updt':
      //     if(frmItemSelected){
      //     await setFrmItemSelected({ fnc_name, idName: idRow_db, value: frmItemSelected?.[idRow] })
      //     }
      //     setFrmAction(null)
      //     break;
      case "uf":
        handleSubmit(saveFunction, returnStatePrev)();
        setFrmAction(null);
        break;
      default:
        break;
    }
  };

  // useEffect(() => {
  //     // console.log('actualizar itemSelected')
  //     if (response && gridData.length > 0) {
  //         let idItem = response?.[idRow]
  //         // console.log(idItem)
  //         setFrmItemSelected({ fnc_name, idName: idRow, value: idItem })
  //         setResponse(null)
  //         setFrmState('v')
  //     }

  // }, [response])

  useEffect(() => {
    if (frmAction) {
      // console.log(errors)
      executeAction(frmAction);
    }
  }, [frmAction]);

  useEffect(() => {
    changefrmState(frmState);
  }, [frmState]);

  // useSelect(()=>{
  //     console.log('voy a ejecutarme')
  //     setFrmState('v')

  // },[frmItemSelected])

  useEffect(() => {
    setFrmNameForm(watch(`${col_name}`));
    // let initialForm = frmState === 'n' ? defaul_values_config : frmItemSelected
    // setFrmIsChanged(!compareObjects(watch(),initialForm))
    setFrmIsChanged(isDirty);
    // console.log(watch())
    // console.log(initialForm)
  }, [watch()]);

  // useEffect(() => {
  //     const handleWindowClose = (event) => {
  //         // Aquí puedes realizar las acciones que necesites antes de cerrar la ventana
  //         // Por ejemplo, podrías guardar los datos del formulario o mostrar un mensaje de confirmación

  //         // Cancela el evento de cierre
  //         event.preventDefault();
  //         // Chrome requiere que se establezca returnValue
  //         event.returnValue = '';
  //     };

  //     // Agrega el manejador de eventos al evento 'beforeunload'
  //     window.addEventListener('beforeunload', handleWindowClose);

  //     // Elimina el manejador de eventos cuando el componente se desmonta
  //     return () => {
  //         window.removeEventListener('beforeunload', handleWindowClose);
  //     };

  // }, []);

  useEffect(() => {
    if (frmSaveExpress.state) {
      registroExpress();
    }
  }, [frmSaveExpress]);

  useEffect(() => {
    if (frmItemSelected) {
      reset({ ...frmItemSelected });
      setFrmState("e");
      if (!frmIsChanged && (frmState === "n" || frmState === "e")) {
        setFrmLoading(false);
      }
    }
  }, [frmItemSelected]);

  useEffect(() => {
    if (!frmIsChanged && (frmState === "n" || frmState === "e")) {
      setFrmLoading(false);
    }
  }, [frmIsChanged, frmState]);

  useEffect(() => {
    if (config) {
      setFrmConfigControls(config.configControls);
    }
  }, [config]);

  useEffect(() => {
    if (frmState === null) {
      if (idForm == "0") {
        setFrmState("n");
      } else {
        if (frmItemSelected && frmItemSelected[idRow] == idForm) {
          // reset({ ...frmItemSelected })
        } else {
          setFrmItemSelected({ fnc_name, idName: idRow_db, value: idForm });
        }
        setFrmState("e");
      }
    }
    if (!frmItemSelected && idForm !== "0") {
      setFrmItemSelected({ fnc_name, idName: idRow_db, value: idForm });
    }
    setFrmConfigControls(config.configControls);
  }, []);

  useEffect(() => {
    if (frmState === null) {
      if (idForm == "0") {
        setFrmState("n");
      } else {
        if (frmItemSelected && frmItemSelected[idRow] == idForm) {
          reset({ ...frmItemSelected });
        } else {
          setFrmItemSelected({ fnc_name, idName: idRow_db, value: idForm });
        }
        setFrmState("e");
      }
    }
    if (!frmItemSelected && idForm !== "0") {
      setFrmItemSelected({ fnc_name, idName: idRow_db, value: idForm });
    }
  }, [gridData]);

  return (
    <>
      {(frm_bar_buttons || frm_bar_status) && (
        <>
          <div className="o_form_bar">
            <div className="o_form_bar_buttons">
              {frm_bar_buttons && (
                <>{frm_bar_buttons(control, errors, frmConfigControls, frmState)}</>
              )}
            </div>

            {frm_bar_status && (
              <>
                <div className="o_form_bar_status">
                  <div className="bar_status">
                    {frm_bar_status(control, errors, frmConfigControls, frmState)}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}

      <div className="o_form_sheet position-relative">
              
        {frmItemSelected?.status_switch === undefined && (
        <>
          {frmItemSelected?.status === "I" && (
            <div className="ribbon">Archivado</div>
          )}
        </>
        )}

        <form onChange={handleChange}>
          {" "}
          {/* onSubmit={handleSubmit(onSubmit)} */}
          {frm_photo && frm_photo(watch, control, errors, frmConfigControls, frmState)}
          {frm_title !== undefined && (
            <div
              className={`oe_title ${frm_top_title !== undefined && "mb24"}`}
            >
              {frm_top_title !== undefined ? (
                <div className="o_field_widget">
                  {frm_top_title &&
                    frm_top_title(control, errors, frmConfigControls, frmState)}
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
                      {frm_star(
                        control,
                        errors,
                        watch,
                        setValue,
                        frmConfigControls,
                        frmState
                      )}

                      <div className="o_field_widget o_field_field_partner_autocomplete text-break">
                        {frm_title && frm_title(control, errors, frmConfigControls, frmState)}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="o_field_widget o_field_field_partner_autocomplete text-break">
                    {frm_title && frm_title(control, errors, frmConfigControls, frmState)}
                  </div>
                )}
              </h1>

              <div className="o_row">
                {/* <div className="o_field_widget o_field_res_partner_many2one"> */}
                <div className="o_field_widget o_field_res_partner_many2one">
                  {frm_sub_title &&
                    frm_sub_title(
                      control,
                      errors,
                      watch,
                      setValue,
                      frmConfigControls,
                      frmState
                    )}
                </div>
              </div>
            </div>
          )}
          {(frm_middle || frm_middle_right) && (
            // <div className={`o_group ${frm_title !== undefined ? "mt-4" : ""}`}></div>
            <div className={`o_group ${frm_title !== undefined ? "mt-2" : ""}`}>
              <div className="lg:w-1/2">
                <div className="o_inner_group grid">
                  {frm_middle &&
                    frm_middle(
                      control,
                      errors,
                      watch,
                      setValue,
                      frmConfigControls,
                      frmState
                    )}
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="o_inner_group grid">
                  {frm_middle_right &&
                    frm_middle_right(
                      control,
                      errors,
                      setValue,
                      watch,
                      frmConfigControls,
                      frmState
                    )}
                </div>
              </div>
            </div>
          )}

          {listTabs !== undefined && (
          <div className={`w-full ${frm_middle || frm_middle_right ? "mt-5" : ""}`}>
          {listTabs && (
            <CustomTabs
              list={listTabs}
              watch={watch}
              control={control}
              errors={errors}
              setValues={setValue}
              editConfig={frmConfigControls}
              frmState={frmState}
            />
          )}
          </div>
          )}

          {/* {frm_footer && frm_footer(control, errors, watch, setValue)} */}
        </form>
      </div>
    </>
  );
};

export default Frm_base;
