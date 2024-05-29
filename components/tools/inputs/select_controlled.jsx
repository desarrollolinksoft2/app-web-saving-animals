import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import ValidaEstado from "../functions/valida-estado";
import validaInput from "../functions/valida-input";

const SelectControlled = ({
  name,
  control,
  rules = {},
  errors,
  options,
  className = "",
  firstSelectedDefault = true,
  editConfig = { frmState: null, config: {} },
}) => {
  const { frmState, config } = editConfig;
  // const { readOnly, hidden } = ValidaEstado(frmState, config)
  let editView = validaInput(name, config, frmState);

  return (
    <>
      <Controller
        name={name}
        control={control}
        // onLoad
        rules={rules}
        render={({ field }) => {
          if (!editView) {
            let optlabel = options.find(
              (item) => item.value === field.value
            )?.label;
            return (
              <>
                <div className={className}>
                  {optlabel ? (
                    optlabel
                  ) : (
                    <span className="text-transparent">-</span>
                  )}
                </div>
              </>
            );
          }
          return (
            <>
              <FormControl
                className={`InputEx Select2Ex w-full ${className}`}
                variant="standard"
                error={errors[name] ? true : false}
              >
                <Select
                  {...field}
                  // defaultValue={firstSelectedDefault ? options[0].value : ''}
                  displayEmpty
                  inputProps={{
                    "aria-label": "Without label",
                  }}
                >
                  {options.map((option, index) => {
                    return (
                      <MenuItem key={index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>{errors[name]?.message}</FormHelperText>
              </FormControl>
            </>
          );
        }}
      />
    </>
  );
};

export default SelectControlled;
