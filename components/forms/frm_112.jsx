"use client";
import { useEffect, useState } from "react";
import AutocompleteControlled from "../tools/inputs/autocomplete_controlled";
import TextControlled from "../tools/inputs/text_controlled";
import useAppStore from "@/store/zustand";
import useUserStore from "@/store/user_store";

const required = {
  required: { value: true, message: "Este campo es requerido" },
};

export function FrmTitle({ control, errors, frmState, editConfig }) {
  return (
    <>
      <TextControlled
        name={"num_cba"}
        className={"frm_dsc"}
        placeholder={""}
        multiline={true}
        control={control}
        rules={required}
        errors={errors}
        editConfig={{ frmState, config: editConfig }}
      />
    </>
  );
}

export function FrmMiddle({
  setValues,
  watch,
  control,
  errors,
  editConfig,
  frmState,
}) {
  const createOptions = useAppStore((state) => state.createOptions);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);

  const [Cons, setCons] = useState([]);
  const cargaData_Cons = async () => {
    setCons(await createOptions("fnc_cia_ct_con", "dsc_con", "id_con"));
  };

  const [Bans, setBans] = useState([]);
  const cargaData_Bans = async () => {
    setBans(await createOptions("fnc_cia_ct_ban", "nom_ban", "id_ban"));
  };

  useEffect(() => {
    if (frmItemSelected?.["id_con"]) {
      setCons([
        {
          value: frmItemSelected["id_con"],
          label: frmItemSelected["dsc_con"],
        },
      ]);
    }
    if (frmItemSelected?.["id_ban"]) {
      setBans([
        {
          value: frmItemSelected["id_ban"],
          label: frmItemSelected["nom_ban"],
        },
      ]);
    }
  }, [frmItemSelected]);

  const fnc_Change_con = (data) => {
    console.log(data.dsc_con);
  };

  return (
    <>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Banco</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <AutocompleteControlled
              name={"id_ban"}
              control={control}
              errors={errors}
              options={Bans}
              //   fnc_create={fnc_create}
              //   createOpt={true}
              //   searchOpt={fnc_search}
              //   editOpt={fnc_create_edit}
              // frmSearch={fnc_search}
              fnc_loadOptions={cargaData_Bans}
              enlace={true}
              //   fnc_enlace={fnc_enlace}
              editConfig={{ frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>

      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">
            Nombre del titular de la cuenta
          </label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <TextControlled
              name={"nom_titular"}
              control={control}
              errors={errors}
              editConfig={{ frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>

      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Titular</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <AutocompleteControlled
              name={"id_con"}
              control={control}
              errors={errors}
              options={Cons}
              //   fnc_create={fnc_create}
              //   createOpt={true}
              //   searchOpt={fnc_search}
              //   editOpt={fnc_create_edit}
              // frmSearch={fnc_search}
              fnc_loadOptions={cargaData_Cons}
              enlace={true}
              //   fnc_enlace={fnc_enlace}
              editConfig={{ frmState, config: editConfig }}
              handleOnChanged={fnc_Change_con}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export function FrmMiddleRight({
  setValues,
  control,
  errors,
  watch,
  frmState,
  editConfig,
}) {
  const createOptions = useAppStore((state) => state.createOptions);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);

  const [Cias, setCias] = useState([]);
  const cargaData_Cias = async () => {
    setCias(await createOptions("fnc_cia_ct_cia", "dsc_cia", "id_cia"));
  };

  const [Divs, setDivs] = useState([]);
  const cargaData_Divs = async () => {
    setDivs(await createOptions("fnc_con_ct_div", "dsc_div", "id_div"));
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
    if (frmItemSelected?.["id_div"]) {
      setDivs([
        {
          value: frmItemSelected["id_div"],
          label: frmItemSelected["dsc_div"],
        },
      ]);
    }
  }, [frmItemSelected]);

  return (
    <>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Compañía</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <AutocompleteControlled
              name={"id_cia"}
              control={control}
              errors={errors}
              options={Cias}
              //   fnc_create={fnc_create}
              //   createOpt={true}
              //   searchOpt={fnc_search}
              //   editOpt={fnc_create_edit}
              // frmSearch={fnc_search}
              fnc_loadOptions={cargaData_Cias}
              enlace={true}
              //   fnc_enlace={fnc_enlace}
              editConfig={{ frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Moneda</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <AutocompleteControlled
              name={"id_div"}
              control={control}
              errors={errors}
              options={Divs}
              //   fnc_create={fnc_create}
              //   createOpt={true}
              //   searchOpt={fnc_search}
              //   editOpt={fnc_create_edit}
              // frmSearch={fnc_search}
              fnc_loadOptions={cargaData_Divs}
              enlace={true}
              //   fnc_enlace={fnc_enlace}
              editConfig={{ frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
