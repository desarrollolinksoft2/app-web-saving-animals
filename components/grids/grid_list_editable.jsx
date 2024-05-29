'use client'

import useAppStore from "@/store/zustand"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import gridListColumns from "../tools/grids/grid_list_columns"
import updateColSize from "../functions/update_col_size"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"

const GridListEditable= ({config, data =[], refcont, width, hasScroll})=>{
    const route = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const appRoutes = useAppStore(state => state.appRoutes)
    // const setAppRoutes = useAppStore(state => state.setAppRoutes)
    // const setFrmLoading = useAppStore(state => state.setFrmLoading)
    const [globalFilter, setGlobalFilter] = useState('')
    const [listCurrentPage, setListCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(20)
    const [rowSelection, setRowSelection] = useState({})
    // const setFrmItemSelected = useAppStore(state => state.setFrmItemSelected)
    // const setFrmState = useAppStore(state => state.setFrmState)
    // const setFrmList = useAppStore(state => state.setFrmList)
    // const setFrmListIndex = useAppStore(state => state.setFrmListIndex)
    const [sorting, setSorting] = useState([])
    const [columnResizeMode, setColumnResizeMode] = useState("onChange");
    const [columnResizeDirection, setColumnResizeDirection] = useState("ltr");
    const [restWidth, setRestWidth] = useState(0);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [widthTable, setWidthTable] = useState(0);
    const [widthScroll, setWidthScroll] = useState(0);
    const idRow = config.grid.idRow
    const idRow_db = config.grid.idRow_db
    const fnc_name = config.fnc_name
    const col_name = config.grid.col_name

    // const [columns, setColumns] =
    //     useState(gridListColumns(updateColSize(config.grid.list.columns,
    //          "accessorKey", col_name, width - widthScroll),
    //         col_name));

    const handleWidthScroll = () => {
        if (hasScroll) {
            setWidthScroll(17)
        } else {
            setWidthScroll(0)
        }
    }



    const  table = useReactTable({
            data,
            columns: config.grid.list.columns,
            // columnResizeMode,
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
                // columnVisibility,
                // globalFilter
            }
        })
    
    

    const iniTable = async () => {
        // if(!table){
        // setTable(confTable())
        // }
        // handleWidthScroll();
        if (table) {
            setTableIsReady(true)
            table.setPageSize(itemsPerPage)

            restResizingChange(table.getCenterTotalSize(), width - widthScroll);
        }
        // setFrmLoading(false)
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
        /*
        setAppRoutes([])

        let nruta = {
            number:i,
            name: config.title,
            path: searchParams.toString()
        }
        setAppRoutes([nruta])

        await setFrmItemSelected({fnc_name,idName: idRow_db,value: item[idRow]})
        let dataList = table ? table.getFilteredRowModel().rows.map((row) => row.original) : data
        // setFrmList(dataList)
        let index = dataList.findIndex((row) => row[idRow] === item[idRow])
        // setFrmListIndex(index)

        setFrmState('v')
        pathNavigator(pathname, route, searchParams, {
            prev_view: 'list',
            view_type: 'form',
            id: item?.[idRow]
        })*/
    }

    ///Redimensionar col_name cuando se cambian las columnas visibles
    // useEffect(() => {
    //     if (table) {
    //         restResizingChange(table.getCenterTotalSize(), width - widthScroll);
    //     }
    // }, [columnVisibility]);

    // useEffect(() => {
    //     if (table)
    //         restResizingChange(table.getCenterTotalSize(), width - widthScroll);
   
    // }, [refcont?.current?.scrollHeight])

    // useEffect(() => {
    //     if (table) {
    //         table.setPageIndex(0)
    //         setListCurrentPage(1)
    //     }
    // }, [globalFilter])

    // useEffect(() => {
    //     iniTable();
    // }, [])


    // useEffect(() => {
    //     iniTable()
    // }, [listCurrentPage])

    // useEffect(() => {
    //     if (data.length > 0) {
    //         iniTable()
    //     }
    // }, [data])

    // useEffect(() => {
    //     handleWidthScroll();
    // }, [hasScroll])

    return (<>
         
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
                                                <span style={{ flexGrow: 1 }} className='list-th-span'>
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
                                    <td key={cell.id} style={{ width: cell.column.getSize() + cell.column.od === col_name ? restWidth : 0 }}
                                        onClick={cell.column.id === "select" ? null : () => viewItem(row.original, i)}
                                        className={`${cell.column.id === "select" && ` left-sticky ${rowSelection[row.original[idRow]] ?
                                            "bg-sgreen-100 group-hover:bg-sgreen-200 text-gray-900" :
                                            `border-gray-300 group-hover:bg-gray-200 ${i % 2 === 0 ? " bg-white" : " bg-gray-50"}`}`}
                                         px-2 py-3 ${cell.column.id === col_name && " "} `}
                                    >
                                        <div className={`text-left ${cell.column.id === "select" && " text-hideable"}`}>
                                            {cell.column.id === col_name ? (
                                                <Tooltip arrow title={flexRender(cell.column.columnDef.cell, cell.getContext())}>
                                                    <div className="text-hideable">
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </div>
                                                </Tooltip>)
                                                : (<div className="text-hideable">
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
        </>)
}

export default GridListEditable;