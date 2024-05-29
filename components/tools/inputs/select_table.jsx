'use client'
import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material"
import { useEffect, useRef, useState } from "react"

const SelectTable = ({row, column, fnc_options, onChange }) => {
    const inputRef = useRef(null)
    const [isEditing, setIsEditing] = useState(null)
    const [currentValue, setCurrentValue] = useState(row.original[column.id] || null)
    const [currentLabel, setCurrentLabel] = useState('')
    const [options, setOptions] = useState([])
    const align= column.columnDef.align
    const handleBlur = (e) => {
        setIsEditing(null)
    }

    const chargeOptions = async () => {
        const opts = await fnc_options()
        setOptions(opts)
    }

    const handleOnChange = (e) => {
        setCurrentValue(e.target.value)
        onChange({rowId:row.index,columnId: column.id,option: e.target.value})
    }

    const handleClick = () => {
        setIsEditing({ rowId: row.id, columnId: column.id })
    }

    const updateCurrentLabel = () => {
        setCurrentLabel(options?.find(item => item.value === currentValue)?.label || currentValue)
    }

    useEffect(() => {
        updateCurrentLabel()
    }, [currentValue])

    useEffect(()=>{
        if(isEditing && isEditing.rowId === row.id && isEditing.columnId === column.id){
            inputRef.current.focus()
        }
    },[isEditing])

    useEffect(()=>{
        chargeOptions()
    },[])

    return ((isEditing && isEditing.rowId === row.id && isEditing.columnId === column.id)?(
        <FormControl
            className="InputEx o_form_label"
            variant="standard"
            // sx={{ width: 150, maxWidth: 150 }}
            fullWidth
        >
            <Select
                displayEmpty
                inputRef={inputRef}
                inputProps={{
                    "aria-label": "Without label",
                }}
                value={currentValue || '' }
                onChange={handleOnChange}

            >
                {options.map((option, index) => {
                    return (
                        <MenuItem key={index} value={option.value}>
                            {option.label}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    ):(
        <div style={{textAlign: align}} className="input-text-table" onClick={handleClick}>
            {currentLabel? currentLabel : <span className="text-transparent">-</span>}
        </div>
    )

    
        

    )
}

export default SelectTable