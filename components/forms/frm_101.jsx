"use client";
import { useEffect, useState } from "react";
import AutocompleteControlled from "../tools/inputs/autocomplete_controlled";
import RadioButtonControlled from "../tools/inputs/radio-button-controlled";
import TextControlled from "../tools/inputs/text_controlled";
import SelectControlled from "../tools/inputs/select_controlled";
import {
  Button,
  Typography,
} from "@mui/material";
import useAppStore from "@/store/zustand";
import ImageInput from "../tools/inputs/image_input";
import { fncExecute } from "@/data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import pathNavigator from "../tools/navs/path_navigator";
import { Tooltip } from "@mui/material";
import useUserStore from "@/store/user_store";
import MultiSelectObject from "../tools/inputs/multi_select_objects";
import Chip from "@mui/material/Chip";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import FrmBaseDialog from "../tools/form/frm_base_dialog";
import Frm_101_config from "./frm_101_config";
import Frm_modal_contact_config from "./contact/contact.config"
import GridSearch from "../grids/grid_search";


const required = {
  required: { value: true, message: "Este campo es requerido" },
};

export function FrmPhoto({ watch, control, errors, editConfig, frmState }) {
  const [reset, setReset] = useState(false);
  // const frmState = useAppStore((state) => state.frmState);
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
          editConfig={{ frmState, config: editConfig }}
        />
      </div>
    </>
  );
}

export function TopTitle({ control, errors, editConfig, frmState,options }) {
  return (
    <>
      <RadioButtonControlled
        name={"tcon"}
        control={control}
        errors={errors}
        options={options}
        editConfig={{ frmState, config: editConfig }}
      />
    </>
  );
}

export function FrmTitle({ control, errors, editConfig, frmState }) {
  // const frmState = useAppStore((state) => state.frmState);
  /*
  const style = {
    fontSize: 26,
    lineHeight: "38px",
    color: "#111827",
  };
  */
  return (
    <>
      <TextControlled
        name={"dsc_con"}
        className={"frm_dsc"}
        // style={style}
        placeholder={"por ejemplo, Alberto Cervantes"}
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
  frmState
}) {
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const executeFnc = useAppStore((state) => state.executeFnc);
  const setGridData = useAppStore((state) => state.setGridData);
  const appDialogs = useAppStore((state) => state.appDialogs);
  const setAppDialogs = useAppStore((state) => state.setAppDialogs);
  // const frmState = useAppStore((state) => state.frmState);
  const createOptions = useAppStore((state) => state.createOptions);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const setFrmItemSelected = useAppStore((state) => state.setFrmItemSelected);
  const frmCreater = useAppStore((state) => state.frmCreater);
  // const appDialog = useAppStore((state) => state.appDialog);
  // const setAppDialog = useAppStore((state) => state.setAppDialog);
  const frmDialogAction = useAppStore(state => state.frmDialogAction)
  const setFrmDialogAction = useAppStore(state => state.setFrmDialogAction)

  const frmFncEnlaceInterno = useAppStore((state) => state.frmFncEnlaceInterno);
  const [companies, setCompanies] = useState([]);

  const cargaData = async () => {
    let filters = [{ filterBy: "tcon", filterValue: "C" }];
    if (watch("id_con")) {
      filters.push({
        filterBy: "id_con",
        filterValue: watch("id_con"),
        exclude: true,
      });
    }
    // console.log(fnc_name)
    let lcompanies = await createOptions(
      "fnc_cia_ct_con",
      "dsc_con",
      "id_con",
      filters
    );

    // console.log(lcompanies);
    setCompanies(lcompanies);
  };

  const fnc_enlace = async (value) => {
    if (appDialogs.length > 0) {
      //cargar data del registro
      let valueSelected = await setFrmItemSelected({ fnc_name: 'fnc_cia_ct_con', idName: "con.id_con", value }, true)
      fnc_create_edit(valueSelected)
      return;
    }

    frmFncEnlaceInterno({
      currentName: "dsc_con", //watch('dsc_con'),
      currentPath: searchParams.toString(),
      nItem: { id_con: value },
      nItemSelected: { fnc_name, idName: "con.id_con", value },
      fnc_next: () => {
        pathNavigator(pathname, route, searchParams, {
          view_type: "form",
          id: value,
          config: "101",
        });
      },
    });
  };

  const fnc_create = async (value) => {
    await frmCreater(
      fnc_name,
      { dsc_con: value, tcon: "C" },
      "id_con",
      async (res) => {
        await cargaData();
        setValues("id_con_rel", res);
      }
    );


  };

  const fncAfterSave = (value) => {
    cargaData()
    if (appDialogs.length <= 1) {
      setValues('id_con_rel', value['id_con'], { shouldDirty: true })
    }
    // setAppDialog({...appDialog,open: false});
    // return
  }

  const saveDialogForm = (dialog) => {
    setFrmDialogAction({ action: 'save', dialog })
  }

  const fnc_create_edit = (value) => {
    let values = {}
    if (typeof value === 'object') {
      values = { ...value }
    } else {
      values = { dsc_con: value, tcon: "C" }
    }


    setAppDialogs([...appDialogs, {
      title: "Crear empresa relacionada",
      content: (fnClose) => <FrmBaseDialog config={Frm_101_config} values={values} fnClose={fnClose} />,
      open: true,
      type: 'form',
      afterSave: fncAfterSave,
      onConfirm: saveDialogForm
    }]);
  };

  const onSelect = (value) => {
    cargaData();
    setValues("id_con_rel", value['id_con'], { shouldDirty: true });
    // setAppDialog({ ...appDialog, open: false });
  }


  const fnc_search = () => {
    setAppDialogs([...appDialogs, {
      title: "Buscar: Empresa relacionada",
      content: (fnClose) => <GridSearch config={Frm_101_config} data={companies} onSelect={onSelect} fnClose={fnClose} />,
      open: true,
      type: 'search',
      onConfirm: () => fnc_create_edit(null)
    }]);
  }

  useEffect(() => {
    // cargaData()
    // if(watch('id_con_rel')){
    //   setCompanies([{
    //     label: watch('dsc_con_rel'),
    //     value: watch('id_con_rel')
    //   }])
    // }
    if (frmItemSelected) {
      if (frmState === "n") return;
      if (frmItemSelected["id_con_rel"]) {
        setCompanies([
          {
            label: frmItemSelected["dsc_con_rel"],
            value: frmItemSelected["id_con_rel"],
          },
        ]);
      }
    }
    // cargaData()
  }, [frmItemSelected]);

  // useEffect(()=>{
  //   console.log(companies)
  // },[companies])

  return (
    <>
      {watch("tcon") === "I" && (
        <AutocompleteControlled
          name={"id_con_rel"}
          placeholder={"Nombre de la empresa ..."}
          control={control}
          errors={errors}
          options={companies}
          fnc_create={fnc_create}
          createOpt={true}
          searchOpt={fnc_search}
          editOpt={fnc_create_edit}
          // frmSearch={fnc_search}
          fnc_loadOptions={cargaData}
          enlace={true}
          fnc_enlace={fnc_enlace}
          editConfig={{ frmState, config: editConfig }}
        />
      )}
    </>
  );
}

export function FrmMiddle({ setValues, watch, control, errors, editConfig, frmState }) {
  const createOptions = useAppStore((state) => state.createOptions);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  // const frmState = useAppStore((state) => state.frmState);
  const executeFnc = useAppStore((state) => state.executeFnc);
  const userData = useUserStore((state) => state.userData);
  const { departamentos, provincias, distritos, paises } = useAppStore(
    (state) => state.ubigeo
  );
  const [countries, setCountries] = useState(paises || []);
  const [deps, setDeps] = useState(departamentos || []);
  const [prov, setProv] = useState(provincias || []);
  const [dist, setDist] = useState(distritos || []);
  const [iprs, setIprs] = useState([]);

  //Ubicar descripciones a campos con valor
  const cargaData = () => {
    if (frmItemSelected["id_icon"]) {
      setIprs([
        {
          label: frmItemSelected["nom_icon"],
          value: frmItemSelected["id_icon"],
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

  const cargaIprs = async () => {
    setIprs(await createOptions("fnc_cia_ct_icon", "nom_icon", "id_icon"));
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

  const dirOptions = [
    { label: "Contacto", value: 1 },
    { label: "Dirección de factura", value: 2 },
    { label: "Dirección de entrega", value: 3 },
    { label: "Otra dirección", value: 4 },
  ];

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
            Número de identificación
            <Tooltip
              arrow
              title="El número registrado de la empresa. Úselo si es diferente al NIF. Debe ser único para todos los contactos del mismo país."
            >
              <sup className="text-info p-1">?</sup>
            </Tooltip>
          </label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <AutocompleteControlled
              name={"id_icon"}
              placeholder={"Tipo"}
              control={control}
              errors={errors}
              options={iprs}
              fnc_loadOptions={cargaIprs}
              editConfig={{ frmState, config: editConfig }}
            />
          </div>
          <div className="o_field">
            <TextControlled
              name={"dcon_num"}
              control={control}
              errors={errors}
              placeholder={"Número"}
              editConfig={{ frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>
      <div className="d-sm-contents">
        {/* <div className="o_cell o_wrap_label"> */}
        <div className="o_cell">
          <SelectControlled
            name={"treg"}
            control={control}
            errors={errors}
            options={dirOptions}
            className="o_form_label max-w-40"
            editConfig={{ frmState, config: editConfig }}
          />
        </div>
        <div className="o_cell">
          <div className="pt-6">
            <div className="o_field">
              <TextControlled
                name={"calle"}
                control={control}
                errors={errors}
                placeholder={"calle ..."}
                editConfig={{ frmState, config: editConfig }}
              />
            </div>
            <div className="o_field">
              <TextControlled
                name={"calle2"}
                control={control}
                errors={errors}
                placeholder={"calle2 ..."}
                multiline={true}
                editConfig={{ frmState, config: editConfig }}
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
                editConfig={{ frmState, config: editConfig }}
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
                editConfig={{ frmState, config: editConfig }}
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
                  editConfig={{ frmState, config: editConfig }}
                />
              </div>
              <div className="w-4/12">
                <TextControlled
                  name={"cp"}
                  control={control}
                  errors={errors}
                  placeholder={"C.P."}
                  editConfig={{ frmState, config: editConfig }}
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
                editConfig={{ frmState, config: editConfig }}
              />
            </div>
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
  editConfig,
  frmState
}) {
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);

  const createOptions = useAppStore((state) => state.createOptions);
  const executeFnc = useAppStore((state) => state.executeFnc);
  const frmCreater = useAppStore((state) => state.frmCreater);
  // const frmState = useAppStore((state) => state.frmState);
  const [tags, setTags] = useState([]);
  const [popup, setPopup] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [tagSelected, setTagSelected] = useState(null);

  const cargaTags = async () => {
    setTags(await createOptions("fnc_cia_ct_cet", "dsc_cet_full", "id_cet"));
  };

  const fnc_createTag = async (data) => {
    let ndata = data[data.length - 1];
    await frmCreater(
      "fnc_cia_ct_cet",
      { dsc_cet: ndata?.value },
      "id_cet",
      async (res) => {
        let ntags = await createOptions(
          "fnc_cia_ct_cet",
          "dsc_cet_full",
          "id_cet"
        );
        let ntag = ntags.find((tag) => tag["id_cet"] === res);
        //{dsc_cet: ndata?.value, id_cet: res}
        data[data.length - 1] = ntag;
        setValues("tag_eti", data, { shouldDirty: true }); //indica al hook que se cambio un valor
      }
    );
    /*
    let res = await executeFnc("fnc_cia_ct_cet", "i", { dsc_cet: ndata?.value })

    if (res?.['id_cet']) {
      let ntags = await createOptions("fnc_cia_ct_cet", "dsc_cet_full", "id_cet")
      let ntag = ntags.find((tag) => tag['id_cet'] === res.id_cet)
      if (ntag) {
        data[data.length - 1] = ntag
        setValues('tag_eti', data)
      } else {
        toast.error('Error al consultar etiquetas')
      }
    } else {
      toast.error('Error al crear etiqueta')
    }*/
  };

  const onChipClick = (e, option) => {
    // alert(option['dsc_cet_full'])
    setPopup(popup ? null : e.currentTarget);
    setOpenPopup(!openPopup);
    setTagSelected(option);
  };

  const changeColorTag = (color) => {
    let ntag = tagSelected;
    ntag["color_cet"] = color;
    //actualizar registro
    executeFnc("fnc_cia_ct_cet", "u", ntag);
    let listTags = watch("tag_eti");
    let nlistTags = listTags.map((tag) =>
      tag.value === ntag.value ? ntag : tag
    );
    setValues("tag_eti", nlistTags);
    setOpenPopup(false);
  };

  const fnc_renderTags = (value, getTagProps) => {
    //solo muestra paleta de colores si el estado no es vista
    let fn_click = (e, option) => {
      if (frmState !== "v") {
        onChipClick(e, option);
      }
    };

    return value.map((option, index) => (
      <Chip
        // variant="outlined"
        className="text-gray-100"
        // onClick={(e) => onChipClick(e, option)}
        onClick={(e) => fn_click(e, option)}
        label={option["dsc_cet_full"]}
        size="small"
        {...getTagProps({ index })}
        style={{ backgroundColor: option?.["color_cet"] }}
      />
    ));
  };

  const listTagColors = [
    "RGBA(255, 155.5, 155.5, 1 )",
    "RGBA(247.0375, 198.06116071, 152.4625, 1 )",
    "RGBA(252.88960843, 226.89175248, 135.61039157, 1 )",
    "RGBA(187.45210396, 215.03675558, 248.04789604, 1 )",
    "RGBA(216.79194664, 167.70805336, 203.91748283, 1 )",
    "RGBA(247.84539474, 213.9484835, 199.65460526, 1 )",
    "RGBA(136.6125, 224.8875, 218.94591346, 1 )",
    "RGBA(136.6125, 224.8875, 218.94591346, 1 )",
    "RGBA(150.60535714, 165.68382711, 248.89464286, 1 )",
    "RGBA(254.94583333, 157.55416667, 203.95543194, 1 )",
    "RGBA(182.62075688, 236.87924312, 189.81831118, 1 )",
    "RGBA(230.11575613, 219.41069277, 252.08930723, 1 )",
  ];




  const [Ctis, setCtis] = useState([]);
  const cargaData_Ctis = async () => {
    setCtis(await createOptions("fnc_cia_ct_cti", "dsc_cti", "id_cti"));
  };

  
  const cargaData = () => {

    if (frmItemSelected["id_cti"]) {
      setCtis([
        {
          value: frmItemSelected["id_cti"],
          label: frmItemSelected["dsc_cti"],
        },
      ]);
    }

  };

  useEffect(() => {
    if (frmItemSelected) {
      cargaData();
    }
  }, [frmItemSelected]);

  return (
    <>
      <BasePopup open={openPopup} anchor={popup}>
        <div className="border max-w-40 mt-1 border-gray-500 outlined bg-gray-100 rounded-md p-1 text-xs">
          <div className="flex flex-wrap ">
            {listTagColors.map((color, index) => (
              <div
                onClick={() => changeColorTag(color)}
                className="cursor-pointer outlined w-4 h-4 m-1"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </div>
      </BasePopup>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Puesto de trabajo</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <TextControlled
              name={"pt_trab"}
              placeholder={"Por ejemplo, Director de Ventas"}
              control={control}
              errors={errors}
              multiline={true}
              editConfig={{ frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>
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
              editConfig={{ frmState, config: editConfig }}
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
              placeholder={""}
              editConfig={{ frmState, config: editConfig }}
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
              editConfig={{ frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>

      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Título</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <AutocompleteControlled
              name={"id_cti"}
              placeholder={"Por ejemplo, Señor"}
              control={control}
              errors={errors}
              options={Ctis}
              // fnc_create={fnc_create}
              createOpt={true}
              // searchOpt={fnc_search}
              // editOpt={fnc_create_edit}
              // frmSearch={fnc_search}
              fnc_loadOptions={cargaData_Ctis}
              // enlace={true}
              // fnc_enlace={fnc_enlace}
              editConfig={{ frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>

      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Etiquetas</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <MultiSelectObject
              name={"tag_eti"}
              control={control}
              options={tags}
              errors={errors}
              placeholder={'por ejemplo, "B2B", "VIP", "consultoría", ...'}
              fnc_loadOptions={cargaTags}
              renderTags={fnc_renderTags}
              optionLabel={"dsc_cet_full"}
              optionValue={"id_cet"}
              fnc_create={fnc_createTag}
              createOpt={true}
              searchOpt={true}
              editConfig={{ frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export function FrmTab0({ control, errors, editConfig }) {
  const appDialogs = useAppStore((state) => state.appDialogs);
  const setAppDialogs = useAppStore((state) => state.setAppDialogs);

  const handleClick = () => {
    setAppDialogs([...appDialogs, {
      title: "Crear contacto",
      content: (fnClose) => <FrmBaseDialog config={Frm_modal_contact_config} fnClose={fnClose}/>,
      open: true,
      type: 'form',
      afterSave: ()=>{},
      onConfirm: ()=>{}
    }]);
  };
  return (
    <div className="w-full py-4">
      <Button
        className="bg-[#e7e9ed] border-[#e7e9ed] text-black px-3"
        onClick={handleClick}
      >
        <Typography
          fontSize={"14.4px"}
          sx={{ textTransform: "none", fontWeight: "500" }}
        >
          Agregar
        </Typography>
      </Button>
    </div>
  );
}

export function FrmTab1({ watch, control, errors, editConfig, frmState }) {
  const createOptions = useAppStore((state) => state.createOptions);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);

  const [Ldps, setLdps] = useState([]);
  const carga_Ldps = async () => {
    setLdps(await createOptions("fnc_ve_ct_ldp", "dsc_ldp", "id_ldp"));
  };

  const [Cdps, setCdps] = useState([]);
  const carga_Cdps = async () => {
    setCdps(await createOptions("fnc_fac_ct_cdp", "dsc_cdp", "id_cdp"));
  };

  const [Cins, setCins] = useState([]);
  const cargaData_Cins = async () => {
    setCins(await createOptions("fnc_cia_ct_cin", "nom_cin", "id_cin"));
  };

  const cargaData = () => {

    if (frmItemSelected?.["id_ldp"]) {
      setLdps([
        {
          value: frmItemSelected["id_ldp"],
          label: frmItemSelected["dsc_ldp"],
        },
      ]);
    }

    if (frmItemSelected?.["id_cdp_ven"] || frmItemSelected?.["id_cdp_com"]) {
      if (frmItemSelected?.["id_cdp_ven"] === frmItemSelected?.["id_cdp_com"])
        setCdps([
          {
            label: frmItemSelected["dsc_cdp_ven"],
            value: frmItemSelected["id_cdp_ven"],
          },
        ]);

      if (frmItemSelected?.["id_cdp_ven"] !== frmItemSelected?.["id_cdp_com"]) {
        setCdps([
          {
            label: frmItemSelected?.["dsc_cdp_ven"],
            value: frmItemSelected?.["id_cdp_ven"],
          },
          {
            label: frmItemSelected?.["dsc_cdp_com"],
            value: frmItemSelected?.["id_cdp_com"],
          },
        ]);
      }
    }
    
    if (frmItemSelected?.["id_cin"]) {
      setCins([
        {
          label: frmItemSelected["nom_cin"],
          value: frmItemSelected["id_cin"],
        },
      ]);
    }

  };

  useEffect(() => {
    cargaData();
  }, [frmItemSelected]);

  return (
    <>
      <div className="o_group mt-4">
        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
            <div className="g-col-sm-2">
              <div className="o_horizontal_separator mt-6 mb-4 text-uppercase fw-bolder small">
                Ventas
              </div>
            </div>

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Condición de pago</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <AutocompleteControlled
                    name={"id_cdp_ven"}
                    placeholder={""}
                    control={control}
                    errors={errors}
                    options={Cdps}
                    fnc_loadOptions={carga_Cdps}
                    // fnc_enlace={fnc_enlace}
                    // enlace={true}
                    editConfig={{ frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Lista de precios</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <AutocompleteControlled
                    name={"id_ldp"}
                    placeholder={""}
                    control={control}
                    errors={errors}
                    options={Ldps}
                    fnc_loadOptions={carga_Ldps}
                    editConfig={{ frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
            <div className="g-col-sm-2">
              <div className="o_horizontal_separator mt-6 mb-4 text-uppercase fw-bolder small">
                Compras
              </div>
            </div>

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Condición de pago</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <AutocompleteControlled
                    name={"id_cdp_com"}
                    placeholder={""}
                    control={control}
                    errors={errors}
                    options={Cdps}
                    fnc_loadOptions={carga_Cdps}
                    editConfig={{ frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="o_group mt-4">
        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
            <div className="g-col-sm-2">
              <div className="o_horizontal_separator mt-6 mb-4 text-uppercase fw-bolder small">
                Punto de venta
              </div>
            </div>
            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Código de barras</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <TextControlled
                    name={"cod_barras"}
                    control={control}
                    errors={errors}
                    placeholder={""}
                    editConfig={{ frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
            <div className="g-col-sm-2">
              <div className="o_horizontal_separator mt-6 mb-4 text-uppercase fw-bolder small">
                Información fiscal
              </div>
            </div>
            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Posición fiscal</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
{/* 
                  <AutocompleteControlled
                    name={"id_cdp_com"}
                    control={control}
                    errors={errors}
                    placeholder={""}
                    options={cdps}
                    fnc_loadOptions={cargaCondicionPago}
                    editConfig={{ frmState, config: editConfig }}
                  />
                   */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="o_group mt-4">
        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
            <div className="g-col-sm-2">
              <div className="o_horizontal_separator mt-6 mb-4 text-uppercase fw-bolder small">
                Varios
              </div>
            </div>
            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Referencia</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <TextControlled
                    name={"referencia"}
                    control={control}
                    errors={errors}
                    placeholder={""}
                    editConfig={{ frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>
            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Empresa</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
{/* 
                  <AutocompleteControlled
                    name={"id_tfa"}
                    control={control}
                    errors={errors}
                    placeholder={""}
                    options={tfas}
                    fnc_loadOptions={cargaTarifas}
                    editConfig={{ frmState, config: editConfig }}
                  />
                   */}
                </div>
              </div>
            </div>


            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Sector</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <AutocompleteControlled
                    name={"id_cin"}
                    placeholder={""}
                    control={control}
                    errors={errors}
                    options={Cins}
                    // fnc_create={fnc_create}
                    createOpt={true}
                    // searchOpt={fnc_search}
                    // editOpt={fnc_create_edit}
                    // frmSearch={fnc_search}
                    fnc_loadOptions={cargaData_Cins}
                    // enlace={true}
                    // fnc_enlace={fnc_enlace}
                    editConfig={{ frmState, config: editConfig }}
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

export function FrmTab3({ control, errors, editConfig, frmState }) {
  return (
    <>
      <div className="w-full mt-5">
        <div className="w-full">
          <TextControlled
            name={"notas_internas"}
            control={control}
            errors={errors}
            multiline={true}
            className={"InputNoLineEx w-full"}
            placeholder={"Notas internas"}
            editConfig={{ frmState, config: editConfig }}
          />
        </div>
      </div>
    </>
  );
}

export function FrmSearch({ fnc_name, config, editConfig }) {
  const [list, setList] = useState([]);

  const cargaData = async () => {
    setList(await fncExecute(fnc_name, "s", null));
  };

  return (
    <>
      {/* <Dialog>
        <DialogTitle id="responsive-dialog-title">
          {'Buscar: Empresa Relacionada'}
        </DialogTitle>
        <DialogContent>
          <div className="">
            <hr />
            <div className="">
            </div>
          </div>
        </DialogContent>
      </Dialog> */}
    </>
  );
}
