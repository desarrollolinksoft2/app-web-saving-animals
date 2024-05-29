'use client'
import './grid_list.css'
import useAppStore from "@/store/zustand"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import updateColSize from "../functions/update_col_size"
import gridListColumns from '../tools/grids/grid_list_columns'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Tooltip } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import pathNavigator from '../tools/navs/path_navigator'

const Grid_list = ({ data = [], config, hasScroll, refcont, width, table, setTable }) => {
    const route = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const appRoutes = useAppStore(state => state.appRoutes)
    const setAppRoutes = useAppStore(state => state.setAppRoutes)
    // const table = useAppStore(state => state.table)
    // const setTable = useAppStore(state => state.setTable)
    const setFrmLoading = useAppStore(state => state.setFrmLoading)
    const globalFilter = useAppStore(state => state.globalFilter)
    const setGlobalFilter = useAppStore(state => state.setGlobalFilter)
    const listCurrentPage = useAppStore(state => state.listCurrentPage)
    const setListCurrentPage = useAppStore(state => state.setListCurrentPage)
    const itemsPerPage = useAppStore(state => state.itemsPerPage)
    const rowSelection = useAppStore(state => state.rowSelection)
    const setRowSelection = useAppStore(state => state.setRowSelection)
    const setFrmItemSelected = useAppStore(state => state.setFrmItemSelected)
    const setFrmState = useAppStore(state => state.setFrmState)
    const setFrmList = useAppStore(state => state.setFrmList)
    const setFrmListIndex = useAppStore(state => state.setFrmListIndex)
    const [sorting, setSorting] = useState([])
    const [columnResizeMode, setColumnResizeMode] = useState("onChange");
    const [columnResizeDirection, setColumnResizeDirection] = useState("ltr");
    const [restWidth, setRestWidth] = useState(0);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [widthTable, setWidthTable] = useState(0);
    const [widthScroll, setWidthScroll] = useState(0);
    const [tableIsReady, setTableIsReady] = useState(false);
    const idRow = config.grid.idRow
    const idRow_db = config.grid.idRow_db
    const fnc_name = config.fnc_name
    const col_name = config.grid.col_name

    const [columns, setColumns] =
        useState(gridListColumns(updateColSize(config.grid.list.columns,
             "accessorKey", col_name, width - widthScroll),
            col_name));

    const handleWidthScroll = () => {
        if (hasScroll) {
            setWidthScroll(17)
        } else {
            setWidthScroll(0)
        }
    }


    setTable(
        useReactTable({
            data,
            columns,
            columnResizeMode,
            columnResizeDirection,
            enableRowSelection: true,
            enableColumnResizing: true,
            enableMultiRowSelection: true,
            onRowSelectionChange: setRowSelection,
            onGlobalFilterChange: setGlobalFilter,
            onColumnVisibilityChange: setColumnVisibility,
            onSortingChange: setSorting,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            getRowId: (row) => row[idRow],
            state: {
                rowSelection: rowSelection,
                sorting,
                columnVisibility,
                globalFilter
            }
        })
    )

    const iniTable = async () => {
        // handleWidthScroll();
        if (table) {
            setTableIsReady(true)
            table.setPageSize(itemsPerPage)

            restResizingChange(table.getCenterTotalSize(), width - widthScroll);
        }
        setFrmLoading(false)
    }


    const restResizingChange = (tableWidth, screenWidth) => {
        let rest = screenWidth - tableWidth;
        if (rest < 0) rest = 0;
        setRestWidth(rest);
        if (Object.keys(table).length > 0) {
            setColumns(updateColSize(columns, "accessorKey", col_name, screenWidth));
        }
    };



    const viewItem = async(item, i) => {
        
        // console.log(item)
        // console.log(i)
        setAppRoutes([])
        // alert('enviando...')
        let nruta = {
            number:i,
            name: config.title,
            path: searchParams.toString()
        }
        setAppRoutes([nruta])
        // setAppRoutes([{
        //     name: config.title,
        //     route: searchParams.toString()
        // }])
        await setFrmItemSelected({fnc_name,idName: idRow_db,value: item[idRow]})
        let dataList = table ? table.getFilteredRowModel().rows.map((row) => row.original) : data
        setFrmList(dataList)
        let index = dataList.findIndex((row) => row[idRow] === item[idRow])
        setFrmListIndex(index)
        // console.log(table.rows)
        // setFrmList(table?.rows?.map((row) =>{
        //     console.log('se ejecuto el map')
        //     // table.prepareRow(row)
        //     return row.original
        // } ))
        // setFrmState('v')
        pathNavigator(pathname, route, searchParams, {
            prev_view: 'list',
            view_type: 'form',
            id: item?.[idRow]
        })
    }

    ///Redimensionar col_name cuando se cambian las columnas visibles
    useEffect(() => {
        if (table) {
            restResizingChange(table.getCenterTotalSize(), width - widthScroll);
        }
        // setColumns(updateColSize(columns, "accessorKey", col_name, width));
        // }
    }, [columnVisibility]);

    useEffect(() => {
        if (table)
            restResizingChange(table.getCenterTotalSize(), width - widthScroll);
        // updatePage(listCurrentPage)
    }, [refcont?.current?.scrollHeight])

    useEffect(() => {
        if (table) {
            table.setPageIndex(0)
            setListCurrentPage(1)
        }
    }, [globalFilter])

    useEffect(() => {
        iniTable();
    }, [])

    useEffect(() => {
        iniTable()
    }, [searchParams])

    useEffect(() => {
        iniTable()
    }, [listCurrentPage])

    useEffect(() => {
        if (data.length > 0) {
            iniTable()
        }
    }, [data, table])

    useEffect(() => {
        handleWidthScroll();
        // console.log(hasScroll)
    }, [hasScroll])

    return (<>
        {/* <div ref={divRef} className="list_base" > */}
        {tableIsReady && (<>
            <table {...{ style: { width: table.getCenterTotalSize() }, }} className="list_table">
                <thead className='thead s-sticky'>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className='list-th-tr' style={{ height: '42px' }}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} style={header.id === col_name ? { width: header.getSize() + restWidth, flexGrow: 2 } : { width: header.getSize() }}
                                    className={`relative items-center ${header.id === 'select' && " bg-gray-50 left-sticky justify-center "}
                                        ${header.id === 'settings' && ' right-sticky bg-gray-50 '} ${header.id !== 'select' && ' justify-between '}
                                        p-2 cursor-pointer ${header.column.getIsSorted() && "bg-gray-200 "} `}
                                >
                                    {header.isPlaceholder ? null : (
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
                    {table.getRowModel().rows.map((row, i) => (
                        <tr key={row.id} className={`group list-tr ${rowSelection[row.original[idRow]] ?
                            " border-sgreen-500 bg-sgreen-100 hover:bg-sgreen-200 text-gray-900"
                            : ` border-gray-300 hover:bg-gray-200  ${i % 2 === 0 ? " bg-white" : " bg-gray-50"}`
                            }`} style={{ height: '44px' }}>
                            {row.getVisibleCells().map((cell) => {
                                return (
                                    <td key={cell.id} style={{ width: cell.column.getSize() + cell.column.id === col_name ? restWidth : 0 }}
                                        onClick={cell.column.id === "select" ? null : () => viewItem(row.original, i)}
                                        className={`${cell.column.id === "select" && ` left-sticky ${rowSelection[row.original[idRow]] ?
                                            "bg-sgreen-100 group-hover:bg-sgreen-200 text-gray-900" :
                                            `border-gray-300 group-hover:bg-gray-200 ${i % 2 === 0 ? " bg-white" : " bg-gray-50"}`}`}
                                         px-2 py-3 ${cell.column.id === col_name && " "} `}
                                    >
                                        <div className={`text-left ${cell.column.id === "select" && " text-hideable"}`}>
                                            {cell.column.id === col_name ? (
                                                <Tooltip arrow title={flexRender(cell.column.columnDef.cell, cell.getContext())}>
                                                    <div className="text-hideable" style={{textAlign:cell.column.columnDef.align }}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </div>
                                                </Tooltip>)
                                                : (<div className="text-hideable" style={{textAlign:cell.column.columnDef.align }}>
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
        </>)}
        {/* </div> */}
    </>)
}

export default Grid_list