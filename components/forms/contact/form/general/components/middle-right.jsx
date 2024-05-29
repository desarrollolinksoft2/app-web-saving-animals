import { useEffect, useState } from "react";
import useAppStore from "@/store/zustand";
import Chip from "@mui/material/Chip";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { InputWithLabel } from "@/components/ui";
import { listTagColors } from "@/constants/const";

export function ModalContactMiddleRight({
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
          key={index}
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
                  key={index}
                  onClick={() => changeColorTag(color)}
                  className="cursor-pointer outlined w-4 h-4 m-1"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
        </BasePopup>

        <InputWithLabel control={control} editConfig={{ frmState, config: editConfig }} errors={errors} label={"Correo electronico"} name={"email"} placeholder={"example@gmail.com"}/>
        
        <InputWithLabel control={control} editConfig={{ frmState, config: editConfig }} errors={errors} label={"Teléfono"} name={"telephone"} />
        
        <InputWithLabel control={control} editConfig={{ frmState, config: editConfig }} errors={errors} label={"Celular"} name={"cellphone"} />

      </>
    );
  }