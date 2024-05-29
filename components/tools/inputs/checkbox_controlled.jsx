import { FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import validaInput from "../functions/valida-input";

const CheckBoxControlled = ({
  dsc,
  name,
  control,
  rules,
  className = "",
  labelPlacement = "end",
  row = true,
  editConfig = { frmState: null, config: {} },
}) => {
  const { frmState, config } = editConfig;
  let editView = validaInput(name, config, frmState);
  return (
    <>
      <Controller
        name={name}
        control={control}
        // defaultValue={options[0].value}
        // defaultValue={false}
        rules={rules}
        render={({ field }) => {
          if (!editView) {
            return (
              <>
                <div className="">
                  {field.value ? (
                    dsc
                  ) : (
                    <span className="text-transparent">-</span>
                  )}
                </div>
              </>
            );
          }

          return (
            /*
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  disableRipple="false"
                  defaultValue={false}
                  value={field.value}
                  // key={index}
                  checked={field.value}
                />
              }
              label={dsc}
            />
            */

            <FormControlLabel
            
            className={"" + className}
              control={
                <input
                  {...field}
                  // disableRipple="false"
                  defaultValue={false}
                  value={field.value}
                  // key={index}
                  checked={field.value}
                  type="checkbox"
                  className="checkboxEx"
                  // className={"checkboxEx " + className}
                />
              }
              // labelPlacement="start"
              // labelPlacement="end"
              labelPlacement={labelPlacement}
              label={dsc}
            />
          );
        }}
      />
    </>
  );
};

export default CheckBoxControlled;
