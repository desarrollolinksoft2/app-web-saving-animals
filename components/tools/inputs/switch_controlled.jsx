import { FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

import * as React from 'react';
import Switch from '@mui/material/Switch';

import validaInput from "../functions/valida-input";

// const label = { inputProps: { 'aria-label': 'Size switch demo' } };

const SwitchControlled = ({
//   dsc,
  name,
  control,
  rules,
  className = "",
  row = true,
  editConfig = { frmState: null, config: {} },
  onChange
}) => {
  const { frmState, config } = editConfig;
  let editView = validaInput(name, config, frmState);

  const switchHandler = (event, field) => {
    field.onChange(event.target.checked);
    // console.log(event.target.checked)
    if(onChange){
      onChange(event.target.checked)
    }
  };

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
                  {/* {field.value ? (
                    dsc
                  ) : (
                    <span className="text-transparent">-</span>
                  )} */}
                </div>
              </>
            );
          }

          return (

            // <FormControlLabel
            // className={"" + className}
            //   control={
                
                <Switch
                className="switchEx"
                // {...label}
                size="small" 

                {...field}
                // disableRipple="false"
                // defaultChecked={false}
                
                // value={field.value}
                onChange={(e)=>switchHandler(e, field)}
                // key={index}
                checked={field.value}

                // onClick={switchHandler}
                // onClick={() => switchHandler}
                />
            //   }
            // />
          );
        }}
      />
    </>
  );
};

export default SwitchControlled;
