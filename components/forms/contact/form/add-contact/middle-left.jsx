import AutocompleteControlled from "@/components/tools/inputs/autocomplete_controlled";
import { InputWithLabel } from "@/components/ui";
import useAppStore from "@/store/zustand";
import { useState } from "react";


export function AddressFormMiddleLeft({ setValues, watch, control, errors, editConfig, frmState }) {  
  const createOptions = useAppStore((state) => state.createOptions);
    const [Ctis, setCtis] = useState([]);
    const cargaData_Ctis = async () => {
    setCtis(await createOptions("fnc_cia_ct_cti", "dsc_cti", "id_cti"));
    };
    return (

      <>
        <InputWithLabel control={control} editConfig={{ frmState, config: editConfig }} errors={errors} label={"Nombre del contacto"} name={"contact"} placeholder={"Por ejemplo, UPS Express"}/>
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
        <InputWithLabel control={control} editConfig={{ frmState, config: editConfig }} errors={errors} label={"Puesto de trabajo"} name={"job"} placeholder={"por ejemplo, director de ventas"}/>        
      </>
    );
  }