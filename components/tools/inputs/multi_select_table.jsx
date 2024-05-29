import { useEffect, useRef, useState } from "react"
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { CircularProgress, Paper } from '@mui/material';

const MultiSelecTable = ({ row, column, fnc_options, onChange, createOpt = false, editOpt = false, searchOpt = false, limit=10, renderTags=null }) => {
    const divRef = useRef(null)
    const inputRef = useRef(null)
    const [isEditing, setIsEditing] = useState(null)
    const [currentValue, setCurrentValue] = useState(row.original[column.id] || [])
    // const [currentLabel, setCurrentLabel] = useState('')
    const [options, setOptions] = useState([])
    const align = column.columnDef.align

    const handleBlur = (e) => {
        setIsEditing(null)
    }

    const cargaOptions = async () => {
        const opts = await fnc_options()
        setOptions(opts)
    }

    const handleOnChanged = (data) => {
        setCurrentValue(data)
        onChange({rowId:row.index,columnId: column.id,option: data})
    }

    const handleClick = () => {
        setIsEditing({ rowId: row.id, columnId: column.id })
    }

    const extraOptions = (inputValue) => {
        let options = []
        const create = {
            value: inputValue,
            label: `Crear "${inputValue}"`,
        }
        const createEdit = {
            value: `${inputValue}-create`,
            label: `Crear y Editar ...`,
        }
        const search = {
            value: `${inputValue}-search`,
            label: `Buscar más...`,
        }
        if (createOpt && inputValue.length > 0) {
            options.push(create)
        }

        if (editOpt && inputValue.length > 0) {
            options.push(createEdit)
        }
        if (searchOpt) {
            options.push(search)
        }
        return options
    }

    useEffect(() => {
        if (isEditing && isEditing.rowId === row.id && isEditing.columnId === column.id) {
            // comboRef.current.focus()
            inputRef.current.focus()
        }
    }, [isEditing])

    useEffect(()=>{
        console.log(currentValue)
    },[currentValue])

    return (isEditing && isEditing.rowId === row.id && isEditing.columnId === column.id) ? (
        <Autocomplete
            blurOnSelect={handleBlur}
            PaperComponent={(props) => (
                <Paper
                    sx={{
                        fontSize: "14px !important",
                    }}
                    {...props}
                />
            )}
            multiple
            filterSelectedOptions
            options={options}
            size="small"
            value={currentValue || []}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.value} >
                        <span className={typeof option.value === 'string' && 'text-teal-700 '}>
                            {option.label}
                        </span>
                    </li>
                )

            }}
            renderTags={(value, getTagProps) => {
                if (renderTags) {
                    return renderTags(value, getTagProps)
                } else {
                    return value.map((option, index) => (
                        <Chip
                            className='text-gray-100'
                            label={option.label}
                            size="small"
                            {...getTagProps({ index })}

                        />
                    ))
                }

            }
            }
            onOpen={async () => {
                await cargaOptions()
                }
            }
            getOptionLabel={(option) => option.label}
            getOptionKey={(option) => option.value}
            className="w-full autocompleteEx_table"
            isOptionEqualToValue={(option, value) => option.value === value.value}
            filterOptions={(options, params) => {
                const { inputValue } = params
                const filteredOptions = options?.filter((option) => {
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
                filterResult.push(...extraOptions(inputValue))
                // }
                return filterResult
            }}
            onChange={(event, data) => {
                let ndata = data[data.length - 1]
                        // console.log(ndata)
                        if (handleOnChanged !== null) {
                          handleOnChanged(data)
                        }
                        if (typeof ndata?.value === 'string') {
                          const newValue = ndata?.value.split('-')
                          if (newValue.length === 1) {
                            // await createrExpress(data)
                          }
      
                          if (ndata?.value.includes('-create')) {
                            // setOpen(true)
                            //create & edit
                          }
                          if (ndata?.value.includes('-search')) {
                            //search
                            // setOpenSearch(true)
                          }
                          
                        } else {
                          field.onChange( data || []);
                        }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    inputProps={{
                        ...params.inputProps,
                        style: { textAlign: align },
                    }}
                    onBlur={handleBlur}
                    inputRef={inputRef}
                    // InputProps={{
                    //     ...params.InputProps,
                    //     endAdornment: (<>
                    //         {loading ? <CircularProgress color="inherit" size={16} /> : null}
                    //         {params.InputProps.endAdornment}
                    //     </>)
                    // }}
                />
            )}
        />
    ) : (
        <div ref={divRef} onClick={handleClick} className="InputEx o_form_label">
            {currentValue?.length > 0 ? (
                <div className="flex flex-wrap">
                    {currentValue.map((item, index) => (
                        <Chip
                            key={index}
                            label={item.label}
                            size="small"
                            className="m-1"
                        />
                    ))}
                </div>)
                : (<span className="text-transparent">-</span>)
            }
        </div>
    )
}

export default MultiSelecTable