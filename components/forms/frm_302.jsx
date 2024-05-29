"use client";
import { useEffect, useState } from "react";
import AutocompleteControlled from "../tools/inputs/autocomplete_controlled";
import TextControlled from "../tools/inputs/text_controlled";
import useAppStore from "@/store/zustand";
import { fncExecute } from "@/data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import pathNavigator from "../tools/navs/path_navigator";

const required = {
  required: { value: true, message: "Este campo es requerido" },
};

export function FrmTitle({ control, errors, frmState, editConfig }) {
  return (
    <>
      <TextControlled
        name={"dsc_cat"}
        className={"frm_dsc"}
        placeholder={"Por ejemplo, televisores"}
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
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createOptions = useAppStore((state) => state.createOptions);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const frmFncEnlaceInterno = useAppStore((state) => state.frmFncEnlaceInterno);
  const [Categorias, setCategorias] = useState([]);

  const cargaData = async () => {
    setCategorias(
      await createOptions("fnc_inv_ct_cat", "dsc_cat_full", "id_cat")
    );
  };

  const fnc_enlace = (value) => {
    frmFncEnlaceInterno({
      currentName: "dsc_cat", //watch('dsc_cat'),
      currentPath: searchParams.toString(),
      nItem: { id_cat: value },
      nItemSelected: { fnc_name: "fnc_inv_ct_cat", idName: "id_cat", value },
      fnc_next: () => {
        pathNavigator(pathname, route, searchParams, {
          view_type: "form",
          id: value,
          config: "302",
        });
      },
    });
  };

  useEffect(() => {
    if (frmItemSelected?.["id_cat_rel"]) {
      setCategorias([
        {
          label: frmItemSelected["dsc_cat_rel"],
          value: frmItemSelected["id_cat_rel"],
        },
      ]);
    }
  }, [frmItemSelected]);

  return (
    <>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Categoría padre</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <AutocompleteControlled
              name={"id_cat_rel"}
              placeholder={""}
              control={control}
              errors={errors}
              options={Categorias}
              fnc_loadOptions={cargaData}
              enlace={true}
              fnc_enlace={fnc_enlace}
              // dsc_value={watch('dsc_cat_rel')}
              // editConfig={{ frmState: frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
