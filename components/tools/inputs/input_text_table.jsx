'use client'

import { useEffect, useRef, useState } from "react"


import { TextField } from "@mui/material";

const InputTextTable = (props) => {
    const { row, column, onChange, type='text' } = props
    const inputRef = useRef(null)
    const [isEditing, setIsEditing] = useState(null)
    const align= column.columnDef.align

    const handleBlur= (e) => {
        // console.log(row.index)
        // console.log(column.id)
        // console.log(e.target.value)
        onChange({rowId: row.index, columnId: column.id,option: e.target.value})
        setIsEditing(null)
    }

    const handleKeyDown= (e) => {
        if(e.key === 'Enter'){
            // console.log(inputRef.current.value)
            onChange({rowId: row.index, columnId: column.id,option: inputRef.current.value})
            setIsEditing(null)
        }
    }

    const onClick=()=>{
        setIsEditing({ rowId: row.id, columnId: column.id })
        
    }

    useEffect(()=>{
        if(isEditing && isEditing.rowId === row.id && isEditing.columnId === column.id){
            inputRef.current.focus()
        }
    },[isEditing])
    //editCell && editCell.rowId == row.id && editCell.columnId == column.id

    return (
        (isEditing && isEditing.rowId === row.id && isEditing.columnId === column.id) ? (
            
            // <input 
            // type={type} 
            // className="w-full inputEx_table" 
            // ref={inputRef} 
            // onBlur={handleBlur} 
            // defaultValue={row.original[column.id]} 
            // />

            
            <TextField
            // {...field}
            // placeholder={placeholder}
            variant='standard'
            // inputRef={field.ref}
            // multiline={multiline}
            multiline
            // value={field.value ? field.value : ''}
            // inputProps={{ style }}
            // InputLabelProps={{ shrink: true }}
            // className={`${className ? className : 'InputEx w-full'}`}
            // error={errors[name] ? true : false}
            // helperText={errors[name] && errors[name]?.message}

            inputProps={{ style: { textAlign: align} }}
            type={type} 
            className="w-full inputEx_table" 
            inputRef={inputRef} 
            onBlur={handleBlur} 
            defaultValue={row.original[column.id]} 
            onKeyDown={handleKeyDown}
            />

        ) : (
            <div className="input-text-table" style={{textAlign: align}} onClick={onClick}>
                {row.original[column.id]}
            </div>
        ))
}

export default InputTextTable;