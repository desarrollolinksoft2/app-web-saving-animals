"use client";
import React, { useEffect, useState } from "react";
import { useAppStore } from "@/store/zustand";
import { IoMdSettings } from "react-icons/io";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FaThList } from "react-icons/fa";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import Stack from "@mui/material/Stack";
import { IconButton, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import Tooltip from "@mui/material/Tooltip";
import { GrPrevious, GrNext } from "react-icons/gr";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { CgRadioChecked } from "react-icons/cg";
import { IoIosUndo } from "react-icons/io";
import { RiDeleteBin2Line } from "react-icons/ri";
import Frm_web_options_list_search from "./frm_web_options_list_search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Frm_web_options_list_rows from "./frm_web_options_list_rows";

import { GrTrash } from "react-icons/gr";

import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { BiImport } from "react-icons/bi";
import { BiExport } from "react-icons/bi";
import Frm_change_view_type from "./frm_change_view_type";
import Frm_web_pag_list from "./frm_web_pag_list";
import Frm_web_pag_kanban from "./frm_web_pag_kanban";
import pathNavigator from "../navs/path_navigator";
import FrmGridSearch from "./frm_grid_search";

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

const Frm_web_options = ({ config, viewType }) => {
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rowSelection = useAppStore((state) => state.rowSelection);
  const setFrmState = useAppStore((state) => state.setFrmState);
  const appRoutes = useAppStore(state => state.appRoutes)
  const setAppRoutes = useAppStore(state => state.setAppRoutes)
  const setFrmItemSelected = useAppStore((state) => state.setFrmItemSelected);
  const [formats, setFormats] = useState(() => ["bold", "italic"]);
  const views = config.views;
  // const handleFormat = (event, newFormats) => {
  //   setFormats(newFormats);
  // };

  const changeView = (view) => {
    // let params = new URLSearchParams(searchParams.toString());
    // params.set("view_type", view);
    // route.replace(pathname + "?" + params.toString());
    pathNavigator(pathname, route, searchParams, { view_type: view });
  };

  const handleBtnNew = () => {

    setFrmItemSelected(null)
    setFrmState("n");
    // route.refresh()
    setAppRoutes([])
    let nroute={
      name:config.title,
      path:searchParams.toString(),
    }
    setAppRoutes([nroute]);
    pathNavigator(pathname, route, searchParams, { view_type: "form", id: '0' });
  };

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
    <div className="w-full flex gap-3 items-center">

      <div className="flex items-center">
        <button className="btn btn-primary" onClick={handleBtnNew}>Nuevo</button>
      </div>

      <div className="w-1/3">
        <div className="flex items-center">
          <div className="mb-1 mr-1 text-gray-800 text-base text-truncate">
            {config.title}
          </div>

          <Stack className="grow" direction="row"
          // spacing={1}
          >
            <Tooltip arrow title="Acciones">
              <IconButton onClick={handleClick}>
                <IoMdSettings style={{ fontSize: "18px" }} />
              </IconButton>
            </Tooltip>

            <StyledMenu
              className="menuEx"

              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>
                <ListItemIcon>
                  <BiImport
                    style={{ fontSize: "16px" }}
                  // className="mr-3"
                  />
                </ListItemIcon>
                <ListItemText>Importar registros</ListItemText>
                {/* <Typography variant="body2" color="text.secondary">F1</Typography> */}
              </MenuItem>

              {viewType === "list" && (
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <BiExport
                      style={{ fontSize: "16px" }}
                    // className="mr-3"
                    />
                  </ListItemIcon>
                  <ListItemText>Exportar todo</ListItemText>
                </MenuItem>
              )}
            </StyledMenu>
          </Stack>
        </div>
      </div>
      <div className="w-1/3">

        {viewType === "list" ? (
          <>
            {Object.keys(rowSelection).length > 0 ? (
              <Frm_web_options_list_rows config={config} />
            ) : (
              // <Frm_web_options_list_search />
              <FrmGridSearch config={config} />
            )}
          </>
        ) : (
          <FrmGridSearch config={config} />
        )}
        
        {/*
        {viewType === "list" ? (
          <>
            {Object.keys(rowSelection).length > 0 ? (
              <Frm_web_options_list_rows config={config} />
            ) : (
              <Frm_web_options_list_search />
            )}
          </>
        ) : (
          // <Frm_web_options_list_search />
          // <FrmGridSearch />
          <FrmGridSearch config={config} />
        )}
        */}

      </div>
      <div className="w-1/3 flex justify-end">
        <Stack
          direction="row"
          // spacing={1}
          className="mr-4"
        >
          {viewType === "list" && <Frm_web_pag_list />}
          {viewType === "kanban" && <Frm_web_pag_kanban />}
        </Stack>

        {
          views?.length > 1 && (<Frm_change_view_type listViews={views} viewType={viewType} changeView={changeView} />)
        }
      </div>
    </div>
  );
};
export default Frm_web_options;
