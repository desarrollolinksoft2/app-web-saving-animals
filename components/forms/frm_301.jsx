"use client";
import { useEffect, useState } from "react";
import AutocompleteControlled from "../tools/inputs/autocomplete_controlled";
import RadioButtonControlled from "../tools/inputs/radio-button-controlled";
import TextControlled from "../tools/inputs/text_controlled";
import SelectControlled from "../tools/inputs/select_controlled";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import useAppStore from "@/store/zustand";
import ImageInput from "../tools/inputs/image_input";
import { fncExecute } from "@/data";
import Grid_list from "../grids/grid_list";
import { set } from "react-hook-form";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import pathNavigator from "../tools/navs/path_navigator";
import { capitalizar } from "../tools/functions/capitalizer";
import { Tooltip } from "@mui/material";
import useUserStore from "@/store/user_store";
import MultiSelectObject from "../tools/inputs/multi_select_objects";
import Chip from "@mui/material/Chip";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";

import { RiStarLine } from "react-icons/ri";
import { RiStarFill } from "react-icons/ri";

import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import CheckBoxControlled from "../tools/inputs/checkbox_controlled";

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

export function FrmStar({ control, errors, watch, setValue, editConfig }) {
  const frmSaveExpress = useAppStore((state) => state.frmSaveExpress);
  const setFrmSaveExpress = useAppStore((state) => state.setFrmSaveExpress);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const frmState = useAppStore((state) => state.frmState);
  const setFrmAction = useAppStore((state) => state.setFrmAction);

  const frmAction = useAppStore((state) => state.frmAction);

  const [isFav, setIsFav] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(
    <RiStarLine color="rgba(55, 65, 81, 0.76)" />
  );

  const handleMouseMove = () => {
    setDropdownVisible(<RiStarFill color="#f3cc00" />);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(<RiStarLine color="rgba(55, 65, 81, 0.76)" />);
  };

  const handleClick = () => {
    setValue("fav", frmItemSelected.fav ? false : true);
    // setIsFav(!isFav);
    // setFrmSaveExpress(true, ()=>{
    //   setFrmAction('updt')
    // })
    setFrmAction("uf");
  };

  // useEffect(()=>{
  //   setFrmSaveExpress(true, ()=>{
  //     setFrmAction('updt') //actualizar
  //   });
  // },[watch('fav')])

  useEffect(() => {
    if (frmItemSelected) {
      setIsFav(frmItemSelected.fav);
    }
  }, [frmItemSelected]);

  return (
    <>
      {/* <div className="o_field_widget o_field_priority self-center mr-3"> */}
      <div className="o_field_widget o_field_priority mr-3">
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          // onClick={() => handleChangeStatus("A")}>
          className="o_priority"
        >
          {isFav ? <RiStarFill color="#f3cc00" /> : isDropdownVisible}
        </div>
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
        name={"dsc_pdt"}
        control={control}
        rules={required}
        errors={errors}
        placeholder={"Por ejemplo, tostada de pan"}
        style={style}
        multiline={true}
        editConfig={{ frmState: frmState, config: editConfig }}
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
}) {
  const frmState = useAppStore((state) => state.frmState);
  // const frmItemSelected = useAppStore((state) => state.frmItemSelected);

  /*
  useEffect(() => {

    if (frmItemSelected) {
      if (frmState === "n") return;
    }
  }, [frmItemSelected]);
  */

  return (
    <>
      <FormControl
        className="frmControlEx mt-1"
        component="fieldset"
        variant="standard"
      >
        <FormGroup>
          <Stack direction="row" className="gap-5">
            <CheckBoxControlled
              dsc={"Se puede vender"}
              name={"bvender"}
              className="o_form_label"
              control={control}
              // value={false}
              errors={errors}
              editConfig={{ frmState: frmState, config: editConfig }}
            />
            <CheckBoxControlled
              dsc={"Se puede comprar"}
              name={"bcomprar"}
              className="o_form_label"
              control={control}
              // value={false}
              errors={errors}
              editConfig={{ frmState: frmState, config: editConfig }}
            />
          </Stack>
        </FormGroup>
      </FormControl>

      {/*
    {watch('tcon') === 'I' && <AutocompleteControlled
      name={"id_con_rel"}
      placeholder={"Nombre de la empresa ..."}
      control={control}
      errors={errors}
      options={companies}
      fnc_create={fnc_create}
      createOpt={true}
      searchOpt={true}
      editOpt={true}
      frmSearch={() => (<FrmSearch />)}
      fnc_loadOptions={cargaData}
      enlace={true}
      fnc_enlace={fnc_enlace}
    />} */}
    </>
  );
}

export function FrmTab0({ watch, control, errors, editConfig }) {
  const executeFnc = useAppStore((state) => state.executeFnc);

  const createOptions = useAppStore((state) => state.createOptions);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const frmState = useAppStore((state) => state.frmState);
  const setFrmItemSelected = useAppStore((state) => state.setFrmItemSelected);
  const setFrmSaveExpress = useAppStore((state) => state.setFrmSaveExpress);
  const frmList = useAppStore((state) => state.frmList);
  const frmListIndex = useAppStore((state) => state.frmListIndex);
  const appRoutes = useAppStore((state) => state.appRoutes);
  const setAppRoutes = useAppStore((state) => state.setAppRoutes);
  const setFrmList = useAppStore((state) => state.setFrmList);
  const setFrmListIndex = useAppStore((state) => state.setFrmListIndex);
  const frmFncEnlaceInterno = useAppStore((state) => state.frmFncEnlaceInterno);
  const route = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const tpdt_Options = [
    { label: "Consumible", value: "Consumible" },
    { label: "Servicio", value: "Servicio" },
    { label: "Producto almacenable", value: "Almacenable" },
    { label: "Cuotas de reservación", value: "Reservacion" },
    { label: "Set", value: "Set" },
  ];

  const [Cats, setCats] = useState([]);
  const cargaData_Cats = async () => {
    setCats(await createOptions("fnc_inv_ct_cat", "dsc_cat_full", "id_cat"));
  };

  const [Cias, setCias] = useState([]);
  const cargaData_Cias = async () => {
    setCias(await createOptions("fnc_cia_ct_cia", "dsc_cia", "id_cia"));
  };

  const [Udms, setUdms] = useState([]);
  const [Udms_compra, setUdms_compra] = useState([]);
  const cargaData_Udms = async () => {
    let lUdms = await createOptions("fnc_inv_ct_udm", "dsc_udm", "id_udm");
    setUdms(lUdms);
    setUdms_compra(lUdms);
  };

  // Impuestos del cliente - Ini
  const [Imps, setImps] = useState([]);
  const cargaImps = async () => {
    setImps(await createOptions("fnc_con_ct_imp", "nom_imp", "id_imp"));
  };
  const fnc_renderImps = (value, getProps) => {
    return value.map((option, index) => (
      <Chip
        className="text-gray-100"
        onClick={(e) => onChipClick(e, option)}
        label={option["nom_imp"]}
        size="small"
        {...getProps({ index })}
        // style={{ backgroundColor: option?.['color_cet'] }}
      />
    ));
  };
  // Impuestos del cliente - Fin

  const cargaData = () => {
    if (frmItemSelected?.["id_udm"]) {
      setUdms([
        {
          value: frmItemSelected["id_udm"],
          label: frmItemSelected["dsc_udm"],
        },
      ]);
    }

    if (frmItemSelected?.["id_udm_compra"]) {
      setUdms_compra([
        {
          value: frmItemSelected["id_udm_compra"],
          label: frmItemSelected["dsc_udm_compra"],
        },
      ]);
    }

    if (frmItemSelected?.["id_cia"]) {
      setCias([
        {
          value: frmItemSelected["id_cia"],
          label: frmItemSelected["dsc_cia"],
        },
      ]);
    }

    if (frmItemSelected?.["id_cat"]) {
      setCats([
        {
          value: frmItemSelected["id_cat"],
          label: frmItemSelected["dsc_cat_full"],
        },
      ]);
    }
  };

  useEffect(() => {
    cargaData();

    GET__precio_venta__imps(
      frmItemSelected?.["precio_venta"],
      frmItemSelected?.["tag_imp_v"]
    );
  }, [frmItemSelected]);

  const [Sim_div, setSim_div] = useState([]);
  const carga_div_cia = async () => {
    let res = await executeFnc("fnc_con_ct_div", "s_cia", []);
    setSim_div(res[0].sim_div);
  };

  useEffect(() => {
    carga_div_cia();
  }, []);

  const [sortOrder, setSortOrder] = useState("ascending");

  const [show__precio_venta__imps_incl, setShow__precio_venta__imps_incl] =
    useState(false);
  const [
    show__precio_venta__imps_no_incl,
    setShow__precio_venta__imps_no_incl,
  ] = useState(false);

  const [precio_venta__imps_incl, setPrecio_venta__imps_incl] = useState(0);
  const [precio_venta__imps_no_incl, setPrecio_venta__imps_no_incl] =
    useState(0);

  const tag_imp_v__change = (list__tag_imp_v) => {
    GET__precio_venta__imps(watch("precio_venta"), list__tag_imp_v);
  };
  const precio_venta__change = (precio_venta) => {
    GET__precio_venta__imps(precio_venta, watch("tag_imp_v"));
  };

  const GET__precio_venta__imps = async (precio_venta, list__tag_imp_v) => {

    let ln__importe__imps_incl = 0;
    let ln__importe__imps_no_incl = 0;
    
    let res = await executeFnc("fnc_GET_impuestos", "s_cal", {
      precio_venta: precio_venta,
      tag_imp_v: list__tag_imp_v,
    });

    // console.log(res[0].sim_div);
    console.log(res.base_imponible__incl__anterior);

    ln__importe__imps_incl = res.importe__imps_incl;
    ln__importe__imps_no_incl = res.importe__imps_no_incl;

    setShow__precio_venta__imps_incl(false);
    setShow__precio_venta__imps_no_incl(false);

    // -----------------------------------------------

    if (
      // (ln__importes__imps_incl__afecta_subsecuentes > 0 ||
        // ln__importes__imps_incl__no_afecta_subsecuentes > 0) &&
      ln__importe__imps_incl > 0 &&
      Number(precio_venta) > 0
    ) {
      setPrecio_venta__imps_incl(ln__importe__imps_incl);
      setShow__precio_venta__imps_incl(true);
    }



    if (
      // (ln__importes__imps_no_incl__afecta_subsecuentes > 0 ||
      //   ln__importes__imps_no_incl__no_afecta_subsecuentes > 0) &&
      ln__importe__imps_no_incl > 0 &&
      Number(precio_venta) > 0
    ) {
      setPrecio_venta__imps_no_incl(ln__importe__imps_no_incl);
      setShow__precio_venta__imps_no_incl(true);
    }


  };

  const GET__precio_venta__imps__BKP = (precio_venta, list__tag_imp_v) => {
    // carga_div_cia111();

    // -------------------------------
    let ln__importes_imps_incl = 0;
    let ln__importes_imps_no_incl = 0;
    // --------------------------

    let ln__importes__imps_incl__afecta_subsecuentes = 0;
    let ln__importes__imps_incl__no_afecta_subsecuentes = 0;

    let ln__importes__imps_no_incl__afecta_subsecuentes = 0;
    let ln__importes__imps_no_incl__no_afecta_subsecuentes = 0;

    let ln__precio_venta__imps_incl = 0;
    let ln__precio_venta__imps_no_incl = 0;

    let ln__diferencia = 0;

    list__tag_imp_v?.map((option, index) => {
      if (option.incluido_precio) {
        // ln__importes_imps_incl += option.importe;

        if (option.afecta_subsecuentes) {
          ln__importes__imps_incl__afecta_subsecuentes += option.importe;
        } else {
          ln__importes__imps_incl__no_afecta_subsecuentes += option.importe;
        }
      } else {
        // ln__importes_imps_no_incl += option.importe;

        if (option.afecta_subsecuentes) {
          ln__importes__imps_no_incl__afecta_subsecuentes += option.importe;
        } else {
          ln__importes__imps_no_incl__no_afecta_subsecuentes += option.importe;
        }
      }
    });

    setShow__precio_venta__imps_incl(false);
    setShow__precio_venta__imps_no_incl(false);

    if (
      (ln__importes__imps_incl__afecta_subsecuentes > 0 ||
        ln__importes__imps_incl__no_afecta_subsecuentes > 0) &&
      Number(precio_venta) > 0
    ) {

      ln__precio_venta__imps_no_incl =
        Number(precio_venta) /
        (1 + ln__importes__imps_incl__no_afecta_subsecuentes / 100);
      ln__precio_venta__imps_no_incl =
        ln__precio_venta__imps_no_incl.toFixed(2);

      ln__precio_venta__imps_no_incl =
        ln__precio_venta__imps_no_incl /
        (1 + ln__importes__imps_incl__afecta_subsecuentes / 100);
      ln__precio_venta__imps_no_incl =
        ln__precio_venta__imps_no_incl.toFixed(2);

      setPrecio_venta__imps_no_incl(ln__precio_venta__imps_no_incl);
      setShow__precio_venta__imps_no_incl(true);

      if (
        (ln__importes__imps_no_incl__afecta_subsecuentes > 0 ||
          ln__importes__imps_no_incl__no_afecta_subsecuentes > 0) &&
        (ln__importes__imps_incl__afecta_subsecuentes > 0 ||
          ln__importes__imps_incl__no_afecta_subsecuentes > 0)
      ) {
        ln__diferencia = precio_venta - ln__precio_venta__imps_no_incl;
        ln__diferencia =
          ln__diferencia *
          ((ln__importes__imps_no_incl__afecta_subsecuentes +
            ln__importes__imps_no_incl__no_afecta_subsecuentes) /
            100);
            
      }
    }

    // if (ln__importes_imps_incl > 0 && Number(precio_venta) > 0) {
    //   ln__precio_venta__imps_no_incl = Number(precio_venta) / (1 + (ln__importes_imps_incl / 100));
    //   ln__precio_venta__imps_no_incl = ln__precio_venta__imps_no_incl.toFixed(2);

    //   setPrecio_venta__imps_no_incl(ln__precio_venta__imps_no_incl);
    //   setShow__precio_venta__imps_no_incl(true);

    //   if (ln__importes_imps_no_incl > 0) {
    //     ln__diferencia = precio_venta - ln__precio_venta__imps_no_incl;
    //     ln__diferencia = ln__diferencia * (ln__importes_imps_no_incl / 100);
    //   }
    // }

    // ----------------------------------------------------------------

    // if (ln__importes_imps_no_incl > 0 && Number(precio_venta) > 0) {
    //   ln__precio_venta__imps_incl = Number(precio_venta) * (1 + (ln__importes_imps_no_incl / 100));
    //   ln__precio_venta__imps_incl = ln__precio_venta__imps_incl.toFixed(2);

    //   ln__precio_venta__imps_incl = ln__precio_venta__imps_incl - ln__diferencia;
    //   ln__precio_venta__imps_incl = ln__precio_venta__imps_incl.toFixed(2);

    //   setPrecio_venta__imps_incl(ln__precio_venta__imps_incl);
    //   setShow__precio_venta__imps_incl(true);
    // }

    if (
      (ln__importes__imps_no_incl__afecta_subsecuentes > 0 ||
        ln__importes__imps_no_incl__no_afecta_subsecuentes > 0) &&
      Number(precio_venta) > 0
    ) {
      
      ln__precio_venta__imps_incl =
        Number(precio_venta) *
        (1 + ln__importes__imps_no_incl__no_afecta_subsecuentes / 100);
      ln__precio_venta__imps_incl = ln__precio_venta__imps_incl.toFixed(2);

      ln__precio_venta__imps_incl =
        ln__precio_venta__imps_incl *
        (1 + ln__importes__imps_no_incl__afecta_subsecuentes / 100);
      ln__precio_venta__imps_incl = ln__precio_venta__imps_incl.toFixed(2);

      ln__precio_venta__imps_incl =
        ln__precio_venta__imps_incl - ln__diferencia;
      ln__precio_venta__imps_incl = ln__precio_venta__imps_incl.toFixed(2);

      setPrecio_venta__imps_incl(ln__precio_venta__imps_incl);
      setShow__precio_venta__imps_incl(true);
    }
  };

  return (
    <>
      <div className="o_group mt-4">
        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
            {/*
            <div className="g-col-sm-2">
              <div className="o_horizontal_separator mt-6 mb-4 text-uppercase fw-bolder small">Ventas</div>
            </div>
            */}

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Tipo de producto</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <SelectControlled
                    name={"tpdt"}
                    control={control}
                    errors={errors}
                    options={tpdt_Options}
                    rules={required}
                    editConfig={{ frmState: frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Unidad de medida</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <AutocompleteControlled
                    name={"id_udm"}
                    placeholder={""}
                    control={control}
                    errors={errors}
                    options={Udms}
                    // fnc_create={fnc_create}
                    createOpt={true}
                    searchOpt={true}
                    editOpt={true}
                    // frmSearch={() => (<FrmSearch />)}
                    fnc_loadOptions={cargaData_Udms}
                    enlace={true}
                    rules={required}
                    editConfig={{ frmState: frmState, config: editConfig }}
                    // fnc_enlace={fnc_enlace}
                  />
                </div>
              </div>
            </div>

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">UdM de compra</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <AutocompleteControlled
                    name={"id_udm_compra"}
                    placeholder={""}
                    control={control}
                    errors={errors}
                    options={Udms_compra}
                    // fnc_create={fnc_create}
                    createOpt={true}
                    searchOpt={true}
                    editOpt={true}
                    // frmSearch={() => (<FrmSearch />)}
                    fnc_loadOptions={cargaData_Udms}
                    enlace={true}
                    rules={required}
                    editConfig={{ frmState: frmState, config: editConfig }}
                    // fnc_enlace={fnc_enlace}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
            {/*
            <div className="g-col-sm-2">
              <div className="o_horizontal_separator mt-6 mb-4 text-uppercase fw-bolder small">Compras</div>
            </div>
            */}

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Precio de venta</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <div className="w-full flex">
                    <span className="div_simbol">{Sim_div}</span>
                    <div name="precio" className="w-36 pr-7 o_field_importe">
                      <TextControlled
                        name={"precio_venta"}
                        control={control}
                        errors={errors}
                        placeholder={""}
                        editConfig={{ frmState: frmState, config: editConfig }}
                        handleOnChanged={precio_venta__change}
                      />
                    </div>

                    {(show__precio_venta__imps_incl ||
                      show__precio_venta__imps_no_incl) && (
                      <div className="o_field_widget o_label_importe">
                        <span>
                          (=
                          {show__precio_venta__imps_incl && (
                            <>
                              {Sim_div} {precio_venta__imps_incl} impuestos
                              incluidos
                            </>
                          )}
                          {show__precio_venta__imps_incl &&
                            show__precio_venta__imps_no_incl && <>,&nbsp;</>}
                          {show__precio_venta__imps_no_incl && (
                            <>
                              {Sim_div} {precio_venta__imps_no_incl} impuestos
                              no incluidos
                            </>
                          )}
                          )
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Impuestos del cliente</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <MultiSelectObject
                    name={"tag_imp_v"}
                    control={control}
                    options={Imps}
                    errors={errors}
                    placeholder={""}
                    fnc_loadOptions={cargaImps}
                    renderTags={fnc_renderImps}
                    optionLabel={"dsc_imp"}
                    optionValue={"id_imp"}
                    // fnc_create={fnc_createTag}
                    createOpt={true}
                    searchOpt={true}
                    editConfig={{ frmState: frmState, config: editConfig }}
                    handleOnChanged={tag_imp_v__change}
                  />
                </div>
              </div>
            </div>

            {/*
            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Código de detracción</label>
              </div>
              <div className="o_cell">
                <div className="o_field">

                </div>
              </div>
            </div>
             */}

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Costo</label>
              </div>

              <div className="o_cell">
                <div className="o_field">
                  <div className="w-full flex">
                    <span className="div_simbol">{Sim_div}</span>
                    <div name="costo" className="w-36 pr-7 o_field_importe">
                      <TextControlled
                        name={"costo"}
                        control={control}
                        errors={errors}
                        placeholder={""}
                        editConfig={{ frmState: frmState, config: editConfig }}
                      />
                    </div>
                    <div
                      name="udm_string"
                      className="o_field_widget o_label_importe"
                    >
                      <span>por </span>
                      <span>unidades</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Categoría del producto</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <AutocompleteControlled
                    name={"id_cat"}
                    placeholder={""}
                    control={control}
                    errors={errors}
                    options={Cats}
                    // fnc_create={fnc_create}
                    createOpt={true}
                    searchOpt={true}
                    editOpt={true}
                    // frmSearch={() => (<FrmSearch />)}
                    fnc_loadOptions={cargaData_Cats}
                    enlace={true}
                    // fnc_enlace={fnc_enlace}
                    editConfig={{ frmState: frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Referencia interna</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <TextControlled
                    name={"ref_interna"}
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
                <label className="o_form_label">Código de barras</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <TextControlled
                    name={"cod_barras"}
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
                <label className="o_form_label">Empresa</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <AutocompleteControlled
                    name={"id_cia"}
                    placeholder={""}
                    control={control}
                    errors={errors}
                    options={Cias}
                    // fnc_create={fnc_create}
                    createOpt={true}
                    searchOpt={true}
                    editOpt={true}
                    // frmSearch={() => (<FrmSearch />)}
                    fnc_loadOptions={cargaData_Cias}
                    enlace={true}
                    // fnc_enlace={fnc_enlace}
                    editConfig={{ frmState: frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="o_inner_group grid">
          <div className="g-col-sm-2">
            <div className="o_horizontal_separator mt-6 mb-4 text-uppercase fw-bolder small">
              NOTAS INTERNAS
            </div>
          </div>
        </div>

        <div className="w-full">
          <TextControlled
            name={"notas_internas"}
            control={control}
            errors={errors}
            multiline={true}
            className={"InputNoLineEx w-full"}
            placeholder={"Esta nota es solo para fines internos"}
            editConfig={{ frmState: frmState, config: editConfig }}
          />
        </div>
      </div>
    </>
  );
}

export function FrmTab1({ watch, control, errors, editConfig }) {
  const createOptions = useAppStore((state) => state.createOptions);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const frmState = useAppStore((state) => state.frmState);
  const setFrmItemSelected = useAppStore((state) => state.setFrmItemSelected);
  const setFrmSaveExpress = useAppStore((state) => state.setFrmSaveExpress);
  const frmList = useAppStore((state) => state.frmList);
  const frmListIndex = useAppStore((state) => state.frmListIndex);
  const appRoutes = useAppStore((state) => state.appRoutes);
  const setAppRoutes = useAppStore((state) => state.setAppRoutes);
  const setFrmList = useAppStore((state) => state.setFrmList);
  const setFrmListIndex = useAppStore((state) => state.setFrmListIndex);
  const frmFncEnlaceInterno = useAppStore((state) => state.frmFncEnlaceInterno);
  const route = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [cdps, setCdps] = useState([]);
  const [clients, setClients] = useState([]);
  const [tfas, setTfas] = useState([]);

  const cargaCondicionPago = async () => {
    setCdps(await createOptions("fnc_fa_ct_cdp", "dsc_cdp", "id_cdp"));
  };

  const cargaTarifas = async () => {
    setTfas(await createOptions("fnc_ve_ct_ldp", "dsc_ldp", "id_ldp"));
  };
  const fnc_enlace = async (value, name) => {
    // setFrmSaveExpress(true)
    // let nroute = {
    //   name:watch('dsc_con'),
    //   path: searchParams.toString(),
    //   list: frmList,
    //   index: frmListIndex
    // }
    // setAppRoutes([...appRoutes, nroute])
    // setFrmList([{ 'id_con': value }])
    // setFrmListIndex(0)
    // await setFrmItemSelected({ fnc_name:'fnc_fa_ct_cdp', idName: 'con.id_con', value })

    // pathNavigator(pathname, route, searchParams, { view_type: "form", id: value , config:'602'});

    frmFncEnlaceInterno({
      currentName: watch("dsc_con"),
      currentPath: searchParams.toString(),
      nItem: { id_con: value },
      nItemSelected: { fnc_name: "fnc_fa_ct_cdp", idName: "con.id_con", value },
      fnc_next: () => {
        pathNavigator(pathname, route, searchParams, {
          view_type: "form",
          id: value,
          config: "602",
        });
      },
    });
  };

  const cargaData = () => {
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

    if (frmItemSelected?.["id_ldp"]) {
      setTfas([
        {
          label: frmItemSelected["dsc_ldp"],
          value: frmItemSelected["id_ldp"],
        },
      ]);
    }
  };

  useEffect(() => {
    cargaData();
  }, []);

  return (
    <>
      {/* <div className="o_group mt-4"> */}
      <div className="o_group">
        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
            <div className="g-col-sm-2">
              <div className="o_horizontal_separator mt-6 mb-4 text-uppercase fw-bolder small">
                DESCRIPCIÓN DE VENTAS
              </div>
            </div>
          </div>

          <div className="w-full">
            <TextControlled
              name={"dsc_venta"}
              control={control}
              errors={errors}
              multiline={true}
              className={"InputNoLineEx w-full"}
              placeholder={
                "Esta nota se agrega a las órdenes de ventas y facturas."
              }
              editConfig={{ frmState: frmState, config: editConfig }}
            />
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
            <div className="g-col-sm-2">
              <div className="o_horizontal_separator mt-6 mb-4 text-uppercase fw-bolder small">
                PUNTO DE VENTA
              </div>
            </div>
            <div className="d-sm-contents">
              <div className="o_cell">
                <label className="o_form_label">Disponible en TPV</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <div className="frmControlEx">
                    <CheckBoxControlled
                      // dsc={"Se puede comprar"}
                      name={"bdtpv"}
                      className="o_form_label"
                      labelPlacement={"start"}
                      control={control}
                      // value={false}
                      errors={errors}
                      editConfig={{ frmState: frmState, config: editConfig }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 
          <div className="w-full">
            <div className="frmControlEx">
              <CheckBoxControlled
                dsc={"Disponible en TPV"}
                name={"bdtpv"}
                className="o_form_label"
                labelPlacement={"start"}
                control={control}
                // value={false}
                errors={errors}
                editConfig={{ frmState: frmState, config: editConfig }}
              />
            </div>
          </div>
           */}
        </div>
      </div>
    </>
  );
}

export function FrmTab2({ watch, control, errors, editConfig }) {
  const createOptions = useAppStore((state) => state.createOptions);
  const frmState = useAppStore((state) => state.frmState);

  // Impuestos del cliente - Ini
  const [Imps, setImps] = useState([]);
  const cargaImps = async () => {
    setImps(await createOptions("fnc_con_ct_imp", "nom_imp", "id_imp"));
  };
  const fnc_renderImps = (value, getProps) => {
    return value.map((option, index) => (
      <Chip
        className="text-gray-100"
        onClick={(e) => onChipClick(e, option)}
        label={option["nom_imp"]}
        size="small"
        {...getProps({ index })}
        // style={{ backgroundColor: option?.['color_cet'] }}
      />
    ));
  };
  // Impuestos del cliente - Fin

  return (
    <>
      <div className="o_group mt-4">
        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
            <div className="g-col-sm-2">
              <div className="o_horizontal_separator mt-6 mb-4 text-uppercase fw-bolder small">
                FACTURAS DE PROVEEDORES
              </div>
            </div>

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Impuestos de proveedor</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <MultiSelectObject
                    name={"tag_imp_c"}
                    control={control}
                    options={Imps}
                    errors={errors}
                    placeholder={""}
                    fnc_loadOptions={cargaImps}
                    renderTags={fnc_renderImps}
                    optionLabel={"dsc_imp"}
                    optionValue={"id_imp"}
                    // fnc_create={fnc_createTag}
                    createOpt={true}
                    searchOpt={true}
                    editConfig={{ frmState: frmState, config: editConfig }}
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
                DESCRIPCIÓN DE COMPRA
              </div>
            </div>
          </div>

          <div className="w-full">
            <TextControlled
              name={"dsc_compra"}
              control={control}
              errors={errors}
              multiline={true}
              className={"InputNoLineEx w-full"}
              placeholder={"Esta nota se agrega a las órdenes de compra."}
              editConfig={{ frmState: frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export function FrmTab3({ watch, control, errors, editConfig }) {
  const createOptions = useAppStore((state) => state.createOptions);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const setFrmItemSelected = useAppStore((state) => state.setFrmItemSelected);
  const setFrmSaveExpress = useAppStore((state) => state.setFrmSaveExpress);
  const frmList = useAppStore((state) => state.frmList);
  const frmListIndex = useAppStore((state) => state.frmListIndex);
  const appRoutes = useAppStore((state) => state.appRoutes);
  const setAppRoutes = useAppStore((state) => state.setAppRoutes);
  const setFrmList = useAppStore((state) => state.setFrmList);
  const setFrmListIndex = useAppStore((state) => state.setFrmListIndex);
  const frmFncEnlaceInterno = useAppStore((state) => state.frmFncEnlaceInterno);
  const frmState = useAppStore((state) => state.frmState);
  const route = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [cdps, setCdps] = useState([]);
  const [clients, setClients] = useState([]);
  const [tfas, setTfas] = useState([]);

  const cargaCondicionPago = async () => {
    setCdps(await createOptions("fnc_fa_ct_cdp", "dsc_cdp", "id_cdp"));
  };

  const cargaTarifas = async () => {
    setTfas(await createOptions("fnc_ve_ct_ldp", "dsc_ldp", "id_ldp"));
  };
  const fnc_enlace = async (value, name) => {
    // setFrmSaveExpress(true)
    // let nroute = {
    //   name:watch('dsc_con'),
    //   path: searchParams.toString(),
    //   list: frmList,
    //   index: frmListIndex
    // }
    // setAppRoutes([...appRoutes, nroute])
    // setFrmList([{ 'id_con': value }])
    // setFrmListIndex(0)
    // await setFrmItemSelected({ fnc_name:'fnc_fa_ct_cdp', idName: 'con.id_con', value })

    // pathNavigator(pathname, route, searchParams, { view_type: "form", id: value , config:'602'});

    frmFncEnlaceInterno({
      currentName: watch("dsc_con"),
      currentPath: searchParams.toString(),
      nItem: { id_con: value },
      nItemSelected: { fnc_name: "fnc_fa_ct_cdp", idName: "con.id_con", value },
      fnc_next: () => {
        pathNavigator(pathname, route, searchParams, {
          view_type: "form",
          id: value,
          config: "602",
        });
      },
    });
  };

  const cargaData = () => {
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

    if (frmItemSelected?.["id_ldp"]) {
      setTfas([
        {
          label: frmItemSelected["dsc_ldp"],
          value: frmItemSelected["id_ldp"],
        },
      ]);
    }
  };

  useEffect(() => {
    cargaData();
  }, []);

  return (
    <>
      <div className="o_group mt-4">
        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
            <div className="g-col-sm-2">
              <div className="o_horizontal_separator mt-6 mb-4 text-uppercase fw-bolder small">
                Descripción para recepciones
              </div>
            </div>
          </div>

          <div className="w-full">
            <TextControlled
              name={"dsc_recepcion"}
              control={control}
              errors={errors}
              multiline={true}
              className={"InputNoLineEx w-full"}
              placeholder={
                "Esta nota se agrega a las órdenes de recepción (por ejemplo, dónde guardar el producto dentro del almacén)."
              }
              editConfig={{ frmState: frmState, config: editConfig }}
            />
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
            <div className="g-col-sm-2">
              <div className="o_horizontal_separator mt-6 mb-4 text-uppercase fw-bolder small">
                Descripción para órdenes de entrega
              </div>
            </div>
          </div>

          <div className="w-full">
            <TextControlled
              name={"dsc_entrega"}
              className={"InputNoLineEx w-full"}
              placeholder={"Esta nota se agrega a las órdenes de entrega."}
              multiline={true}
              control={control}
              errors={errors}
              editConfig={{ frmState: frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export function FrmTab4({ watch, control, errors, editConfig }) {
  const createOptions = useAppStore((state) => state.createOptions);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const frmState = useAppStore((state) => state.frmState);

  const [Con_C25, setCon_C25] = useState([]);
  const cargaData_Con_C25 = async () => {
    setCon_C25(
      await createOptions(
        "fnc_con_peru_ct_25",
        "cod_unspsc__dsc_unspsc",
        "id_unspsc"
      )
    );
  };

  const cargaData = () => {
    if (frmItemSelected?.["id_unspsc"]) {
      setCon_C25([
        {
          value: frmItemSelected["id_unspsc"],
          label: frmItemSelected["cod_unspsc__dsc_unspsc"],
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
                UNSPSC
              </div>
            </div>

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Categoría UNSPSC</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <AutocompleteControlled
                    name={"id_unspsc"}
                    placeholder={""}
                    control={control}
                    errors={errors}
                    options={Con_C25}
                    // fnc_create={fnc_create}
                    // createOpt={true}
                    searchOpt={true}
                    // editOpt={true}
                    // frmSearch={() => (<FrmSearch />)}
                    fnc_loadOptions={cargaData_Con_C25}
                    // enlace={true}
                    rules={required}
                    editConfig={{ frmState: frmState, config: editConfig }}
                    // fnc_enlace={fnc_enlace}
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

export function FrmSearch({ fnc_name, config }) {
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
