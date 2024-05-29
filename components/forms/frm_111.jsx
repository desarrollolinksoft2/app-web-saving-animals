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
        name={"nom_ban"}
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
  
  const { departamentos, provincias, distritos, paises } = useAppStore(
    (state) => state.ubigeo
  );
  const [countries, setCountries] = useState(paises || []);
  const [deps, setDeps] = useState(departamentos || []);
  const [prov, setProv] = useState(provincias || []);
  const [dist, setDist] = useState(distritos || []);

  //Ubicar descripciones a campos con valor
  const cargaData = () => {
    if (dist.length === 0 && frmItemSelected["id_dst"])
      setDist([
        {
          label: frmItemSelected["dsc_dst"],
          value: frmItemSelected["id_dst"],
        },
      ]);
    if (prov.length === 0 && frmItemSelected["id_prv"])
      setProv([
        {
          label: frmItemSelected["dsc_prv"],
          value: frmItemSelected["id_prv"],
        },
      ]);
    if (deps.length === 0 && frmItemSelected["id_dpt"])
      setDeps([
        {
          label: frmItemSelected["dsc_dpt"],
          value: frmItemSelected["id_dpt"],
        },
      ]);
    if (countries.length === 0 && frmItemSelected["id_pais"])
      setCountries([
        {
          label: frmItemSelected["dsc_pais"],
          value: frmItemSelected["id_pais"],
        },
      ]);
  };

  // const Paises= fnc_em_ct_ubi_pais
  const cargaDistritos = async () => {
    setDist(await createOptions("fnc_cia_ct_ubi_dst", "dsc_dst", "id_dst"));
  };

  const cargaDepartamentos = async () => {
    setDeps(await createOptions("fnc_cia_ct_ubi_dpt", "dsc_dpt", "id_dpt"));
  };

  const cargaProvincias = async () => {
    setProv(await createOptions("fnc_cia_ct_ubi_prv", "dsc_prv", "id_prv"));
  };

  const cargaPais = async () => {
    setCountries(
      await createOptions("fnc_cia_ct_ubi_pais", "dsc_pais", "id_pais")
    );
  };

  const cargaUbigeo = () => {
    cargaDistritos();
    cargaProvincias();
    cargaDepartamentos();
    cargaPais();
  };

  const fncChangeDist = (data) => {
    //actualizar desde Distrito
    if (data === null) return;
    if (prov.length < 2) cargaUbigeo();

    if (Object.keys(data).length > 0) {
      setValues("id_prv", data.id_prv);
      setValues("id_dpt", data.id_dpt);
      setValues("id_pais", data.id_pais); //PERU
    }
  };

  const fncChangePrv = (data) => {
    setValues("id_dst", null);
    if (data === null) return;
    if (Object.keys(data).length > 0) {
      setValues("id_dpt", data.id_dpt);
      setValues("id_pais", data.id_pais); //PERU
    }
  };

  const fncChangeDpt = (data) => {
    setValues("id_dst", null);
    setValues("id_prv", null);
    if (data === null) return;
    if (Object.keys(data).length > 0) {
      setValues("id_pais", data.id_pais); //PERU
    }
  };

  const fncChangePais = (data) => {
    setValues("id_dst", null);
    setValues("id_prv", null);
    setValues("id_dpt", null);
    if (data === null) return;
  };

  useEffect(() => {
    if (frmItemSelected) {
      cargaData();
    }
  }, [frmItemSelected]);

  // useEffect(()=>{
  //   console.log(dist)
  // },[paises,deps,prov,dist])

  return (
    <>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">
            Código de identificación bancaria (BIC/SWIFT)
          </label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <TextControlled
              name={"cod_iban"}
              control={control}
              errors={errors}
              editConfig={{ frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>
      <div className="d-sm-contents">
        {/* <div className="o_cell o_wrap_label"> */}
        <div className="o_cell">
          <label className="o_form_label">Dirección del banco</label>
        </div>
        <div className="o_cell">
          {/* <div className="pt-6"> */}
          <div className="o_field">
            <TextControlled
              name={"calle"}
              control={control}
              errors={errors}
              placeholder={"calle ..."}
              multiline={true}
              editConfig={{ frmState: frmState, config: editConfig }}
            />
          </div>
          <div className="o_field">
            <TextControlled
              name={"calle2"}
              control={control}
              errors={errors}
              placeholder={"calle2 ..."}
              multiline={true}
              editConfig={{ frmState: frmState, config: editConfig }}
            />
          </div>
          <div className="o_field">
            <AutocompleteControlled
              name={"id_dst"}
              control={control}
              errors={errors}
              placeholder={"Distrito"}
              options={dist}
              // options={distritos}
              fnc_loadOptions={cargaDistritos}
              handleOnChanged={fncChangeDist}
              editConfig={{ frmState: frmState, config: editConfig }}
            />
          </div>
          <div className="o_field">
            <AutocompleteControlled
              name={"id_prv"}
              control={control}
              errors={errors}
              placeholder={"Provincia"}
              options={prov}
              // options={provincias}
              fnc_loadOptions={cargaProvincias}
              handleOnChanged={fncChangePrv}
              editConfig={{ frmState: frmState, config: editConfig }}
            />
          </div>
          <div className="o_field flex gap-5">
            <div className="w-8/12">
              <AutocompleteControlled
                name={"id_dpt"}
                control={control}
                errors={errors}
                options={deps}
                // options={departamentos}
                placeholder={"Departamento"}
                fnc_loadOptions={cargaDepartamentos}
                handleOnChanged={fncChangeDpt}
                editConfig={{ frmState: frmState, config: editConfig }}
              />
            </div>
            <div className="w-4/12">
              <TextControlled
                name={"cp"}
                control={control}
                errors={errors}
                placeholder={"C.P."}
                editConfig={{ frmState: frmState, config: editConfig }}
              />
            </div>
          </div>
          <div className="o_field">
            <AutocompleteControlled
              name={"id_pais"}
              control={control}
              errors={errors}
              placeholder={"País"}
              options={countries}
              fnc_loadOptions={cargaPais}
              handleOnChanged={fncChangePais}
              editConfig={{ frmState: frmState, config: editConfig }}
            />
          </div>
          {/* </div> */}
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

  return (
    <>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Teléfono</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <TextControlled
              name={"telf"}
              control={control}
              errors={errors}
              editConfig={{ frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Correo electrónico</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <TextControlled
              name={"email"}
              control={control}
              errors={errors}
              editConfig={{ frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
