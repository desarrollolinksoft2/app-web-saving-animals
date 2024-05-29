'use client'
import React, { CSSProperties, useEffect, useState } from 'react'
import {
    ColumnDef,
    Row,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,  
    useReactTable,
} from '@tanstack/react-table'
import NavMenuList from '../tools/navs/nav_menu_list';
import { IoSettingsSharp } from "react-icons/io5";
import { LuSettings2 } from 'react-icons/lu';
import MenuItem from '@mui/material/MenuItem';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Tooltip } from '@mui/material'
import { GrNext, GrPrevious } from 'react-icons/gr';
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { PiExportBold } from "react-icons/pi";
import * as XLSX from 'xlsx';

const GridSearch = ({ config, data, onSelect, itemsPerPage = 10, fnClose }) => {

    const [columnResizeMode, setColumnResizeMode] = useState("onChange");
    const [columnResizeDirection, setColumnResizeDirection] = useState("ltr");
    // const [editCell, setEditCell] = useState(null)
    const [sorting, setSorting] = useState([])
    const [restWidth, setRestWidth] = useState(0);
    const [listCurrentPage, setListCurrentPage] = useState(1)
    const [columnVisibility, setColumnVisibility] = useState({});
    const [totalItems, setTotalItems] = useState(data.length)
    const [firstIndex, setFirstIndex] = useState(1);
    const [lastIndex, setLastIndex] = useState(Math.min(itemsPerPage, data.length));


    const idRow = config.grid.idRow
    const col_name = config.grid.col_name

    const handleClick = (row) => {
        // console.log(row)
        onSelect(row)
        fnClose()
    }

    const downloadExcel = (data) => {
        // Convierte los datos a una hoja de cálculo
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Descarga el archivo
        XLSX.writeFile(workbook, 'DataSheet.xlsx');
    };

    const handleExport = () => {
        let dataToExport = []
        const visibleRows = table.getPrePaginationRowModel().rows;
        visibleRows.map((row) => {
            dataToExport.push(row.original)
        })

        // console.log(dataToExport)
        downloadExcel(dataToExport)
    }

    const updateCurrentPage = () => {
        // console.log(listCurrentPage)
        table.setPageIndex(listCurrentPage -1)
        setFirstIndex((listCurrentPage - 1) * itemsPerPage + 1)
        setLastIndex(Math.min(listCurrentPage * itemsPerPage, totalItems))
    }


    const handlePrev = () => {
        if (firstIndex === 1) {
            table.setPageIndex(table.getPageCount() - 1)
            setListCurrentPage(table.getPageCount())
            return;
        }
        table.previousPage()
        setListCurrentPage(listCurrentPage - 1)
    }

    

    const handleNext =  () => {
        // console.log(lastIndex)
        // console.log(totalItems)
        if (lastIndex >= totalItems) {
            table.setPageIndex(0)
            setListCurrentPage(table.getState().pagination.pageIndex )
            return;
        }
        table.nextPage()
        setListCurrentPage(listCurrentPage + 1)
    }

    useEffect(() => {
        updateCurrentPage()
    }, [listCurrentPage])

    useEffect(()=>{
        updateCurrentPage()
    },[totalItems])

    // const firstIndex = 1
    // const lastIndex = 10
    // const totalItems = 100

    const columns = [...config.grid.list.columns, {
        id: 'settings',
        header: ({ table }) => {
            return (<>
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
        cell: ({ row }) => (' '),
        enableSorting: false,
        size: 40,
        maxSize: 40,
    }]

    const table = useReactTable({
        data,
        columns,
        columnResizeMode,
        columnResizeDirection,
        enableColumnResizing: true,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getRowId: (row) => row[idRow],
        state: {
            sorting,
            columnVisibility
        }
    })

    return (<>
        <main className="modal-body p-0 max-w-full">
            <div className="o_list_view o_view_controller">
                <div className="o_control_panel d-flex flex-column gap-3 gap-lg-1 px-3 pt-2 pb-3">
                    {/* search & paginado */}
                    <div className='w-full flex flex-row'>
                        <div className='basis-1/3 justify-self-start'>
                            {/* <button onClick={handleExport}>
                                exportar
                            </button> */}
                            <div className='w-2'>
                                <NavMenuList icon={<IoSettingsSharp />}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                      }}
                                      transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                      }}
                                >
                                    <MenuItem onClick={handleExport}>
                                        <div className="group flex items-center p-1 gap-1">
                                            <PiExportBold />
                                            <span>Exportar todo</span>
                                        </div>

                                    </MenuItem>
                                </NavMenuList>
                            </div>
                        </div>
                        <div className='basis-1/3 self-center'>
                            <input type="text" className="w-full form-control" placeholder="Buscar..." />
                        </div>
                        <div className='basis-1/3 flex gap-2 items-center justify-end'>
                            <div className='flex'>
                                <div className="flex flex-col justify-center mr-3">

                                    <span className="text-sm">{firstIndex}-{lastIndex} / {totalItems}</span>
                                </div>

                                <ToggleButtonGroup aria-label="text formatting">
                                    <ToggleButton
                                        onClick={handlePrev}
                                        sx={{ height: "37px", width: "38px" }}
                                    >
                                        <GrPrevious />
                                    </ToggleButton>

                                    <ToggleButton
                                        onClick={handleNext}
                                        sx={{ height: "37px", width: "38px" }}
                                    >
                                        <GrNext />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                    </div>
                </div>
                <div sx={{ width: '100%' }} className="o_content ">
                    <div className="o_list_renderer o_renderer table-responsive" style={{ overflowX: 'auto' }}>
                        {/* text-xs o_list_table list-table table table-sm table-hover position-relative mb-0 o_list_table_ungrouped table-striped */}
                        <table {...{ style: { width: table.getCenterTotalSize() } }} className="list_table ">
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id} className='list-th-tr bg-gray-50' style={{ height: '42px' }} >

                                        {headerGroup.headers.map(header => (
                                            <th key={header.id} style={header.id === col_name ? { flexShrink: 1 } : { width: header.getSize() }} colSpan={header.colSpan} className={`relative items-center ${header.id === 'select' && " left-sticky justify-center "}
                                            ${header.id === 'settings' && ' right-sticky bg-gray-50'} 
                                            p-2 cursor-pointer ${header.column.getIsSorted() && "bg-gray-200 "} `}>
                                                {header.isPlaceholder ? null :
                                                    (  //contenido de encabezado con opciones de ordenamiento
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
                                                            {/* mostrar opciones de redimensionado */}
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
                                {table.getRowModel().rows.map((row, i) => (
                                    <tr key={row.id} style={{ height: '42px' }} className={`group list-tr border-gray-300 focus:bg-gray-50 hover:bg-gray-200  ${i % 2 === 0 ? " bg-white" : " bg-gray-50"}`}>
                                        {row.getVisibleCells().map(cell => {
                                            return (
                                                <td key={cell.id} style={{ width: cell.column.getSize() + cell.column.id === col_name ? restWidth : 0 }}
                                                    onClick={() => handleClick(row.original)} >
                                                    <div className='text-hideable'>
                                                        {cell.column.id === col_name ? (
                                                            <Tooltip arrow title={flexRender(cell.column.columnDef.cell, cell.getContext())}>
                                                                <div className="text-hideable" style={{ textAlign: cell.column.columnDef.align }}>
                                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                                </div>
                                                            </Tooltip>)
                                                            : (<div className="text-hideable" style={{ textAlign: cell.column.columnDef.align }}>
                                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                            </div>)}
                                                    </div>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>

    </>)
}

export default GridSearch