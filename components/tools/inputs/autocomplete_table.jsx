'use client'
import { Autocomplete, CircularProgress, Dialog, DialogTitle, IconButton, Paper, TextField, Tooltip, createFilterOptions, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { TbArrowNarrowRight } from "react-icons/tb";

const AutocompleteTable = ({ row, column, fnc_options, limit = 10, onChange, fnc_enlace = null }) => {
    const comboRef = useRef(null)
    const inputRef = useRef(null)
    const divRef = useRef(null)
    const [isEditing, setIsEditing] = useState(null)
    const [currentValue, setCurrentValue] = useState(row.original[column.id] || null)
    const [currentLabel, setCurrentLabel] = useState('')
    const [options, setOptions] = useState([])
    const align= column.columnDef.align

    const handleBlur = (e) => {
        // console.log(e)
        setIsEditing(null)
        // onChange(row.index, column.id, currentValue)

    }

    const executeEnlace = (value) => {
        // console.log('iniciar enlace interno')
        if (fnc_enlace !== null) {
            fnc_enlace(value)
        }
    }

    const cargaOptions = async () => {
        const opts = await fnc_options()
        // console.log(opts)
        setOptions(opts)
    }

    const handleOnChange = (e, data) => {
        // console.log(value)

        setCurrentValue(data.value)
        onChange({rowId:row.index,columnId: column.id,option: data})
    }

    const handleClick = () => {
        setIsEditing({ rowId: row.id, columnId: column.id })
    }

    const updateCurrentLabel = () => {
        setCurrentLabel(options?.find(item => item.value === currentValue)?.label || currentValue)
    }

    // useEffect(() => {
    //     // console.log('options', options)
    // }, [options])

    useEffect(() => {
        updateCurrentLabel()
    }, [currentValue])

    useEffect(() => {
        if (isEditing && isEditing.rowId === row.id && isEditing.columnId === column.id) {
            // comboRef.current.focus()
            inputRef.current.focus()
        }
    }, [isEditing])

    useEffect(() => {

        cargaOptions()
    }, [])

    useEffect(() => {
        if (options.length > 0) {
            updateCurrentLabel()
        }
    }, [options])

    if (isEditing && isEditing.rowId === row.id && isEditing.columnId === column.id) {
        return (<>
            <div ref={divRef} onBlur={handleBlur} className="w-full flex items-center group">
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
                    ref={comboRef}
                    // onBlur={handleBlur}
                    options={options}
                    defaultValue={null}
                    isOptionEqualToValue={(option, value) =>
                        option.value == value.value
                    }
                    onChange={(e, data) => {
                        handleOnChange(e, data)
                    }}
                    value={
                        options?.find(
                            (option) => option?.value === row.original[column.id]
                        ) || null
                    }
                    getOptionLabel={(option) => {
                        if (typeof option.value === 'string') {
                            return ''
                        } else {
                            return option?.label
                        }
                    }
                    }
                    renderOption={(props, option) => {
                        return (
                            <li {...props} key={option.value} >
                                <span style={{ textAlign: 'right' }} className={typeof option.value === 'string' && 'text-teal-700 '}>
                                    {option.label}
                                </span>
                            </li>
                        )

                    }}
                    className="w-full autocompleteEx_table"
                    onInputChange={(_, value, reason) => {
                        if (reason === 'reset') return '';
                    }}
                    filterOptions=
                    {(options, params) => {
                        const { inputValue } = params
                        const filteredOptions = options?.filter((option) => {
                            // const isExisting = options.some((option) => inputValue === option.label);

                            if (option?.label) {
                                return (
                                    option?.label
                                        .toLowerCase()
                                        .includes(params.inputValue.toLowerCase())
                                )
                            }
                        }
                        );
                        let filterResult = filteredOptions.slice(0, limit)
                        ////agrega opciones de crear
                        // filterResult.push(...extraOptions(inputValue))
                        // }
                        return filterResult
                    }}
                    renderInput={(params) => (<>
                        <div className="flex items-center">
                            <TextField
                                {...params}
                                // onBlur={handleBlur}
                                ref={inputRef}
                                // placeholder={placeholder}
                                // style={{ textAlign: 'right' }}
                                variant="standard"
                                className="w-full"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    ...params.inputProps,
                                    style: { textAlign: align },
                                }}
                            // InputProps={{
                            //     ...params.InputProps,
                            //     endAdornment: (<>
                            //         {loading ? <CircularProgress color="inherit" size={16} /> : null}
                            //         {params.InputProps.endAdornment}
                            //     </>)
                            // }}
                            // error={errors[name] ? true : false}
                            />
                            {(currentValue && fnc_enlace !== null) && (<>
                                {/* <Tooltip title='Enlace interno' placement="botton"> */}
                                <div className="cursor-pointer ml-1" onClick={() => executeEnlace(currentValue)}>
                                    <TbArrowNarrowRight className="w-6 h-6 text-gray-500  hover:text-teal-600" />
                                </div>
                                {/* </Tooltip> */}
                            </>)}
                        </div>
                    </>)}

                />

            </div>
        </>)
    } else {
        return (
            <div style={{textAlign: align}} className={`input-text-table ${currentLabel ? ' text-teal-600' : ''}`} onClick={handleClick}>
                {currentLabel ? 
                (<a href="#" onClick={()=>executeEnlace(currentValue)}>{currentLabel}</a>)
                : <span className="text-transparent">-</span>}
            </div>
        )
    }
}

export default AutocompleteTable