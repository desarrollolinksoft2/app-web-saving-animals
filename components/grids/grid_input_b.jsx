'use client'
import React, { CSSProperties, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import MenuItem from '@mui/material/MenuItem';
import { TextField } from "@mui/material";
import { LuSettings2 } from "react-icons/lu";
import { GrTrash } from "react-icons/gr";

import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { makeData, Person } from './make_data'

// needed for table body level scope DnD setup
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  // type DragEndEvent,
  // type UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

// needed for row & cell level scope DnD setup
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DataExample, Productos } from './data_grid_example'
import NavMenuList from '../tools/navs/nav_menu_list'
import { GiSettingsKnobs } from 'react-icons/gi'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { GrDrag } from "react-icons/gr";
import AutocompleteControlled from '../tools/inputs/autocomplete_controlled';
import InputTextTable from '../tools/inputs/input_text_table';
import AutocompleteTable from '../tools/inputs/autocomplete_table';

// Cell Component
const RowDragHandleCell = ({ rowId }) => {
  // console.log(rowId)
  const { attributes, listeners } = useSortable({
    id: rowId,
  })
  return (
    // Alternatively, you could set these attributes on the rows themselves
    <button type='button' className='cursor-grab' {...attributes} {...listeners}>
      <GrDrag style={{ fontSize: "17px" }} />
    </button>
  )
}

// Row Component
const DraggableRow = ({ row, index }) => {
  // console.log(row)
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    // id: row.original.userId,
    id: row.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
    height: '44px',
  }

  let cols = row.getVisibleCells()
  let lastCol = cols[cols.length - 1]
  let dscIndex = cols.findIndex(cell => cell.column.id === 'etiqueta')
  let dscCol = cols[dscIndex]
  // console.log(dscCol)

  return (
    // connect row ref to dnd-kit, apply important styles
    <tr ref={setNodeRef} style={style} className={`group list-tr border-gray-300 focus:bg-gray-50 hover:bg-gray-200  ${index % 2 === 0 ? " bg-white" : " bg-gray-50"}`} >
      {
        row.original.tlin === 'S' || row.original.tlin === 'N' ?
          (<>
            <td key={cols[0].id} style={{ width: cols[0].column.getSize() }} >{flexRender(cols[0].column.columnDef.cell, cols[0].getContext())}</td>
            {dscCol &&
              <td colSpan={cols.length - 2} key={dscCol.id} className={`text-left ${row.original.tlin === 'S' ? `o_section` : `o_note`}`}>{flexRender(dscCol.column.columnDef.cell, dscCol.getContext())}</td>
            }

            <td key={lastCol.id} style={{ width: lastCol.column.getSize() }}  >{flexRender(lastCol.column.columnDef.cell, lastCol.getContext())}</td>
          </>) :
          row.getVisibleCells().map(cell => {
            //console.log(cell.column.columnDef.align)  //className={`${cell.column.id==='settings'? ' right-sticky ': ''} ${index % 2 === 0 ? " bg-white" : " bg-gray-50"}` }  || className={`right-sticky ${index % 2 === 0 ? " bg-white" : " bg-gray-50"}` }
            return (
              <td key={cell.id} style={{ width: cell.column.getSize(), textAlign: cell.column.columnDef.align }} >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            )
          })}
    </tr>
  )
}

const defaultColumn = {
  cell: ({ getValue, row, column, table }) => {
    const initialValue = getValue()
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(row.index, row.id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    // console.log(column.id)
    if (column.id === 'etiqueta' && (row.original.tlin !== 'S' && row.original.tlin !== 'N')) {
      return (
        <TextField
          value={value}
          onChange={e => setValue(e.target.value)}

          onBlur={onBlur}
          className='w-full InputEx'
        />
      )
    }

    return (
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
        className=''
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          // padding: '0 10px',
          // boxSizing: 'border-box'
        }
        }
      />
    )

  }
}

// Table Component
function GridInputTs({ config, data, setData }) {

  const [columnResizeMode, setColumnResizeMode] = useState("onChange");
  const [columnResizeDirection, setColumnResizeDirection] = useState("ltr");
  const [editCell, setEditCell] = useState(null)
  const [sorting, setSorting] = useState([])
  const [deleteItem, setDeleteItem] = useState(null)
  const idRow = config.grid.idRow

  const handleDelete = (row) => {
    // console.log(table.getRowModel().rows)
    // let nlista= [...data]

    let newData = data.filter(item => item[idRow] !== row.id)
    setData(newData)
  }

  const addRow = (tipo) => {

    const maxValue = Math.max(...data.map(x => parseInt(x[idRow])));
    let newRow = {
      [idRow]: maxValue + 1,
      tlin: tipo,
      id_pdt: null,
      etiqueta: '',
      cantidad: 1,
      precio: 0,
    }
    setData([...data, newRow])
  }



  const columns = React.useMemo(
    () => [
      // Create a dedicated drag handle column. Alternatively, you could just set up dnd events on the rows themselves.
      {
        id: 'drag-handle',
        header: ' ',
        cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
        size: 33,
        enableSorting: false
      },
      // ...configColumns,
      ...config.grid.columns,
      //header: ocultar filas - cell: Eliminar
      {
        id: 'settings',
        header: ({ table }) => {
          return (<>
            {/* <NavMenuList menu={''} icon={<GiSettingsKnobs />}> */}
            <NavMenuList menu={''} icon={<LuSettings2 />}>
              {
                table.getAllLeafColumns().map((column, i) => {
                  //columnas que no se pueden ocultar
                  if (column.id === 'drag-handle' || column.id === 'settings') return null

                  return (<MenuItem key={i}>
                    <div className="group p-1 gap-3">
                      <label className="flex g ml-2 font-medium cursor-pointer gap-3 ">
                        <input className={`m-1 group-hover:bg-sgreen-400 group-hover:text-sgreen-200 cursor-pointer accent-sgreen-400 ${column.getIsVisible()
                          ? ` text-sgreen-400` : ` bg-gray-100`}`} {...{ type: 'checkbox', checked: column.getIsVisible(), onChange: column.getToggleVisibilityHandler(), }} />
                        {column.columnDef.header}
                      </label>
                    </div>
                  </MenuItem>)
                })
              }
            </NavMenuList>
          </>)
        },
        cell: ({ row }) => (<button type='button' onClick={() => setDeleteItem(row)}><GrTrash style={{ fontSize: "15px" }} /></button>),
        size: 33,
        maxSize: 33,
        enableSorting: false
      }

    ],
    []
  )
  // const [data, setData] = React.useState(() => makeData(20))


  const dataIds = React.useMemo(
    // () => data?.map(({ userId }) => userId),
    () => data?.map((item) => item[idRow]),
    [data]
  )

  // console.log(dataIds)

  // const rerender = () => setData(DataExample)
  // const rerender = () => setData(() => makeData(20))

  const table = useReactTable({
    data,
    columns: columns,
    // defaultColumn,
    columnResizeMode,
    columnResizeDirection,
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getRowId: row => row[idRow], //required because row indexes will change
    state: {
      sorting
    },
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData(old => old.map((row, index) => {
          if (index === rowIndex) {
            return { ...old[rowIndex], [columnId]: value }
          }
          return row
        }))
      }
    }
    // getRowId: row => row.userId,
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,
  })

  // reorder rows after drag & drop
  function handleDragEnd(event) {

    const { active, over } = event
    // console.log(active, over)
    if (active && over && active.id !== over.id) {
      // console.log(event)
      setData(data => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex) //this is just a splice util
      })
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  useEffect(() => {
    if (deleteItem) {
      handleDelete(deleteItem)
      setDeleteItem(null)
    }
  }, [deleteItem])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    // NOTE: This provider creates div elements, so don't nest inside of <table> elements
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="overflow-x-auto scroll-smooth o_list_renderer o_renderer table-responsive">
        {/* <div className="h-4" /> */}
        {/* <div className="flex flex-wrap gap-2">
          <button onClick={() => rerender()} className="border p-1">
            Regenerate
          </button>
        </div> */}
        {/* <div className="h-4" /> */}
        <table className='list_table'>
          <thead className=''>
            {table.getHeaderGroups()?.map(headerGroup => (
              <tr key={headerGroup.id} className='list-th-tr' style={{ height: '42px' }}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan} style={{ width: header.getSize() }}
                    className={`relative items-center ${header.id === 'select' && " left-sticky justify-center "}
                    ${header.id === 'settings' && ' right-sticky  bg-white'} 
                    p-2 cursor-pointer ${header.column.getIsSorted() && "bg-gray-200 "} `}>
                    {header.isPlaceholder
                      ? null
                      : (
                        <div className='w-full box-border flex'>
                          <div className='flex items-center w-full' onClick={header.column.getToggleSortingHandler()}>
                            <span style={{ flexGrow: 1, textAlign: header.column.columnDef.align }} className='list-th-span'>
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </span>
                            {header.column.getIsSorted() && (
                              <span className="box-border">
                                {header.column.getIsSorted() === "asc" && (
                                  <FaChevronUp />
                                )}
                                {header.column.getIsSorted() === "desc" && (
                                  <FaChevronDown />
                                )}
                              </span>
                            )}
                          </div>
                          {(header.column.id !== "select" && header.column.id !== 'settings') && (
                            <div
                              {...{
                                onDoubleClick: () => header.column.resetSize(), onMouseDown: header.getResizeHandler(),
                                onTouchStart: header.getResizeHandler(),
                                className: `box-border active:bg-primary resizer ${table.options.columnResizeDirection} 
                                                                                      ${header.column.getIsResizing() ? "isResizing" : " "}`,
                                style: {
                                  transform:
                                    columnResizeMode === "onEnd" && header.column.getIsResizing()
                                      ? `translateX(${(table.options.columnResizeDirection === "rtl"
                                        ? -1 : 1) * (table.getState().columnSizingInfo.deltaOffset ?? 0)
                                      }px)` : "",
                                },
                              }}
                            ></div>
                          )}
                        </div>
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            <SortableContext
              items={dataIds}
              strategy={verticalListSortingStrategy}
            >
              {table.getRowModel().rows.map((row, i) => (
                <DraggableRow key={row.id} row={row} index={i} />
              ))}
            </SortableContext>
            <tr style={{ height: '42px' }} className='group list-tr options border-gray-300 hover:bg-gray-200'>
              <td></td>
              <td colSpan={table.getRowModel().rows[0].getVisibleCells().length - 1} className='w-full'>
                {/* <div className='flex gap-4 items-center'> */}
                <div className='flex gap-4'>
                  <a href="#" onClick={() => addRow('P')} role="button">Agregar línea</a>
                  <a href="#" onClick={() => addRow('S')} role="button">Agregar sección</a>
                  <a href="#" onClick={() => addRow('N')} role="button">Agregar nota</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </DndContext>
  )
}

export default GridInputTs
