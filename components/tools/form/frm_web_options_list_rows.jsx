import React from "react";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

import useAppStore from "@/store/zustand";

import { RiDeleteBin2Line } from "react-icons/ri";
import { Typography } from "@mui/material";
import { IoMdSettings } from "react-icons/io";
import { RiInboxArchiveLine } from "react-icons/ri";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import { HiOutlineDuplicate } from "react-icons/hi";
import { BiExport } from "react-icons/bi";
import { GrTrash } from "react-icons/gr";

import { styled, alpha } from "@mui/material/styles";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useState } from "react";
import DialogMessage from "../dialog_message";
import { toast } from "sonner";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Frm_web_options_list_row = ({config}) => {
  const rowSelection = useAppStore((state) => state.rowSelection);
  const setRowSelection = useAppStore((state) => state.setRowSelection);
  const executeFnc = useAppStore((state) => state.executeFnc);
  const setGridData = useAppStore((state) => state.setGridData);
  const gridData = useAppStore((state) => state.gridData);
  const setFrmState = useAppStore((state) => state.setFrmState);
  const deleteImages = useAppStore((state) => state.deleteImages);
  const idRow = config.grid.idRow
  const fnc_name = config.fnc_name
  const input_images= config.form_inputs.imagenFields || []
  const [openDialog, setOpenDialog] = useState(false);



  const handleDelete = () => {
    setRowSelection((prev) => {
      return {};
    });
  };

  const DeleteRowsSelected= async ()=>{
    const rows = Object.keys(rowSelection)

    const objects = rows.map((row)=>{

      return gridData.find((obj)=>obj[idRow]==row)
    })

    
    objects.forEach(async(obj)=>{
      let res = await executeFnc(fnc_name,'d',{[idRow]: obj[idRow]})
      // if(input_images.length>0){
      //   input_images.forEach(async (input)=>{
      //     let file = obj[input]
      //     if(file[0].path){
      //       await deleteImages(originForm[field], 'images')
      //     }
      //   })
      // } 
          
          handleDelete()
    })
    await setGridData(fnc_name,idRow) 
    // for (const obj of objects){

    // } 

  }

  // Menu acciones inicio
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Menu acciones fin

  return (
    <>
      
      <div className="w-full flex mx-5 gap-3 justify-center">
        {/* <div className="flex items-center"> */}
        <div className="flex">
          <Chip
            className="MuiChipEx"
            label={`${Object.keys(rowSelection).length} seleccionado(s)`}
            // label={
            //   <Typography fontSize={"14.4px"}>
            //     Compañia
            //   </Typography>
            // }

            // label={
            //   <Typography fontSize={"14.4px"}>
            //     {`
            //     ${Object.keys(rowSelection).length}
            //     `}
            //   </Typography>
            //   }

            color="success"
            onDelete={handleDelete}
          />
        </div>
        
        <div className="flex">

          <Button
            className="btn btn-secondary btn_2"
            startIcon={<IoMdSettings style={{ fontSize: "16px" }} />}
            onClick={handleClick}
          >
            Acciones
          </Button>

          <StyledMenu
            className="menuEx"
            // id="demo-customized-menu"
            // MenuListProps={{
            //   'aria-labelledby': 'demo-customized-button',
            // }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem>
              <ListItemIcon>
                <BiExport
                  style={{ fontSize: "16px" }}
                  //   className="mr-3"
                />
              </ListItemIcon>
              <ListItemText>Exportar</ListItemText>
              {/* <Typography variant="body2" color="text.secondary">F1</Typography> */}
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <RiInboxArchiveLine
                  style={{ fontSize: "16px" }}
                  //   className="mr-3"
                />
              </ListItemIcon>
              <ListItemText>Archivar</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <RiInboxUnarchiveLine
                  style={{ fontSize: "16px" }}
                  //   className="mr-3"
                />
              </ListItemIcon>
              <ListItemText>Desarchivar</ListItemText>
            </MenuItem>

            {/* <Divider sx={{ my: 0.5 }} /> */}

            <MenuItem>
              <ListItemIcon>
                <HiOutlineDuplicate
                  style={{ fontSize: "16px" }}
                  //   className="mr-3"
                />
              </ListItemIcon>
              <ListItemText>Duplicar</ListItemText>
              {/* <Typography variant="body2" color="text.secondary">F8</Typography> */}
            </MenuItem>

            <MenuItem onClick={()=>setOpenDialog(true)}>
              <ListItemIcon>
                {/*              
            <RiDeleteBin2Line style={{ fontSize: "16px" }}
            // className="mr-3"
            />
                         */}
                <GrTrash style={{ fontSize: "14px" }} />
              </ListItemIcon>
              <ListItemText>Eliminar</ListItemText>
            </MenuItem>
          </StyledMenu>

        </div>
      </div>
    </>
  );
};

export default Frm_web_options_list_row;
