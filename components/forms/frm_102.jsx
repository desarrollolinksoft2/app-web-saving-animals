"use client";
import { useEffect, useState } from "react";
import AutocompleteControlled from "../tools/inputs/autocomplete_controlled";
import TextControlled from "../tools/inputs/text_controlled";
import useAppStore from "@/store/zustand";
import ImageInput from "../tools/inputs/image_input";
import useUserStore from "@/store/user_store";

const required = {
  required: { value: true, message: "Este campo es requerido" },
};

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

export function FrmTitle({ control, errors, editConfig }) {
  const frmState = useAppStore((state) => state.frmState);

  const style = {
    fontSize: 26,
    lineHeight: "38px",
    color: "#111827",
  };
  return (
    <>
      <TextControlled
        name={"dsc_cia"}
        control={control}
        rules={required}
        errors={errors}
        placeholder={"por ejemplo, Mi Compañia"}
        style={style}
        multiline={true}
        editConfig={{ frmState: frmState, config: editConfig }}
      />
    </>
  );
}

export function FrmTab0({ watch, control, errors, setValues, editConfig }) {
  const createOptions = useAppStore((state) => state.createOptions);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const frmState = useAppStore((state) => state.frmState);
  const executeFnc = useAppStore((state) => state.executeFnc);
  const userData = useUserStore((state) => state.userData);

  const [Divisas, setDivisas] = useState([]);
  const cargaData_Divisas = async () => {
    let lDivisas = await createOptions("fnc_con_ct_div", "dsc_div", "id_div");
    setDivisas(lDivisas);
  };

  const { departamentos, provincias, distritos, paises } = useAppStore(
    (state) => state.ubigeo
  );
  const [countries, setCountries] = useState(paises || []);
  const [deps, setDeps] = useState(departamentos || []);
  const [prov, setProv] = useState(provincias || []);
  const [dist, setDist] = useState(distritos || []);

  //Ubicar descripciones a campos con valor
  const cargaData = () => {

    if (frmItemSelected["id_div"]) {
      setDivisas([
        {
          value: frmItemSelected["id_div"],
          label: frmItemSelected["dsc_div"],
        },
      ]);
    }

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

  // *---------------------------------------------------------------------------------

  return (
    <>
      <div className="o_group mt-4">
        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
            <div className="d-sm-contents">
              {/* <div className="o_cell o_wrap_label"> */}
              <div className="o_cell">
                <label className="o_form_label">Dirección</label>
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
                    rules={required}
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

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">
                  Código de tipo de dirección
                </label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <TextControlled
                    name={"cod_tdir"}
                    control={control}
                    errors={errors}
                    multiline={true}
                    placeholder={""}
                    editConfig={{ frmState: frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>
            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">NIF</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <TextControlled
                    name={"nif"}
                    control={control}
                    errors={errors}
                    placeholder={""}
                    editConfig={{ frmState: frmState, config: editConfig }}
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
                    placeholder={""}
                    control={control}
                    rules={required}
                    errors={errors}
                    options={Divisas}
                    // fnc_create={fnc_create}
                    // createOpt={true}
                    searchOpt={true}
                    // editOpt={true}
                    // frmSearch={() => (<FrmSearch />)}
                    fnc_loadOptions={cargaData_Divisas}
                    // enlace={true}
                    // fnc_enlace={fnc_enlace}
                    editConfig={{ frmState: frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
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
                    multiline={true}
                    placeholder={""}
                    editConfig={{ frmState: frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>
            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Móvil</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <TextControlled
                    name={"movil"}
                    control={control}
                    errors={errors}
                    placeholder={""}
                    editConfig={{ frmState: frmState, config: editConfig }}
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
                    placeholder={""}
                    editConfig={{ frmState: frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>
            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Sitio web</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <TextControlled
                    name={"web"}
                    control={control}
                    errors={errors}
                    placeholder={"p. ej. https://www.system.com"}
                    editConfig={{ frmState: frmState, config: editConfig }}
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
