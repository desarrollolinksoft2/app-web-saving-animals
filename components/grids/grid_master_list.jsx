'use client'

import React, { CSSProperties, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import MenuItem from '@mui/material/MenuItem';
import { Hidden, TextField } from "@mui/material";
import { LuSettings2 } from "react-icons/lu";
import { GrTrash } from "react-icons/gr";
import { Tooltip } from '@mui/material'
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";

import {
  flexRender,
  ExpandedState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"

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

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DataExample, Productos } from './data_grid_example'
import NavMenuList from '../tools/navs/nav_menu_list'
import { GiSettingsKnobs } from 'react-icons/gi'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { GrDrag } from "react-icons/gr";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import useAppStore from '@/store/zustand';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import IndeterminateCheckbox from '../tools/grids/indeterminate_checkbox';
import groupItems from '../tools/functions/group-items';
import pathNavigator from '../tools/navs/path_navigator';
import constructList from '../tools/functions/construct_list';
import { set } from 'react-hook-form';

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

const DraggableRow = ({ row, index, col_name, rowSelection, idRow, viewItem }) => {
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
  // console.log(row.getVisibleCells())


  return (
    // connect row ref to dnd-kit, apply important styles
    <tr ref={setNodeRef} style={style} className={`group list-tr border-gray-300 focus:bg-gray-50 hover:bg-gray-200  ${index % 2 === 0 ? " bg-white" : " bg-gray-50"}`} >
      {
        // row.getCanExpand() ? (<>
        //   <td className='font-bold'>{flexRender(row.getVisibleCells()[0].column.columnDef.cell, row.getVisibleCells()[0].getContext())}</td>
        //   <td colSpan={row.getVisibleCells().length - 1} className='font-bold'>{row.original.groupName} {` (${row.original.groupItems.length})`} </td>
        // </>) :
        row.getVisibleCells().map((cell, i) => {
          //console.log(cell.column.columnDef.align)  //className={`${cell.column.id==='settings'? ' right-sticky ': ''} ${index % 2 === 0 ? " bg-white" : " bg-gray-50"}` }  || className={`right-sticky ${index % 2 === 0 ? " bg-white" : " bg-gray-50"}` }
          return (
            row.original.groupName ? (<>
              {i === 0 && <td className='font-bold'>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>}
              {i === 1 && <td colSpan={row.getVisibleCells().length - 1} className='font-bold'>{row.original.groupName} {` (${row.original.groupItems.length})`} </td>}
            </>) :
              <td key={cell.id} style={{ width: cell.column.getSize() + cell.column.id === col_name ? restWidth : 0 }}
                onClick={cell.column.id === "select" ? null : () => viewItem(row.original, index)}
                className={`${cell.column.id === "select" && ` left-sticky ${rowSelection[row.original[idRow]] ?
                  "bg-sgreen-100 group-hover:bg-sgreen-200 text-gray-900" :
                  `border-gray-300 group-hover:bg-gray-200 ${index % 2 === 0 ? " bg-white" : " bg-gray-50"}`}`}
                                         px-2 py-3 ${cell.column.id === col_name && " "} `}
              >
                <div className={`text-left ${cell.column.id === "select" && " text-hideable"}`}>
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
  )
}


const GridMasterList = ({ data = [], setData, config, table, setTable}) => {
  // const gridData = useAppStore(state => state.gridData)
  // const setGridData = useAppStore(state => state.setGridData)
  const route = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const setFrmLoading = useAppStore(state => state.setFrmLoading)
  const globalFilter = useAppStore(state => state.globalFilter)
  const setGlobalFilter = useAppStore(state => state.setGlobalFilter)
  const listCurrentPage = useAppStore(state => state.listCurrentPage)
  const setListCurrentPage = useAppStore(state => state.setListCurrentPage)
  const setAppRoutes = useAppStore(state => state.setAppRoutes)
  const itemsPerPage = useAppStore(state => state.itemsPerPage)
  const rowSelection = useAppStore(state => state.rowSelection)
  const setRowSelection = useAppStore(state => state.setRowSelection)
  const setFrmList = useAppStore(state => state.setFrmList)
  const setFrmListIndex = useAppStore(state => state.setFrmListIndex)
  const setFrmItemSelected = useAppStore(state => state.setFrmItemSelected)
  const listGroupBy = useAppStore(state => state.listGroupBy)
  const setListGroupBy = useAppStore(state => state.setListGroupBy)
  const tableData = useAppStore(state => state.tableData)
  const setTableData = useAppStore(state => state.setTableData)
  const groupedList = useAppStore(state => state.groupedList)
  const setGroupedList = useAppStore(state => state.setGroupedList)
  const idRow = config.grid.idRow
  const idRow_db = config.grid.idRow_db
  const fnc_name = config.fnc_name
  const col_name = config.grid.col_name
  const isDragable = config.grid.isDragable || false
  const [expandedRows, setExpandedRows] = useState([])
  const [paginateSubRows, setPaginateSubRows] = useState([])
  const [expanded, setExpanded] = useState({})
  const [expandedPage, setExpandedPage] = useState(0);
  const [isGrouped, setIsGrouped] = useState(false)
  // const [listData, setListData] = useState([...data])
  const [columnVisibility, setColumnVisibility] = useState({ 'drag-handle': (!isGrouped && isDragable) ? true : false});
  const [columnResizeMode, setColumnResizeMode] = useState("onChange");
  const [columnResizeDirection, setColumnResizeDirection] = useState("ltr");
  const [dataIds, setDataIds] = useState([]);
  const [editCell, setEditCell] = useState(null)
  const [sorting, setSorting] = useState([])
  const [deleteItem, setDeleteItem] = useState(null)
  const [tableIsReady, setTableIsReady] = useState(false)
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: itemsPerPage})
  
  // const [tableData, setTableData] = useState([])
  // const [groupedList, setGroupedList] = useState([])
  

  const viewItem = async (item, i) => {
    setAppRoutes([])
    let nruta = {
      number: i,
      name: config.title,
      path: searchParams.toString()
    }
    setAppRoutes([nruta])
    await setFrmItemSelected({ fnc_name, idName: idRow_db, value: item[idRow] })
    let dataList = table ? table.getFilteredRowModel().rows.map((row) => row.original) : data
    setFrmList(dataList)
    let index = dataList.findIndex((row) => row[idRow] === item[idRow])
    setFrmListIndex(index)
    pathNavigator(pathname, route, searchParams, {
      prev_view: 'list',
      view_type: 'form',
      id: item?.[idRow]
    })
  }

  

  // console.log(tableData)
  //definición de columnas
  const columns = React.useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => {
          return (<>
            <div className="w-full flex justify-center">
              <IndeterminateCheckbox
                {...{
                  className: "accent-sgreen-400 ",
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler()//getToggleAllPageRowsSelectedHandler()//getToggleAllRowsSelectedHandler(),
                }}
              />
            </div>

          </>)
        },
        cell: ({ row }) => (
          <div className="px-1 flex justify-center" >

            {row.getCanExpand() ? <button
              {...{onClick: row.getToggleExpandedHandler(),}}>
              {row.getIsExpanded() ? <IoMdArrowDropdown style={{ width: '14px' }} /> : <IoMdArrowDropright style={{ width: '14px' }} />}
            </button> : (<IndeterminateCheckbox
              {...{
                className: "accent-sgreen-400 ",
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />)}
          </div>

        ),
        enableSorting: false,
        size: 40,
        maxSize: 40,
      },
      // Create a dedicated drag handle column. Alternatively, you could just set up dnd events on the rows themselves.
      {
        id: 'drag-handle',
        header: ' ',
        cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
        size: 33,
        enableSorting: false
      },
      // ...configColumns,
      ...config.grid.list.columns,
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
                  if (column.id === "select" || column.id === col_name || column.id === 'settings' || column.id === 'drag-handle')
                    return null;

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
        }
        ,
        // cell: ({ row }) => (<button type='button' onClick={() => setDeleteItem(row)}><GrTrash style={{ fontSize: "15px" }} /></button>),
        size: 33,
        maxSize: 33,
        enableSorting: false
      }

    ],
    [isGrouped]
  )
/*
  const paginarLista = (list, rowsperpage) => {
    var tmpList = JSON.parse(JSON.stringify(list));
    if (listGroupBy.length > 0 && listGroupBy[1]) {
      tmpList.forEach((item, i) => {
        tmpList[i].groupItems = constructList(tmpList[i].groupItems, rowsperpage)
        tmpList[i].pages = Math.ceil(tmpList[i].groupItems.length / rowsperpage)
      })
    }
    tmpList = constructList(tmpList.slice(), rowsperpage)
    return tmpList
  }
*/
  const paginarLista = (list, rowsperpage) => {
    var tmpList = JSON.parse(JSON.stringify(list));
  
    const constructListRecursively = (list) => {
      list.forEach((item, i) => {
        let isLastGroup = item.groupItems[0]?.groupItems ? false : true;
        if (item.groupItems) {
          item.groupItems = constructList(item.groupItems, rowsperpage);
          item.pages = Math.ceil((isLastGroup ? item.totalItems : item.groupItems.length) / rowsperpage);
          constructListRecursively(item.groupItems);
        }
      });
      return constructList(list, rowsperpage);
    };
  
    tmpList = constructListRecursively(tmpList);
  
    return tmpList;
  };



  /*
    const groupData = (array, listGroup, rowsperpage) => {
      if (listGroup.length > 0 && !isGrouped) {
        
        const category = listGroup[0]
        var ndata = groupItems(array, category, rowsperpage)
  
        var tmpdata = [...ndata]
        if (listGroup[1]) {
  
          tmpdata.forEach((item, i) => {
            let list = groupItems(item.groupItems, listGroup[1], rowsperpage, 1)
  
            tmpdata[i].groupItems = list
  
          })
  
        }
        console.log(tmpdata)
        setTableData(tmpdata.slice())
  
        setIsGrouped(true)
      }
    }
    */

  const groupData = (array, listGroup, rowsperpage, index = 0) => {

    // const category = listGroup[index]
    // var ndata = groupItems(JSON.parse(JSON.stringify(array)), category, rowsperpage)
    if (index >= listGroup.length) {
      return array;
    }
  
    // Procesa el elemento actual de listGroup
    const category = listGroup[index];
    var ndata = groupItems(array, category, rowsperpage, index===0? 0 : index + 1);
  
    var tmpdata = [...ndata];
    tmpdata.forEach((item, i) => {
      if (item.groupItems && index + 1 < listGroup.length) {
        let list = groupData(item.groupItems, listGroup, rowsperpage, index + 1);
        tmpdata[i].groupItems = list;
      }
    });
    return tmpdata;

  }

  // const dataIds = data?.map((item) => item?.[idRow])



  setTable(
    useReactTable({
      data: isGrouped ? groupedList : data,
      columns,
      columnResizeMode,
      columnResizeDirection,
      enableRowSelection: true,
      enableColumnResizing: true,
      enableMultiRowSelection: true,
      paginateExpandedRows: false,
      onRowSelectionChange: setRowSelection,
      onGlobalFilterChange: setGlobalFilter,
      onColumnVisibilityChange: setColumnVisibility,
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      getRowId: (row) => row[idRow],
      state: {
        rowSelection: rowSelection,
        sorting,
        columnVisibility,
        expanded,
        globalFilter,
        pagination
      },
      onExpandedChange: setExpanded,
      getSubRows: row => row.groupItems
      //  meta: {
      //   updateData: (rowIndex, columnId, value) => {
      //     setData(old => old.map((row, index) => {
      //       if (index === rowIndex) {
      //         return { ...old[rowIndex], [columnId]: value }
      //       }
      //       return row
      //     }))
      //   }
      // }
    })
  )

  // const updateExpandedRows = () => {
  //   let newExpanded = table?.getRowModel().rows.filter(row => expanded[row.id])
  //   console.log(newExpanded)
  //   setExpandedRows(newExpanded)
  //   let newPaginateSubRows = newExpanded.slice(expandedPage * itemsPerPage, (expandedPage + 1) * itemsPerPage)
  //   console.log(newPaginateSubRows)
  //   setPaginateSubRows(newPaginateSubRows)
  // }


  // const expandedRows = table?.rows.filter(row => expanded[row.id]);
  // console.log(expandedRows)
  // const paginatedRows = expandedRows?.slice(expandedPage * itemsPerPage, (expandedPage + 1) * itemsPerPage);

const updateExpandedRows = (row, action) => {
  const level = row.original.level
    let tmpList = JSON.parse(JSON.stringify(groupedList))
    let originalList = JSON.parse(JSON.stringify(tableData))
    let indices = row.id.split('.').map(Number)
    // console.log(indices)
    let filaAgrupadora = tmpList[indices[0]]
    let filaAgrupadoraOriginal = originalList[indices[0]]

    for (let i = 1; i < indices.length; i++) {
      const indiceGrupo = indices[i];
      filaAgrupadora = filaAgrupadora.groupItems[indiceGrupo];
      filaAgrupadoraOriginal = filaAgrupadoraOriginal.groupItems[indiceGrupo];
    }
  

    
    if(action === 'prev'){
      // decrece currentPage en uno, pero no menos de 1
      console.log('prev')
      filaAgrupadora.currentPage = filaAgrupadora.currentPage <=1 ? filaAgrupadora.pages : filaAgrupadora.currentPage -1
    }

    if(action === 'next'){
      // Incrementa currentPage en uno, pero no más allá del número total de páginas
      console.log('next')
      filaAgrupadora.currentPage = filaAgrupadora.currentPage >= filaAgrupadora.pages ? 1 : filaAgrupadora.currentPage + 1
    }
    
    //actualizamos la lista completa a paginar porque la lista de referencia solo tiene los elementos de la página actual
    filaAgrupadora.groupItems = filaAgrupadoraOriginal.groupItems

    
    console.log(filaAgrupadora.currentPage)
    // Actualiza la fila en tmpList
    let updatedList = originalList;
    let currentLevel = updatedList[indices[0]];
    for (let i = 1; i < indices.length; i++) {
      const indiceGrupo = indices[i];
      if (i === indices.length - 1) {
        currentLevel.groupItems[indiceGrupo] = filaAgrupadora;
      } else {
        currentLevel = currentLevel.groupItems[indiceGrupo];
      }
    }
    // console.log(updatedList)
    setTableData([...updatedList])
}

  const handleBackSubRows = (row) => {
    // console.log(row.original)
    const level = row.original.level
    if(level > 0){
    updateExpandedRows(row, 'prev')
    }else{
      let tmpList = JSON.parse(JSON.stringify(tableData))
      // console.log(row.id)
      let mindex = tmpList.findIndex((item) => item.groupName === row.original.groupName)
      // console.log(tmpList)
      tmpList[mindex].currentPage = tmpList[mindex].currentPage <= 1 ? tmpList[mindex].pages : tmpList[mindex].currentPage - 1
      // console.log(tmpList[mindex].currentPage)
      setTableData([...tmpList])
    }
    /*
    let tmpList = JSON.parse(JSON.stringify(tableData))
    var level = row.original.level
    if (level > 0) {
      var index = tmpList[row.parentId].groupItems.findIndex((item) => item.groupName === row.original.groupName)
      tmpList[row.parentId].groupItems[index].currentPage = tmpList[row.parentId].groupItems[index].currentPage <= 1 ? tmpList[row.parentId].groupItems[index].pages : tmpList[row.parentId].groupItems[index].currentPage - 1
      setTableData([...tmpList])
      return
    }
    let mindex = tmpList.findIndex((item) => item.groupName === row.original.groupName)
    tmpList[index].currentPage = tmpList[mindex].currentPage <= 1 ? tmpList[mindex].pages : tmpList[index].currentPage - 1
    setTableData([...tmpList])
    */
  }

  const handleNextSubRows = (row) => {
    const level = row.original.level
    if(level > 0){
    updateExpandedRows(row, 'next')   
    }else{
      let tmpList = JSON.parse(JSON.stringify(tableData))
      // console.log(row.id)
      let mindex = tmpList.findIndex((item) => item.groupName === row.original.groupName)
      // console.log(tmpList)
      tmpList[mindex].currentPage = tmpList[mindex].currentPage >= tmpList[mindex].pages ? 1 : tmpList[mindex].currentPage + 1
      // console.log(tmpList[mindex].currentPage)
      setTableData([...tmpList])
    }
    /*
    const level = row.original.level
    let tmpList = JSON.parse(JSON.stringify(groupedList))
    let originalList = JSON.parse(JSON.stringify(tableData))
    let indices = row.id.split('.').map(Number)
    // console.log(indices)
    let filaAgrupadora = tmpList[indices[0]]
    let filaAgrupadoraOriginal = originalList[indices[0]]

    for (let i = 1; i < indices.length; i++) {
      const indiceGrupo = indices[i];
      filaAgrupadora = filaAgrupadora.groupItems[indiceGrupo];
      filaAgrupadoraOriginal = filaAgrupadoraOriginal.groupItems[indiceGrupo];
    }

    filaAgrupadora.currentPage = filaAgrupadora.currentPage >= filaAgrupadora.pages ? 1 : filaAgrupadora.currentPage + 1
    filaAgrupadora.groupItems = filaAgrupadoraOriginal.groupItems

    let updatedList = originalList;
    let currentLevel = updatedList[indices[0]];
    for (let i = 1; i < indices.length; i++) {
      const indiceGrupo = indices[i];
      if (i === indices.length - 1) {
        currentLevel.groupItems[indiceGrupo] = filaAgrupadora;
      } else {
        currentLevel = currentLevel.groupItems[indiceGrupo];
      }
    }

    setTableData([...updatedList])
    */

    /*
    if (level > 0) {
      var index = tmpList[row.parentId].groupItems.findIndex((item) => item.groupName === row.original.groupName)
      tmpList[row.parentId].groupItems[index].currentPage =
        tmpList[row.parentId].groupItems[index].currentPage >= tmpList[row.parentId].groupItems[index].pages ? 1 : tmpList[row.parentId].groupItems[index].currentPage + 1
      setTableData([...tmpList])
      return
    }
    var mindex = tmpList.findIndex((item) => item.groupName === row.original.groupName)
    tmpList[index].currentPage = tmpList[mindex].currentPage >= tmpList[mindex].pages ? 1 : tmpList[mindex].currentPage + 1

    setTableData([...tmpList])
    */
  }

  function handleDragEnd(event) {

    const { active, over } = event
    // console.log(active, over)
    if (active && over && active.id !== over.id) {
      // console.log(event)
      // setData(data => {
      const oldIndex = dataIds.indexOf(active.id)
      const newIndex = dataIds.indexOf(over.id)
      let nlist = arrayMove(data, oldIndex, newIndex) //this is just a splice util
      setData([...nlist])
      // })

    }
  }

  //espaciado para determinar el nivel de agrupación
  const multiDivs = (numberOfDivs) => {
    const divs = [];

    for (let i = 0; i < numberOfDivs; i++) {
      divs.push(<div key={i} style={{ width: '10px', display: 'inline-block' }}></div>);
    }

    return divs;
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const iniTable = () => {
    if (table && data.length > 0) {
      // console.log(data)
      setTableIsReady(true)
      // table.setPageSize(itemsPerPage)
      setDataIds(data.map((item) => item?.[idRow]))
      // setListData([...data])
      // console.log(table.getRowModel())
      // table.setPageSize(itemsPerPage)

    }
    setFrmLoading(false)
  }

  useEffect(() => {
    // console.log(tableData)
    if (table) {
      // table.setPageSize(itemsPerPage)
      let NewPaginedList = paginarLista(tableData, itemsPerPage)
      // console.log(NewPaginedList)
      setGroupedList(NewPaginedList)
    }

  }, [tableData])



  useEffect(() => {
    iniTable();
    if (table) {
      // console.log(data)
      if (listGroupBy.length > 0 ) {
        // envia a tableData la lista agrupada
        let list = groupData(data, listGroupBy, itemsPerPage)
        // console.log(list)
        setIsGrouped(true)
        setTableData(list)

      }else{
        setIsGrouped(false)
      }
    } //, 'dsc_pais'
  }, [data, listGroupBy])

  // useEffect(() => {
  //   updateExpandedRows()
  // }, [expanded])

  // useEffect(() => {
  //   iniTable()
  // }, [searchParams])

  // useEffect(() => {
  //   iniTable()
  // }, [listCurrentPage])
  //  console.log(paginateSubRows)
  return (<>
    {tableIsReady && (
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        {/* <div className="overflow-x-auto scroll-smooth o_list_renderer o_renderer table-responsive"> */}
        <table className='list_table'>
          <thead className='thead s-sticky'>
            {table.getHeaderGroups()?.map(headerGroup => (
              <tr key={headerGroup.id} className='list-th-tr' style={{ height: '42px' }}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan} style={{ width: header.getSize() }}
                    className={`relative items-center ${header.id === 'select' && " left-sticky justify-center "}
                    ${header.id === 'settings' && ' right-sticky  bg-gray-50'} 
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
              {

                <>

                  {table.getRowModel().rows.map((row, i) => (<>
                    {(isDragable && !isGrouped ) ? 
                    <DraggableRow key={row.id} row={row} index={i} col_name={col_name} rowSelection={rowSelection} idRow={idRow} viewItem={viewItem} />
                     :
                      (<>

                        <tr key={row.id} className={`group list-tr ${rowSelection[row.original[idRow]] ?
                          " border-sgreen-500 bg-sgreen-100 hover:bg-sgreen-200 text-gray-900"
                          : ` border-gray-300 hover:bg-gray-200  ${i % 2 === 0 ? " bg-white" : " bg-gray-50"}`
                          }`} style={{ height: '44px' }}>

                          {row.getCanExpand() ? (<>{row.getVisibleCells().map((cell, ind) => (<>
                            {/* {ind === 0 && <td className='font-bold'>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>} */}
                            {ind === 1 && <td colSpan={row.getVisibleCells().length} className='font-medium'>

                              <div className='w-full flex justify-between'>

                                <div className='ml-2 flex gap-2'>
                                  {
                                    multiDivs(row.original.level)
                                  }
                                  <button {...{ onClick: row.getToggleExpandedHandler(), }}>
                                    {row.getIsExpanded() ? <IoMdArrowDropdown style={{ width: '16px' }} /> : <IoMdArrowDropright style={{ width: '16px' }} />}
                                  </button>
                                  {row.original.groupName} {` (${row.original.totalItems})`} </div>
                                <div>{((row.original.totalItems > itemsPerPage) && row.getIsExpanded()) ?
                                  row.original.pages > 1 && <div className='flex items-center gap-2' >
                                    {`${row.original.first}-${row.original.last} / ${row.original.totalItems}  `}
                                    <span className='flex items-center gap-1'>
                                      <button onClick={() => handleBackSubRows(row)} className='border px-2 rounded-sm bg-gray-50'>
                                        <MdArrowBackIos />
                                      </button>
                                      <button onClick={() => handleNextSubRows(row)} className='border px-2  rounded-sm bg-gray-50'>
                                        <MdArrowForwardIos />
                                      </button>
                                    </span>
                                  </div>
                                  : ' '}</div>
                              </div></td>}
                          </>))}
                          </>) : row.getVisibleCells().map((cell, ind) => {
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

                      </>)}
                  </>))}
                </>}

            </SortableContext>
          </tbody>
        </table>
        {/* </div> */}

      </DndContext>)
    }
  </>)
}

export default GridMasterList;