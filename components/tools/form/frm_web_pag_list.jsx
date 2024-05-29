import useAppStore from "@/store/zustand"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { expandRows } from "@tanstack/react-table";
import { use, useEffect, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr"

const Frm_web_pag_list = () => {
  
  const table = useAppStore((state) => state.table);
  const gridData = useAppStore((state) => state.gridData);
  const itemsPerPage = useAppStore((state) => state.itemsPerPage);
  const listCurrentPage = useAppStore((state) => state.listCurrentPage);
  const setListCurrentPage = useAppStore((state) => state.setListCurrentPage);
  const globalFilter = useAppStore((state) => state.globalFilter);
  const groupedList = useAppStore((state) => state.groupedList);
  const [totalItems,setTotalItems] = useState(gridData.length)
  const [firstIndex, setFirstIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(Math.min(itemsPerPage, gridData.length));

  
  const handlePrev = async() => {
    if(firstIndex===1){
      await table.setPageIndex(table.getPageCount()-1)
      setListCurrentPage(table.getPageCount())
      return;
    }
    await table.previousPage()
    setListCurrentPage(listCurrentPage-1)
  }

  const handleNext = async() => {
    if(lastIndex>=totalItems && table.getIsSomeRowsExpanded()===false){
      await table.setPageIndex(0)
      setListCurrentPage(table.getState().pagination.pageIndex + 1)
      return;
    }
    await table.nextPage()
    setListCurrentPage(listCurrentPage+1)
  }

  const updateCurrentPage = async() => {
    await table.setPageIndex(listCurrentPage - 1)
    setFirstIndex((listCurrentPage-1) * itemsPerPage + 1)
    setLastIndex(Math.min(listCurrentPage * itemsPerPage, totalItems))
  }

  useEffect(()=>{
    if(table){
      updateCurrentPage()
      setTotalItems(table.getPrePaginationRowModel().rows.length)
    }
  },[table,globalFilter])

  useEffect(()=>{
    if(table)
    updateCurrentPage()
  },[listCurrentPage, totalItems])

  useEffect(()=>{
    if(gridData.length>0 && table){
    updateCurrentPage()
    setTotalItems(table.getPrePaginationRowModel().rows.length)
    }
  },[table])

  useEffect(()=>{
    if(groupedList.length>0){
      if(table){
        updateCurrentPage()
        setTotalItems(table.getPrePaginationRowModel().rows.length)
        }
    }
  },[groupedList])

  useEffect(()=>{
    if(gridData.length>0){
      updateCurrentPage()
      }
  },[])

    return (<>
        <div className="flex flex-col justify-center mr-3">
            {/* <span className="text-sm">{`${firstIndex}-${lastIndex } / ${totalRows}`}</span> */}
            <span className="text-sm">{firstIndex}-{lastIndex} / {totalItems}</span>
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

export default Frm_web_pag_list