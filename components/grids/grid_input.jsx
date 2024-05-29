import {
    ColumnDef,
    Row,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState, CSSProperties } from 'react'
import { useMemo } from 'react'
// import './grid_input.css'

// Cell Component
const RowDragHandleCell = ({ rowId }) => {
    console.log(rowId)
    const { attributes, listeners } = useSortable({
        id: rowId,
    })
    return (
        // Alternatively, you could set these attributes on the rows themselves
        <button {...attributes} {...listeners}>
            🟰
        </button>
    )
}

// Row Component
const DraggableRow = ({ row }) => {
    // console.log(row)
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.id,
    })

    const style = {
        transform: CSS.Transform.toString(transform),  //let dnd-kit do its thing
        transition: transition,
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 1 : 0,
        position: 'relative',
    }

    // console.log(row.getVisibleCells())
    return (
        // connect row ref to dnd-kit, apply important styles
        <tr ref={setNodeRef} style={style}>
            {row.getVisibleCells().map(cell => (
                <td key={cell.id} style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            ))}
        </tr>
    )
}


const GridInput = ({ config }) => {
    const idRows = config.grid.idRows
    console.log(idRows)
    const [data, setData] = useState([
        {
            id_con: 22,
            dsc_con: 'Papas Doe',
            tag: 'etiqeuta',
            qty: 2,
            price: 25.00,
            impuesto: 0.00,
        },
        {
            id_con: 35,
            dsc_con: 'Mayonesa 100ml',
            tag: 'tqag',
            qty: 2,
            price: 1.00,
            impuesto: 0.00,
        },
        {
            id_con: 7,
            dsc_con: 'Arroz 1 kg',
            tag: 'bodega',
            qty: 1,
            price: 12.00,
            impuesto: 5.00,
        }
    ])
    const dataIds = useMemo(
        () => data?.map((item) => item[idRows]),
        [data]
    )
    const columns = [
        {
            id: 'drag-handle',
            header: ' ',
            cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
            size: 60,
        },
        ...config.grid.columns
    ]

    // const rerender = () => setData([...data])

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId: (row) => row[idRows], //required because row indexes will change
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    })

    // reorder rows after drag & drop
    function handleDragEnd(event) {
        console.log(event)
        const { active, over } = event
        if (active && over && active.id !== over.id) {
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

    // console.log(dataIds)
    return (<>
        <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <div className="p-2">
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        <SortableContext
                            items={data}
                            strategy={verticalListSortingStrategy}>
                            {table.getRowModel().rows.map(row => {
                                // console.log(row)
                                return (
                                    <DraggableRow key={row.id} row={row} />
                                )
                            })}
                        </SortableContext>
                    </tbody>
                </table>
            </div>
        </DndContext>
    </>)
}

export default GridInput