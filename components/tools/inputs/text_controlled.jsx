import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import ValidaEstado from "../functions/valida-estado";
import validaInput from "../functions/valida-input";

const TextControlled = ({
  name,
  placeholder = "",
  rules = {},
  errors,
  control,
  className = null,
  style = {},
  multiline = false,
  editConfig = { frmState: null, config: {} },
  shrink = true,

  handleOnChanged = null,
}) => {
  const { frmState, config } = editConfig;
  // const { readOnly, hidden } = ValidaEstado(frmState, config )
  let editView = validaInput(name, config, frmState);


  const handleBlur= (e) => {

    if (handleOnChanged !== null) {
      handleOnChanged(e.target.value);
    }
}


  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        if (!editView) {
          return (
            <div className={"DivEx " + className}>
              {field.value ? (
                field.value
              ) : (
                <span className="text-transparent">-</span>
              )}
            </div>
          );
        }

        return (
          <TextField
            {...field}
            placeholder={placeholder}
            variant="standard"
            inputRef={field.ref}
            multiline={multiline}
            value={field.value ? field.value : ""}
            inputProps={{ style }}
            //readOnly={readOnly}
            InputLabelProps={{ shrink }}
            // className={`${className ? className : "InputEx w-full"}`}
            className={"InputEx w-full " + className}
            error={errors[name] ? true : false}
            helperText={errors[name] && errors[name]?.message}

            // ------------------------------
            
            onBlur={handleBlur} 


            // -----------------------------------
          />
        );
      }}
    ></Controller>
  );
};

export default TextControlled;
