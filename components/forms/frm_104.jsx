"use client";
import { useEffect, useRef, useState } from "react";
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
import CheckBoxControlled from "../tools/inputs/checkbox_controlled";
import SwitchControlled from "../tools/inputs/switch_controlled";
import Stack from "@mui/material/Stack";
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const required = {
  required: { value: true, message: "Este campo es requerido" },
};

export function FrmMiddle({ setValues, control, errors, watch, editConfig }) {
  const frmState = useAppStore((state) => state.frmState);

  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createOptions = useAppStore((state) => state.createOptions);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const frmFncEnlaceInterno = useAppStore((state) => state.frmFncEnlaceInterno);


  const [Cets, setCets] = useState([]);
  const cargaData_Cets = async () => {
    setCets(await createOptions("fnc_cia_ct_cet", "dsc_cet_full", "id_cet"));
  };

  const fnc_enlace = (value) => {
    frmFncEnlaceInterno({
      currentName: "dsc_cet", //watch('dsc_cat'),
      currentPath: searchParams.toString(),
      nItem: { id_cet: value },
      nItemSelected: { fnc_name: "fnc_cia_ct_cet", idName: "id_cet", value },
      fnc_next: () => {
        pathNavigator(pathname, route, searchParams, {
          view_type: "form",
          id: value,
          config: "103",
        });
      },
    });
  };

  useEffect(() => {
    if (frmItemSelected?.["id_cet_rel"]) {
      setCets([
        {
          label: frmItemSelected["dsc_cet_rel"],
          value: frmItemSelected["id_cet_rel"],
        },
      ]);
    }
  }, [frmItemSelected]);

  const switchHandler = (checked) => {
    let currentForm = { ...watch() };
    // currentForm["status"] = (currentForm["status_switch"] === true ? "A" : "I");
    setValues("status", currentForm["status_switch"] === true ? "A" : "I");
  };

  // -------------------------------------------
  const [tags, setTags] = useState([]);
  const [popup, setPopup] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [tagSelected, setTagSelected] = useState(null);
  const [color, setColor] = useState("");
  const colorOptionsRef = useRef(null);

  // const fn_click = (e, option) => {
  //   console.log("ejecuto");
  //   console.log(e.currentTarget);
  //   setPopup(popup ? null : e.currentTarget);
  //   setOpenPopup(!openPopup);
  //   // setTagSelected(option);
  // };

  const fn_click2 = (e, option) => {
    setOpenPopup(!openPopup);
    // colorOptionsRef.current.focus();
    // console.log(colorOptionsRef.)
    // setTagSelected(option);
  };

  const fn_click3 = (color, field) => {
    field.onChange(color);
    setColor(color);
    // setValues("color_cet", color, { shouldDirty: true });

    setOpenPopup(!openPopup);
    // setTagSelected(option);
  };

  const ColorOptions = [
    { label: "Sin color", value: 0 },
    { label: "Rojo", value: 1 },
    { label: "Naranja", value: 2 },
    { label: "Amarillo", value: 3 },
    { label: "Cian", value: 4 },
    { label: "Morado", value: 5 },
    { label: "Almendra", value: 6 },
    { label: "Turquesa", value: 7 },
    { label: "Azul", value: 8 },
    { label: "Frambuesa", value: 9 },
    { label: "Verde", value: 10 },
    { label: "Violeta", value: 11 },
  ];

  const handleEsc = (e) => {
    // console.log(e.key);
    if (e.key === 'Escape') {
      // console.log("esc");
      setOpenPopup(false);
    }
  }

  const handleBlur = () => {
    if (openPopup) {
      // console.log("se quitó el foco");
      setOpenPopup(false)
    }
  }


  useEffect(() => {

    if (frmItemSelected) {
      setColor(frmItemSelected["color_cet"]);
    }

  }, [frmItemSelected]);

  // useEffect(() => {
  //   if (openPopup) {
  //     colorOptionsRef.current.focus();
  //     console.log('focus');
  //   }
  // }, [openPopup])

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [])


  return (
    <>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Título</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <TextControlled
              name={"dsc_cti"}
              placeholder={'por ejemplo, "Señor", "Doctor", "Profesor", ...'}
              control={control}
              rules={required}
              errors={errors}
              editConfig={{ frmState: frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Abreviatura</label>
        </div>
        <div className="o_cell" >
          <div className="o_field">
            <TextControlled
              name={"abr_cti"}
              placeholder={''}
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
