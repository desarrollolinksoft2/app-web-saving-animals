import useAppStore from "@/store/zustand"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useEffect, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr"

const Frm_web_pag_kanban = () => {
  const kanbanCurrentPage = useAppStore((state) => state.kanbanCurrentPage);
  const kanbanCurrentData = useAppStore((state) => state.kanbanCurrentData);
  const kanbanDataFiltered = useAppStore((state) => state.kanbanDataFiltered);
  const setKanbanCurrentPage = useAppStore((state) => state.setKanbanCurrentPage);
  const itemsPerPage = useAppStore((state) => state.itemsPerPage);
  const gridData = useAppStore((state) => state.gridData);
  const [firstIndex, setFirstIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(Math.min(itemsPerPage, gridData.length));   //rowsPerPage
  const [totalRows,setTotalRows] = useState(kanbanCurrentData.length);
  const [totalPages,setTotalPages] = useState(Math.ceil(totalRows /itemsPerPage ));
  // const totalPages = Math.ceil(totalRows /itemsPerPage );

  const handlePrev = () => {
    if(kanbanCurrentPage===1) {
      setKanbanCurrentPage(totalPages)
      return  
    }
    setKanbanCurrentPage(kanbanCurrentPage-1)
  }

  const handleNext = () => {
    if(kanbanCurrentPage===totalPages) {
      setKanbanCurrentPage(1)
      return
    }
    setKanbanCurrentPage(kanbanCurrentPage+1)
  }

  useEffect(()=>{
    setTotalPages(Math.ceil(totalRows /itemsPerPage ))
    setFirstIndex((kanbanCurrentPage - 1) * itemsPerPage + 1)
    setLastIndex(Math.min(kanbanCurrentPage * itemsPerPage, totalRows))
  },[gridData,kanbanCurrentPage, totalRows])

  useEffect(()=>{
    setTotalRows(kanbanDataFiltered.length)
  },[gridData, kanbanDataFiltered])

  useEffect(()=>{
    setTotalRows(kanbanDataFiltered.length)
  },[])

  return (<>
    <div className="flex flex-col justify-center mr-3">
      {/* <span className="text-sm">{`${firstIndex}-${lastIndex } / ${totalRows}`}</span> */}
      <span className="text-sm">{firstIndex}-{lastIndex} / {totalRows}</span>
    </div>

    <ToggleButtonGroup aria-label="text formatting">
      <ToggleButton
        onClick={handlePrev}
        // disabled={!(getCanPrev())}
        sx={{ height: "37px", width: "38px" }}
      >
        {/* <RiArrowLeftSLine /> */}
        <GrPrevious />
      </ToggleButton>

      <ToggleButton
        onClick={handleNext}
        // disabled={!(getCanNext())}
        sx={{ height: "37px", width: "38px" }}
      >
        {/* <RiArrowRightSLine /> */}
        <GrNext />
      </ToggleButton>
    </ToggleButtonGroup>
  </>)
}

export default Frm_web_pag_kanban