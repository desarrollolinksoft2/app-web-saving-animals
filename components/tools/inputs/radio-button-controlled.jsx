
import useAppStore from "@/store/zustand"
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material"
import { Controller } from "react-hook-form"
import validaInput from "../functions/valida-input"

const RadioButtonControlled = ({ name, control, rules, options, size = 'small', row = true,
    editConfig = { frmState: null, config: {} } }) => {

    const { frmState, config } = editConfig
    let editView = validaInput(name, config, frmState)

    return (<>
        <FormControl>
            <Controller
                name={name}
                control={control}
                defaultValue={options[0].value}
                rules={rules}
                render={({ field }) => {
                    let opt = options.find(opt => opt.value === field.value)
                    if(!editView){
                        return (<>
                        <div className="">
                            {opt? <Typography fontSize={"14.4px"}>{opt.label}</Typography>:(
                                <span className="text-transparent">-</span>
                            )}
                        </div>
                        </>)
                    }
                    return (
                        <RadioGroup {...field}
                            row={row} >
                            {options.map((option, index) => {
                                // console.log(option)
                                return (<FormControlLabel
                                    key={index}
                                    value={option.value}
                                    control={<Radio size={size} />}
                                    label={<Typography fontSize={"14.4px"}>{option.label}</Typography>}
                                />)
                            })}
                        </RadioGroup>
                    )
                }}
            ></Controller>
        </FormControl>
    </>)
}

export default RadioButtonControlled