import useAppStore from '@/store/zustand'
import './grid_kanban.css'
import { useEffect } from 'react'
import Kanban_box from '../tools/grids/kanban_box'

const Grid_kanban = ({ data, config }) => {
    const itemsPerPage = useAppStore(state => state.itemsPerPage)
    const kanbanCurrentPage = useAppStore(state => state.kanbanCurrentPage)
    const setKanbanCurrentPage = useAppStore(state => state.setKanbanCurrentPage)
    const globalFilter = useAppStore(state => state.globalFilter)
    const kanbanCurrentData = useAppStore(state => state.kanbanCurrentData)
    const setKanbanCurrentData = useAppStore(state => state.setKanbanCurrentData)

    const getFilteredList = () => {
        if (!globalFilter || globalFilter.length < 1) {
            return data;
        }
        let result = data.filter((item) => (
            item?.[config.box.title]?.toLowerCase().includes(globalFilter.toLowerCase()) ||
            item?.[config.box.subtitle]?.toLowerCase().includes(globalFilter.toLowerCase())
        ));
        var hash = {};
        return result.filter((item) => {var exists= !hash[item[config.box.id]]; hash[item[config.box.id]] = true; return exists;});
    }

    const updateCurrentList=()=>{
        setKanbanCurrentData(getFilteredList().slice(
            (kanbanCurrentPage - 1) * itemsPerPage,
            (kanbanCurrentPage - 1) * itemsPerPage + itemsPerPage
        ))
    }

    useEffect(()=>{
        updateCurrentList()
    },[])

    useEffect(()=>{
        updateCurrentList()
    },[kanbanCurrentPage])

    useEffect(()=>{
        updateCurrentList()
        setKanbanCurrentPage(1)
        
      },[globalFilter])

    return (<>
        {/* <div className="panel-kanban" > */}
            <div className='subpanel-kanban'>
                {
                    kanbanCurrentData.length > 0 &&
                    kanbanCurrentData.map((item, index) => (<>
                        <div key={index} className='kanban-card'>
                            <Kanban_box box={config.box} item={item} />
                        </div>
                    </>)
                    )
                }
                <div style={{ minWidth: 0, maxWidth: 0 }} />
                {/* <div style={{ minWidth: 0, maxWidth: 0 }} />  */}
                {/* <div style={{ minWidth: 0, maxWidth: 0 }} />
                <div style={{ minWidth: 0, maxWidth: 0 }} />
                <div style={{ minWidth: 0, maxWidth: 0 }} /> */}
            </div>
        {/* </div> */}
    </>)
}

export default Grid_kanban