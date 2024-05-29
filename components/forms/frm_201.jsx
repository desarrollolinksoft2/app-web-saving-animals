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
import CheckBoxControlled from "../tools/inputs/checkbox_controlled";

const required = {
  required: { value: true, message: "Este campo es requerido" },
};

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
        name={"dsc_con"}
        control={control}
        rules={required}
        errors={errors}
        placeholder={"por ejemplo, Alberto Cervantes"}
        style={style}
        multiline={true}
        editConfig={{ frmState: frmState, config: editConfig }}
      />
    </>
  );
}

export function FrmMiddle({ setValues, control, errors, watch, editConfig }) {
  const createOptions = useAppStore((state) => state.createOptions);
  const executeFnc = useAppStore((state) => state.executeFnc);
  const frmCreater = useAppStore((state) => state.frmCreater);
  const frmState = useAppStore((state) => state.frmState);
  const [tags, setTags] = useState([]);
  const [popup, setPopup] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [tagSelected, setTagSelected] = useState(null);

  const Options_calculo = [
    { label: "Grupo de impuestos", value: "Grupo" },
    { label: "Fijo", value: "Fijo" },
    { label: "Porcentaje del precio", value: "Porciento" },
    {
      label: "Porcentaje sobre el precio, impuestos incluidos",
      value: "Division",
    },
  ];

  return (
    <>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Nombre del impuesto</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <TextControlled
              name={"nom_imp"}
              control={control}
              rules={required}
              errors={errors}
              placeholder={""}
              editConfig={{ frmState: frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Descripción</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <TextControlled
              name={"dsc_imp"}
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
          <label className="o_form_label">Cálculo de impuestos</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <SelectControlled
              name={"calculo"}
              control={control}
              errors={errors}
              options={Options_calculo}
            />
          </div>
        </div>
      </div>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Activo</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            {/* <TextControlled
            name={"email"}
            control={control}
            errors={errors}
            placeholder={""}
            />
             */}
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
}) {
  const frmState = useAppStore((state) => state.frmState);
  const createOptions = useAppStore((state) => state.createOptions);

  const [Cias, setCias] = useState([]);
  const [aigv, setAigv] = useState([]);
  const cargaData = async () => {
    setCias(await createOptions("fnc_con_peru_ct_5", "dsc_tbt", "id_tbt"));
    setAigv(await createOptions("fnc_con_peru_ct_7", "dsc_aigv", "id_aigv"));
  };

  useEffect(() => {
    cargaData();
  }, []);

  const Options_unece = [
    { label: "", value: "" },
    { label: "Exento de impuestos", value: "E" },
    { label: "Articulo de exportación, libre de impuestos.", value: "G" },
    { label: "Servicios fuera del ámbito fiscal", value: "O" },
    { label: "Tarifa estándar", value: "S" },
    { label: "Bienes libres de impuestos", value: "Z" },
  ];

  const Options_timp = [
    { label: "Ventas", value: "Ventas" },
    { label: "Compras", value: "Compras" },
    { label: "Ninguno", value: "Ninguno" },
  ];

  const Options_aimp = [
    { label: "", value: "" },
    { label: "Servicios", value: "Servicios" },
    { label: "Bienes", value: "Bienes" },
  ];

  return (
    <>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Código</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <SelectControlled
              name={"id_tbt"}
              control={control}
              errors={errors}
              options={Cias}
            />
          </div>
        </div>
      </div>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Código UNECE</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <SelectControlled
              name={"unece"}
              control={control}
              errors={errors}
              options={Options_unece}
            />
          </div>
        </div>
      </div>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">EDI Razón de Afectación</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <SelectControlled
              name={"id_aigv"}
              control={control}
              errors={errors}
              options={aigv}
            />
          </div>
        </div>
      </div>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Tipo de impuesto</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <SelectControlled
              name={"timp"}
              control={control}
              errors={errors}
              options={Options_timp}
            />
          </div>
        </div>
      </div>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Ámbito del impuesto</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <SelectControlled
              name={"aimp"}
              control={control}
              errors={errors}
              options={Options_aimp}
            />
          </div>
        </div>
      </div>

      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Importe</label>
        </div>

        <div className="o_cell">
          <div className="o_field">
            <div className="w-full flex">
              <div name="importe" className="w-28 pr-2 o_field_importe">
                <TextControlled
                  name={"importe"}
                  control={control}
                  errors={errors}
                  placeholder={""}
                  editConfig={{ frmState: frmState, config: editConfig }}
                />
              </div>
              <div
                // name="udm_string"
                // className="o_field_widget o_label_importe"
                className="o_field_widget"
              >
                <span>%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function FrmTab0({ watch, control, errors, editConfig }) {
  const createOptions = useAppStore((state) => state.createOptions);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const frmState = useAppStore((state) => state.frmState);

  const [Cias, setCias] = useState([]);
  const cargaData_Cias = async () => {
    setCias(await createOptions("fnc_cia_ct_cia", "dsc_cia", "id_cia"));
  };

  const [Impg, setImpg] = useState([]);
  const cargaData_Impg = async () => {
    setImpg(await createOptions("fnc_con_ct_impg", "nom_impg", "id_impg"));
  };

  const cargaData = () => {
    if (frmItemSelected?.["id_cia"]) {
      setCias([
        {
          value: frmItemSelected["id_cia"],
          label: frmItemSelected["dsc_cia"],
        },
      ]);
    }

    if (frmItemSelected?.["id_impg"]) {
      setImpg([
        {
          value: frmItemSelected["id_impg"],
          label: frmItemSelected["nom_impg"],
        },
      ]);
    }
  };

  useEffect(() => {
    cargaData();
  }, [frmItemSelected]);

  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const frmFncEnlaceInterno = useAppStore((state) => state.frmFncEnlaceInterno);
  const fnc_enlace = (value) => {
    frmFncEnlaceInterno({
      currentName: "dsc_imp", //watch('dsc_con'),
      currentPath: searchParams.toString(),
      nItem: { id_con: value },
      nItemSelected: {
        fnc_name: "fnc_cia_ct_cia",
        idName: "cia.id_cia",
        value,
      },
      fnc_next: () => {
        pathNavigator(pathname, route, searchParams, {
          view_type: "form",
          id: value,
          config: "102",
        });
      },
    });
  };

  return (
    <>
      <div className="o_group mt-4">
        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Etiqueta en facturas</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <TextControlled
                    name={"etiqueta"}
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
                <label className="o_form_label">Grupo de impuestos</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <AutocompleteControlled
                    name={"id_impg"}
                    placeholder={""}
                    control={control}
                    rules={required}
                    errors={errors}
                    options={Impg}
                    // fnc_create={fnc_create}
                    createOpt={true}
                    searchOpt={true}
                    editOpt={true}
                    // frmSearch={() => (<FrmSearch />)}
                    fnc_loadOptions={cargaData_Impg}
                    enlace={true}
                    // fnc_enlace={fnc_enlace}
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
                    fnc_enlace={fnc_enlace}
                    editConfig={{ frmState: frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>

            {/*
            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">País</label>
              </div>
              <div className="o_cell">
                <div className="o_field">

                </div>
              </div>
            </div>
             */}
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
            <div className="d-sm-contents">
              {/* <div className="o_cell o_wrap_label"> */}
              <div className="o_cell">
                <label className="o_form_label">Incluido en el precio</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <div className="frmControlEx">
                    <CheckBoxControlled
                      dsc={""}
                      name={"incluido_precio"}
                      className="align-text-bottom"
                      control={control}
                      errors={errors}
                      editConfig={{ frmState: frmState, config: editConfig }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-sm-contents">
              {/* <div className="o_cell o_wrap_label"> */}
              <div className="o_cell">
                <label className="o_form_label">
                  Afecta la base de los impuestos subsecuentes
                </label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <div className="frmControlEx">
                    <CheckBoxControlled
                      dsc={""}
                      name={"afecta_subsecuentes"}
                      className="align-text-bottom"
                      control={control}
                      errors={errors}
                      editConfig={{ frmState: frmState, config: editConfig }}
                    />
                  </div>
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
