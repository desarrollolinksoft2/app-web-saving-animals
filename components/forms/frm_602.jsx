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
import useUserStore from "@/store/user_store";

const required = {
  required: { value: true, message: "Este campo es requerido" },
};

export function FrmTitle({ control, errors, editConfig, frmState }) {
  return (
    <>
      <TextControlled
        name={"dsc_cdp"}
        className={"frm_dsc"}
        placeholder={"por ejemplo, 30 días"}
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
}) {
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const executeFnc = useAppStore((state) => state.executeFnc);
  const setGridData = useAppStore((state) => state.setGridData);
  const frmState = useAppStore((state) => state.frmState);
  const createOptions = useAppStore((state) => state.createOptions);
  const userData = useUserStore((state) => state.userData);
  const appRoutes = useAppStore((state) => state.appRoutes);
  const setAppRoutes = useAppStore((state) => state.setAppRoutes);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const setFrmItemSelected = useAppStore((state) => state.setFrmItemSelected);
  const frmList = useAppStore((state) => state.frmList);
  const frmListIndex = useAppStore((state) => state.frmListIndex);
  const setFrmListIndex = useAppStore((state) => state.setFrmListIndex);
  const setFrmList = useAppStore((state) => state.setFrmList);
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

    // console.log(lcompanies)
    setCompanies(lcompanies);
  };

  const fnc_enlace = (value) => {
    frmFncEnlaceInterno({
      currentName: "dsc_cdp", //watch('dsc_cdp'),
      currentPath: searchParams.toString(),
      nItem: { id_con: value },
      nItemSelected: { fnc_name, idName: "con.id_con", value },
      fnc_next: () => {
        pathNavigator(pathname, route, searchParams, {
          view_type: "form",
          id: value,
        });
      },
    });
  };

  const fnc_create = async (value) => {
    // let nvalue = capitalizar(value)
    // if (nvalue) {
    let res = await executeFnc(fnc_name, "i", { dsc_con: value, tcon: "C" });

    if (res) {
      // setGridData(fnc_name)
      await cargaData();
      setValues("id_con_rel", res.id_con);
      // return res.id_con
    } else {
      toast.error("Error al crear la empresa");
    }
    // }
  };

  useEffect(() => {
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
  }, [frmItemSelected]);

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
          searchOpt={true}
          editOpt={true}
          // frmSearch={() => (<FrmSearch />)}
          fnc_loadOptions={cargaData}
          enlace={true}
          fnc_enlace={fnc_enlace}
          editConfig={{ frmState: frmState, config: editConfig }}
        />
      )}
    </>
  );
}

export function FrmMiddle({ setValues, watch, control, errors, editConfig }) {
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createOptions = useAppStore((state) => state.createOptions);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const frmFncEnlaceInterno = useAppStore((state) => state.frmFncEnlaceInterno);
  const frmState = useAppStore((state) => state.frmState);
  const [companies, setCompanies] = useState([]);

  const cargaData = async () => {
    // let filters = [{ filterBy: 'tcon', filterValue: 'C' }]
    // if (watch('id_con')) {
    //     filters.push({ filterBy: 'id_con', filterValue: watch('id_con'), exclude: true })
    // }
    // console.log(fnc_name)
    let lcompanies = await createOptions("fnc_cia_ct_cia", "dsc_cia", "id_cia");

    // console.log(lcompanies)
    setCompanies(lcompanies);
  };

  const fnc_enlace = (value) => {
    frmFncEnlaceInterno({
      currentName: "dsc_cdp", //watch('dsc_cdp'),
      currentPath: searchParams.toString(),
      nItem: { id_con: value },
      nItemSelected: {
        fnc_name: "fnc_cia_ct_con",
        idName: "con.id_con",
        value,
      },
      fnc_next: () => {
        pathNavigator(pathname, route, searchParams, {
          view_type: "form",
          id: value,
          config: "101",
        });
      },
    });
  };

  useEffect(() => {
    if (frmItemSelected?.["id_cia"]) {
      setCompanies([
        {
          label: frmItemSelected["dsc_cia"],
          value: frmItemSelected["id_cia"],
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
              placeholder={"Compañía"}
              control={control}
              errors={errors}
              options={companies}
              fnc_loadOptions={cargaData}
              enlace={true}
              fnc_enlace={fnc_enlace}
              editConfig={{ frmState: frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
