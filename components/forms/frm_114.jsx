"use client";
import { useEffect, useState } from "react";
import AutocompleteControlled from "../tools/inputs/autocomplete_controlled";
import TextControlled from "../tools/inputs/text_controlled";
import useAppStore from "@/store/zustand";
import ImageInput from "../tools/inputs/image_input";
import useUserStore from "@/store/user_store";
import MultiSelectObject from "../tools/inputs/multi_select_objects";
import Chip from "@mui/material/Chip";

const required = {
  required: { value: true, message: "Este campo es requerido" },
};

export function Frm_bar_buttons({ control, errors }) {
  return (
    <>
      <button className="btn btn-secondary">
        Enviar un correo de invitación
      </button>
    </>
  );
}

export function Frm_bar_status({ control, errors }) {
  return (
    <>
      <div className="c_bar_step active" data-status="P">
        <div className="bar-step">Nunca se conecta</div>
      </div>
      <div className="c_bar_step" data-status="C">
        <div className="bar-step">Confirmado</div>
      </div>
    </>
  );
}

export function FrmPhoto({ watch, control, errors, editConfig }) {
  const [reset, setReset] = useState(false);
  const frmState = useAppStore((state) => state.frmState);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);

  useEffect(() => {
    if (frmState === "e" || frmState === "n") {
      setReset(true);
    }
  }, [frmState, frmItemSelected]);

  return (
    <>
      <div name="image_1920" className="o_field_widget o_field_image oe_avatar">
        <ImageInput
          watch={watch}
          name={"data_img"}
          control={control}
          errors={errors}
          reset={reset}
          editConfig={{ frmState: frmState, config: editConfig }}
        />
      </div>
    </>
  );
}

export function FrmTitle({ control, errors, editConfig, frmState }) {
  return (
    <>
      <TextControlled
        name={"dsc_usu"}
        placeholder={"por ejemplo, Alberto Cervantes"}
        className={"frm_dsc"}
        multiline={true}
        control={control}
        rules={required}
        errors={errors}
        editConfig={{ frmState, config: editConfig }}
      />
    </>
  );
}

export function Subtitle({
  control,
  errors,
  fnc_name,
  watch,
  setValues,
  editConfig,
  frmState,
}) {
  return (
    <>
      <div className="o_cell o_wrap_label mb-1 mt-2">
        <label className="o_form_label">Correo electrónico</label>
      </div>
      <div className="o_field_widget o_field_field_partner_autocomplete text-break">
        <TextControlled
          name={"email"}
          placeholder={"por ejemplo, email@suempresa.com"}
          className={"frm_dsc_sub"}
          control={control}
          rules={required}
          errors={errors}
          editConfig={{ frmState, config: editConfig }}
        />
      </div>
    </>
  );
}

export function FrmTab0({
  setValues,
  control,
  errors,
  watch,
  editConfig,
  frmState,
}) {
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const createOptions = useAppStore((state) => state.createOptions);

  const [TagCias, setTagCias] = useState([]);
  const cargaData_TagCias = async () => {
    setTagCias(await createOptions("fnc_cia_ct_cia", "dsc_cia", "id_cia"));
  };


  const fnc_renderTags = (value, getTagProps) => {
    //solo muestra paleta de colores si el estado no es vista
    // let fn_click = (e, option) => {
    //   if (frmState !== "v") {
    //     onChipClick(e, option);
    //   }
    // };

    return value.map((option, index) => (
      <Chip
        // variant="outlined"
        // className="text-gray-100"
        // onClick={(e) => onChipClick(e, option)}
        // onClick={(e) => fn_click(e, option)}
        label={option["dsc_cia"]}
        size="small"
        {...getTagProps({ index })}
        // style={{ backgroundColor: option?.["color_cet"] }}
      />
    ));
  };


  const [Cias, setCias] = useState([]);
  const cargaData_Cias = async () => {
    setCias(await createOptions("fnc_cia_ct_cia", "dsc_cia", "id_cia"));
  };

  useEffect(() => {
    if (frmItemSelected?.["id_cia"]) {
      setCias([
        {
          value: frmItemSelected["id_cia"],
          label: frmItemSelected["dsc_cia"],
        },
      ]);
    }
  }, [frmItemSelected]);

  return (
    <>
      <div className="o_group mt-4">
        {/* <div className=" w-full"> */}
        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
            <div className="g-col-sm-2">
              <div className="o_horizontal_separator mt-6 mb-4 text-uppercase fw-bolder small">
                Multi-compañía
              </div>
            </div>

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Compañías permitidas</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <MultiSelectObject
                    name={"tag_cias"}
                    control={control}
                    errors={errors}
                    options={TagCias}
                    fnc_loadOptions={cargaData_TagCias}
                    renderTags={fnc_renderTags}
                    optionLabel={"dsc_cia"}
                    optionValue={"id_cia"}
                    searchOpt={true}
                    editConfig={{ frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Compañía predeterminada</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <AutocompleteControlled
                    name={"id_cia"}
                    control={control}
                    errors={errors}
                    rules={required}
                    options={Cias}
                    fnc_loadOptions={cargaData_Cias}
                    // enlace={true}
                    // fnc_enlace={fnc_enlace}
                    // editConfig={{ frmState: frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
