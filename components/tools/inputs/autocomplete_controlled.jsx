"use client";
import {
  Autocomplete,
  CircularProgress,
  Dialog,
  DialogTitle,
  IconButton,
  Paper,
  FormHelperText,
  TextField,
  Tooltip,
  createFilterOptions,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TbArrowNarrowRight } from "react-icons/tb";
import { HiArrowSmRight } from "react-icons/hi";
import { Controller } from "react-hook-form";
import ValidaEstado from "../functions/valida-estado";
import validaInput from "../functions/valida-input";
import { useSearchParams } from "next/navigation";

const AutocompleteControlled = ({
  name,
  control,
  errors,
  rules,
  options,
  fnc_loadOptions,
  limit = 5,
  className = null,
  placeholder,
  fnc_create,
  editConfig = { frmState: null, config: {} },
  handleOnChanged = null,
  createOpt = false,
  editOpt = null,
  searchOpt = false,
  frmSearch = null,
  frmCreate = null,
  enlace = false,
  fnc_enlace = null,
}) => {
  const { frmState, config } = editConfig;
  const searchParams = useSearchParams();
  // const { readOnly, hidden } = ValidaEstado(frmState, config )
  let editView = validaInput(name, config, frmState);
  // const theme = useTheme();
  // const fullscreen = useMediaQuery(theme.breakpoints.down("sm"));
  // const setFrmIsChanged = useAppStore(state => state.setFrmIsChanged)
  // const filter = createFilterOptions();
  const [open, setOpen] = useState(false);
  // const [openSearch, setOpenSearch] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [createdValue, setCreatedValue] = useState({ value: "", label: "" });
  const [openOptions, setOpenOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enlaceLoading, setEnlaceLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // const [recordOption, setRecordOption] = useState(null)

  // const cargaOption = (dcs, field)=>{
  //   if(dcs && field.value){
  //     return [
  //       {label: dcs, value: field.value}
  //     ]
  //   }else{
  //     return null;
  //   }
  // }

  const handleFocus = () => {
    setOpenOptions(true);
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleCreateAndEdit = async (nvalue) => {
    if (editOpt) {
      editOpt(nvalue)
    } else {
      console.log('fnc para editar no declarado')
    }
  }

  const handleSearchMore = (nvalue) => {
    if (searchOpt) {
      searchOpt(nvalue)
    } else {
      console.log('fnc para buscar no declarado')
    }
  }

  // const handleClose = () => {
  //   setOpen(false);
  //   setOpenSearch(false);
  //   setDialogData(null);
  // };

  const createrExpress = async (data) => {
    await fnc_create(data);
    // return {value, label: value}
  };

  const executeEnlace = (value) => {
    //ejecuta enlace solo si se ha declarado enlace=true
    if (enlace) {
      setEnlaceLoading(true);
      fnc_enlace(value, name);
    }
  };

  const extraOptions = (inputValue) => {
    let options = [];
    const create = {
      value: inputValue,
      label: `Crear "${inputValue}"`,
    };
    const createEdit = {
      value: `${inputValue}-create`,
      label: `Crear y Editar ...`,
    };
    const search = {
      value: `${inputValue}-search`,
      label: `Buscar más...`,
    };
    if (createOpt && inputValue.length > 0) {
      options.push(create);
    }

    if (editOpt && inputValue.length > 0) {
      options.push(createEdit);
    }
    if (searchOpt) {
      options.push(search);
    }
    return options;
  };

  useEffect(() => {
    if (searchParams.toString()) {
      setEnlaceLoading(false)
    }
  }, [searchParams.toString()])

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, field }) => {
          // if (name === "id_con_rel") {
          //   console.log(name);
          //   console.log(editView);
          // }
          if (!editView) {
            let recordOption = options?.find((item) => item.value === value);

            return (
              <>
                <div className={className}>
                  {recordOption ? (
                    <div
                      className="text-teal-600 cursor-pointer"
                      onClick={() => executeEnlace(value)}
                    >
                      {recordOption?.label || value}
                    </div>
                  ) : (
                    <span className="text-transparent">-</span>
                  )}
                </div>
              </>
            );
          }

          // var recordOption =cargaOption(dsc_value, field)
          // console.log('recordOption',recordOption)

          return (
            <>
              <div className="w-full flex items-center group">
                <Autocomplete
                  PaperComponent={(props) => (
                    <Paper
                      sx={{
                        fontSize: "14px !important",
                        textTransform: "none !important",
                      }}
                      {...props}
                    />
                  )}
                  {...field}
                  error={errors[name] ? true : false}
                  // freeSolo
                  // open={openOptions}
                  // loading={loading}
                  onOpen={async () => {
                    setIsFocused(true)
                    setLoading(true);
                    await fnc_loadOptions();
                    setLoading(false);
                  }}
                  onChange={async (event, data) => {
                    // event.preventDefault()
                    // setLoading(true)
                    // if comentado rolando
                    if (handleOnChanged !== null) {
                      handleOnChanged(data);
                    }
                    if (typeof data?.value === "string") {
                      // setTimeout(() => {
                      // setOpen(true);
                      //  let ndata=await
                      // onChange(null)

                      const newValue = data?.value.split("-");
                      // console.log('newValue',newValue)
                      // console.log(newValue.length )
                      // onChange(null);
                      if (newValue.length === 1) {
                        // console.log('call create')
                        setLoading(true);
                        await createrExpress(newValue[0]);
                        setLoading(false);
                      }

                      if (data?.value.includes("-create")) {
                        // setOpen(true);
                        //create & edit
                        handleCreateAndEdit(newValue[0]);

                      }
                      if (data?.value.includes("-search")) {
                        //search
                        // setOpenSearch(true);
                        handleSearchMore(newValue[0] || '');
                      }
                    } else {
                      onChange(data?.value || "");
                      setLoading(false);
                    }
                  }}
                  value={
                    options?.find((option) => option?.value === value) || null
                  }
                  className={
                    className ? className : "InputEx Autocomplete2Ex w-full"
                  }
                  includeInputInList
                  options={options || []}
                  isOptionEqualToValue={(option, value) =>
                    option.value == value.value
                  }
                  getOptionLabel={(option) => {
                    if (typeof option.value === "string") {
                      return "";
                    } else {
                      return option?.label;
                    }
                  }}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.value}>
                        <span
                          className={
                            typeof option.value === "string" && "text-teal-700 "
                          }
                        >
                          {option.label}
                        </span>
                      </li>
                    );
                  }}
                  onInputChange={(_, value, reason) => {
                    if (reason === "reset") return "";
                  }}
                  renderInput={(params) => (
                    <>
                      <TextField
                        {...params}
                        // readOnly={readOnly}
                        placeholder={placeholder}
                        variant="standard"
                        className="capitalize"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loading ? (
                                <CircularProgress color="inherit" size={16} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                      <FormHelperText className="text-red-600">
                        {errors[name]?.message}
                      </FormHelperText>
                    </>
                  )}
                  filterOptions={(options, params) => {
                    const { inputValue } = params;
                    const filteredOptions = options?.filter((option) => {
                      // const isExisting = options.some((option) => inputValue === option.label);

                      if (option?.label) {
                        return option?.label
                          .toLowerCase()
                          .includes(params.inputValue.toLowerCase());
                      }
                    });
                    let filterResult = filteredOptions.slice(0, limit);
                    ////agrega opciones de crear
                    filterResult.push(...extraOptions(inputValue));
                    // }
                    return filterResult;
                  }}
                />
                {value && enlace && (
                  <>
                    {enlaceLoading ? (
                      <CircularProgress color="inherit" size={16} />
                    ) : (
                      <Tooltip title="Enlace interno" placement="bottom">
                        <div
                          className={`o_icon_enl cursor-pointer ml-1`}	
                          onClick={() => executeEnlace(value)}
                        >
                          <TbArrowNarrowRight className={`group-hover:inline-block ${isFocused ? ' inline-block ': ' hidden '} o_icon_enl w-6 h-6 text-gray-500 hover:text-teal-600`} />
                        </div>
                      </Tooltip>
                    )}
                  </>
                )}
              </div>
            </>
          );
        }}
      />
      {/* <Dialog
        open={open}
        fullScreen={fullscreen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {frmCreate &&
          frmCreate({
            open,
            setOpen,
            setDialogData,
            createdValue,
            setCreatedValue,
          })}
      </Dialog>
      <Dialog
        open={openSearch}
        fullScreen={fullscreen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {frmSearch && frmSearch()}
      </Dialog> */}
    </>
  );
};

export default AutocompleteControlled;
