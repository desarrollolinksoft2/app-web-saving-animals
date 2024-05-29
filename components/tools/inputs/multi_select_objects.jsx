'use client'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Controller } from "react-hook-form";
import { useState } from 'react';
import { CircularProgress, Paper } from '@mui/material';
import ValidaEstado from '../functions/valida-estado';
import validaInput from '../functions/valida-input';

const MultiSelectObject = ({ name, control, options, errors, rules={}, renderTags=null, fnc_loadOptions, placeholder='', className,
handleOnChanged=null,fnc_create, createOpt=false, editOpt=false, searchOpt=false, limit=10, editConfig={frmState:null, config:{}}}) => {
  const { frmState, config } = editConfig
  // const { readOnly, hidden } = ValidaEstado(frmState, config)
  let editView = validaInput(name, config, frmState)
  const [loading, setLoading] = useState(false)

  const viewTags =(values )=>{
    if(renderTags){
      return renderTags(values, ()=>{})
    }else{
      field.value.map((item, index) => {
        return (
          <Chip
            key={index}
            label={item.label}
            size="small"
            className="text-gray-700"
          />
        )
      })
    }
  }

  const createrExpress = async (data) => {
    // console.log(data)
    await fnc_create(data)
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
    if (searchOpt ) {
      options.push(search)
    }
    return options
  }

    return (<>
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => {
              if(!editView){
                return (<>
                <div className={className}>
                  {field?.value?.length > 0 ? (
                    viewTags(field.value)
                  ) : <span className="text-transparent">-</span>}
                </div>
                </>)
              }

                return (<>
                    <Autocomplete
                      PaperComponent={(props) => (
                        <Paper
                          sx={{
                            fontSize: "14px !important",
                            // textTransform: "capitalize !important",
                          }}
                          {...props}
                        />
                      )}
                      {...field}
                      multiple
                      filterSelectedOptions
                      options={options}
                      size="small"
                      onChange={async (event, data) => {
                        // event.preventDefault()
                        // setLoading(true)
                        // if comentado rolando
                        let ndata = data[data.length - 1]
                        // console.log(ndata)
                        if (handleOnChanged !== null) {
                          handleOnChanged(data)
                        }
                        if (typeof ndata?.value === 'string') {
      
                          // setTimeout(() => {
                          // setOpen(true);
                          //  let ndata=await
                          // onChange(null)
      
                          const newValue = ndata?.value.split('-')
                          // console.log('newValue',newValue)
                          // console.log(newValue.length )
                          // onChange(null);
                          if (newValue.length === 1) {
                            
                            setLoading(true)
                            await createrExpress(data)

                            setLoading(false)
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
                          setLoading(false)
                        }
                      }}
                      value={field.value || []}
                      // onChange={
                      //   (event, newValue) => {
                      //     field.onChange(newValue)
                      //   }
                      // }
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option.value} >
                            <span className={typeof option.value === 'string' && 'text-teal-700 '}>
                              {option.label}
                            </span>
                          </li>
                        )
      
                      }}
                      onOpen={async () => {
                        setLoading(true)
                        await fnc_loadOptions()
                        setLoading(false)
                      }}
                      renderTags={(value, getTagProps) =>
                        {
                          if(renderTags){
                            return renderTags(value, getTagProps)
                          }else{
                            return value.map((option, index) => (

                              // value.map((option, index) => (
                                <Chip
                                  // variant="outlined"
                                  className='text-gray-100'
                                  label={option.label}
                                  size="small"
                                  {...getTagProps({ index })}
                                  
                                />
                              // ))
                            ))
                          }
                        
                        }
                      }
                      getOptionLabel={(option) => option.label}
                      getOptionKey={(option) => option.value}
                      className={className ? className : "InputEx AutocompleteChip2Ex w-full"}
                      isOptionEqualToValue={(option, value) => option.value === value.value}
                      filterOptions={(options, params) => {
                        const { inputValue } = params
                        const filteredOptions = options?.filter((option) => {
                          // const isExisting = options.some((option) => inputValue === option.label);
      
                          if (option?.label ) {
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
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={placeholder}
                          variant="standard"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          // readOnly={readOnly}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (<>
                              {loading ? <CircularProgress color="inherit" size={16} /> : null}
                              {params.InputProps.endAdornment}
                            </>)
                          }}
                          error={errors[name] ? true : false}
                        />
                      )}
                    />

                </>)
            }}
        />
    </>)
}

export default MultiSelectObject;


// import { Controller } from "react-hook-form";

// const MultiSelectObject = ({ name, control, errors, rules={}}) => {
//     const options = [
//         {value: 1, label: 'Option 1'},
//         {value: 2, label: 'Option 2'},
//         {value: 3, label: 'Option 3'},
//         {value: 4, label: 'Option 4'},
//     ]


//     return (<>
//         <Controller
//             name={name}
//             control={control}
//             rules={rules}
//             render={({ field }) => {
//                 return (<>
//                     <FormControl
//                         className="InputEx o_form_label"
//                         variant="standard"
//                         fullWidth
//                     >
//                         <Select
//                             labelId="multi-select-label"
//                             id="multi-select"
//                             multiple
//                             value={selectedValues}
//                             onChange={handleChange}
//                             open={open}
//                             onOpen={handleOpen}
//                             onClose={handleClose}
//                             renderValue={(selected) => (
//                                 <div>
//                                     {selected.map((value) => {
//                                         let option = options.find((option) => option.value === value)
//                                         return <Chip key={option.value} label={option.label} onDelete={handleDelete(option)} onMouseDown={(event) => event.stopPropagation()} />
                                    
//                                     })}
//                                 </div>
//                             )}
//                         >
//                             {filteredOptions.map((option) => (
//                                 <MenuItem key={option} value={option}>
//                                     {option}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                 </>)
//             }}

//         />
//     </>)
// }