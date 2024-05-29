import useAppStore from '@/store/zustand'
import './grid_kanban.css'
import { useEffect } from 'react'
import Kanban_box from '../tools/grids/kanban_box'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import pathNavigator from '../tools/navs/path_navigator'

const Grid_kanban = ({ data, config }) => {
    const route = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const setFrmItemSelected = useAppStore(state => state.setFrmItemSelected)
    const appRoutes = useAppStore(state => state.appRoutes)
    const setAppRoutes = useAppStore(state => state.setAppRoutes)
    const setFrmState = useAppStore(state => state.setFrmState)
    const itemsPerPage = useAppStore(state => state.itemsPerPage)
    const setFrmLoading = useAppStore(state => state.setFrmLoading)
    const setFrmList = useAppStore(state => state.setFrmList)
    const setFrmListIndex = useAppStore(state => state.setFrmListIndex)
    const kanbanDataFiltered = useAppStore(state => state.kanbanDataFiltered)
    const setKanbanDataFiltered = useAppStore(state => state.setKanbanDataFiltered)
    const kanbanCurrentPage = useAppStore(state => state.kanbanCurrentPage)
    const setKanbanCurrentPage = useAppStore(state => state.setKanbanCurrentPage)
    const globalFilter = useAppStore(state => state.globalFilter)
    const kanbanCurrentData = useAppStore(state => state.kanbanCurrentData)
    const setKanbanCurrentData = useAppStore(state => state.setKanbanCurrentData)
    const fnc_name= config.fnc_name
    const idRow= config.grid.idRow
    const idRow_db= config.grid.idRow_db
    const configk = config.grid.kanban

    const viewItem = async(item,i) => {
        setAppRoutes([])
        let nruta = {
            number:i,
            name: config.title,
            path: searchParams.toString()
        }
        setAppRoutes([nruta])
        setFrmList(kanbanDataFiltered)
        let index= kanbanDataFiltered.findIndex((x)=>x[idRow]===item[idRow])
        setFrmListIndex(index)
        await setFrmItemSelected({fnc_name,idName:idRow_db,value: item[idRow]})
        // setFrmState('v')
        pathNavigator(pathname,route, searchParams, {
            prev_view: 'kanban',
            view_type: 'form',
            id: item?.[configk.box.id]
        })
    }

    const getFilteredList = () => {
        if (!globalFilter || globalFilter.length < 1) {
            return data;
        }
        let list = [...data];
        let result = list.filter((item) => (
            item?.[configk.box.title]?.toLowerCase().includes(globalFilter.toLowerCase()) ||
            item?.[configk.box.subtitle]?.toLowerCase().includes(globalFilter.toLowerCase())
        ));
        var hash = {};
        return result.filter((item) => {var exists= !hash[item[configk.box.id]]; hash[item[configk.box.id]] = true; return exists;});
    }

    const updateCurrentList=()=>{
        setKanbanDataFiltered(getFilteredList())
        setKanbanCurrentData(getFilteredList().slice(
            (kanbanCurrentPage - 1) * itemsPerPage,
            (kanbanCurrentPage - 1) * itemsPerPage + itemsPerPage
        ))
    }

    useEffect(()=>{
        updateCurrentList()
    },[data])

    useEffect(()=>{
        updateCurrentList()
        setFrmLoading(false)
    },[kanbanCurrentPage])

    useEffect(()=>{
        updateCurrentList()
        setKanbanCurrentPage(1)
        
      },[globalFilter])

    return (<>
        {/* <div className="panel-kanban" > */}
            {/* <div className='subpanel-kanban'> */}
                {
                    kanbanCurrentData.length > 0 &&
                    kanbanCurrentData.map((item, index) => (<>
                        {/* <div key={index} className='kanban-card'> */}
                            <Kanban_box box={configk.box} item={item} index={index} fnc={viewItem}/>
                        {/* </div> */}
                    </>)
                    )
                }
                <div className="o_kanban_record o_kanban_ghost flex-grow-1 flex-md-shrink-1 flex-shrink-0 my-0"></div>
                <div className="o_kanban_record o_kanban_ghost flex-grow-1 flex-md-shrink-1 flex-shrink-0 my-0"></div>
                <div className="o_kanban_record o_kanban_ghost flex-grow-1 flex-md-shrink-1 flex-shrink-0 my-0"></div>
                <div className="o_kanban_record o_kanban_ghost flex-grow-1 flex-md-shrink-1 flex-shrink-0 my-0"></div>
                <div className="o_kanban_record o_kanban_ghost flex-grow-1 flex-md-shrink-1 flex-shrink-0 my-0"></div>
                {/* <div style={{ minWidth: 0, maxWidth: 0 }} /> */}
            {/* </div> */}
        {/* </div> */}
    </>)
}

export default Grid_kanban