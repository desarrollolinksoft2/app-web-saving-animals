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

  const switchHandler = (checked) => {
    let currentForm = { ...watch() };
    setValues("status", currentForm["status_switch"] === true ? "A" : "I");
  };

  return (
    <>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Nombre</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <TextControlled
              name={"nom_cin"}
              placeholder={'por ejemplo, "Agricultura", "Construcción", "Minería", ...'}
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
          <label className="o_form_label">Nombre completo</label>
        </div>
        <div className="o_cell" >
          <div className="o_field">
            <TextControlled
              name={"nomc_cin"}
              placeholder={''}
              control={control}
              errors={errors}
              editConfig={{ frmState: frmState, config: editConfig }}
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
            <SwitchControlled
              name={"status_switch"}
              onChange={switchHandler}
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
