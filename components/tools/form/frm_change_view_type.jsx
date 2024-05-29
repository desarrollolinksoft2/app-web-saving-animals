'use client'
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FaThList } from "react-icons/fa";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { MdDragHandle } from "react-icons/md";

const Frm_change_view_type = ({ viewType, changeView, listViews }) => {

  const handleButtonClick = (event, newValue) => {
    changeView(newValue);
  };

  const iconView = (value)=>{
    switch(value){
      case 'list':
        return <FaThList style={{ fontSize: "16px" }} />
      case 'kanban':
        return <ViewModuleIcon style={{ fontSize: "22px" }} />
      case 'draglist':
        return <MdDragHandle  style={{ fontSize: "22px" }} />
      default:
        return <ViewModuleIcon style={{ fontSize: "22px" }} />
    }
  }

    return (
        <ToggleButtonGroup
          orientation="horizontal"
          value={viewType} //==='kanban' ? true : false}
          exclusive
          // onChange={() => changeView(viewType === "kanban" ? "list" : "kanban")}
          onChange={handleButtonClick}
        >
          {listViews.map((value, i) => {
            return (
              <ToggleButton key={i} value={value} sx={{ height: "37px", width: "40px" }}>
                {iconView(value)}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
    )
}

export default Frm_change_view_type;