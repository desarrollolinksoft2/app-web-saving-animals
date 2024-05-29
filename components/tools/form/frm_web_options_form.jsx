"use client";
import React, { useEffect, useState } from "react";
import { useAppStore } from "@/store/zustand";
// import useScreenSize from "../../hooks/resize-screen";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import Stack from "@mui/material/Stack";
import { IconButton, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import Tooltip from "@mui/material/Tooltip";
import { GrPrevious, GrNext } from "react-icons/gr";

import { MdOutlineLibraryAdd } from "react-icons/md";
import { CgRadioChecked } from "react-icons/cg";
import { IoIosUndo } from "react-icons/io";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import pathNavigator from "../navs/path_navigator";

import { IoMdSettings } from "react-icons/io";
import { RiInboxArchiveLine } from "react-icons/ri";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import { HiOutlineDuplicate } from "react-icons/hi";
import { BiExport } from "react-icons/bi";
import { GrTrash } from "react-icons/gr";
import { RiUploadCloud2Line } from "react-icons/ri";

// import useWindowWidth from "@/components/hooks/window-width";

import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import DialogMessage from "../dialog_message";
import { set } from "react-hook-form";

// ====================================================================================================

import NavMenuList from "../navs/nav_menu_list";
import { CgMoreAlt } from "react-icons/cg";
import { TfiMoreAlt } from "react-icons/tfi";
import { toast } from "sonner";
import useUserStore from "@/store/user_store";

const ln_frm_links_show = 3;
const ld_frm_links = {
  icon: <TfiMoreAlt />,
  list: [
    // {
    //   orden: 1,
    //   title: "Presupuestos",
    //   path: "",
    // },
    // {
    //   orden: 2,
    //   title: "Pedidos",
    //   path: "",
    // },
    // {
    //   orden: 3,
    //   title: "Equipos de ventas",
    //   path: "",
    // },
    // {
    //   orden: 4,
    //   title: "Clientes",
    //   path: "/web?menu=3&config=201",
    // },
    // {
    //   orden: 5,
    //   title: "Nueva rama",
    //   path: "/web?menu=3&config=201",
    // },
    // {
    //   orden: 6,
    //   title: "Facturas",
    //   path: "/web?menu=3&config=201",
    // },
    // {
    //   orden: 7,
    //   title: "Fernando Villarruel",
    //   path: "/web?menu=3&config=201",
    // },
    // {
    //   orden: 8,
    //   title: "Opcion 8",
    //   path: "/web?menu=3&config=201",
    // },
    // {
    //   orden: 9,
    //   title: "Opcion 9",
    //   path: "/web?menu=3&config=201",
    // },
    // {
    //   orden: 10,
    //   title: "Opcion 10",
    //   path: "/web?menu=3&config=201",
    // },
    // {
    //   orden: 11,
    //   title: "Opcion 11",
    //   path: "/web?menu=3&config=201",
    // },

  ],
};
const ld_frm_links_sorted = [...ld_frm_links?.list].sort((a, b) => a.orden - b.orden);
const ld_frm_links_reversed = ld_frm_links?.list.reverse();
// ====================================================================================================

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

const Frm_web_options_form = ({ config }) => {
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const frmState = useAppStore((state) => state.frmState);
  const frmLoading = useAppStore((state) => state.frmLoading);
  const setFrmLoading = useAppStore((state) => state.setFrmLoading);
  const frmList = useAppStore((state) => state.frmList);
  const setFrmList = useAppStore((state) => state.setFrmList);
  const frmListIndex = useAppStore((state) => state.frmListIndex);
  const setFrmListIndex = useAppStore((state) => state.setFrmListIndex);
  const gridData = useAppStore((state) => state.gridData);
  const userData = useUserStore((state) => state.userData);
  const setFrmState = useAppStore((state) => state.setFrmState);
  const frmIsChanged = useAppStore((state) => state.frmIsChanged);
  const setFrmIsChanged = useAppStore((state) => state.setFrmIsChanged);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const setFrmItemSelected = useAppStore((state) => state.setFrmItemSelected);
  const setGridData = useAppStore((state) => state.setGridData);
  const appRoutes = useAppStore((state) => state.appRoutes);
  const setAppRoutes = useAppStore((state) => state.setAppRoutes);
  const frmSaveExpress = useAppStore((state) => state.frmSaveExpress);
  const setFrmSaveExpress = useAppStore((state) => state.setFrmSaveExpress);
  const setAppDialog = useAppStore((state) => state.setAppDialog);
  const frmNameForm = useAppStore((state) => state.frmNameForm);
  const frmAction = useAppStore((state) => state.frmAction);
  const setFrmAction = useAppStore((state) => state.setFrmAction);
  const fnc_name = config.fnc_name;
  const idRow_db = config.grid.idRow_db;
  const idRow = config.grid.idRow;
  const col_name = config.grid.col_name;
  const title = config.title;
  const menu = searchParams.get("menu");
  const configName = searchParams.get("config");
  const prev_view = searchParams.get("prev_view") || null;
  const idForm = searchParams.get("id") ? searchParams.get("id") : '0';
  const [openDialog, setOpenDialog] = useState(false);
  const [formats, setFormats] = useState(() => ["bold", "italic"]);
  const [routesA, setRoutesA] = useState([]);
  const [routesB, setRoutesB] = useState([]);
  const [dialogData, setDialogData] = useState({
    open: false,
    title: "",
    content: "",
    handleConfirm: null,
    actions: false,
  });

  // const handleFormat = (event, newFormats) => {
  //   setFormats(newFormats);
  // };

  const handleDelete = () => {
    setAppDialog({
      title: "¡Adios Registro!",
      content: "¿Está seguro que desea eliminar este registro?",
      open: true,
      handleConfirm: DeleteRow,
      actions: true,
    });
  };

  const handleDuplicate = (status) => {

    handleClose()

    // if (status === "A" || frmState === "n") {

    //   // setOpenDialog(true);
    // } else {
      setFrmAction('r')
    // setFrmState("r");
    // }
  };

  const handleChangeStatus = (status) => {


    handleClose()

    // if (status === "A" || frmState === "n") {

    //   // setOpenDialog(true);
    // } else {
      setFrmAction('us')
    // setFrmState("us");
    // }
  };

  const returnTogrid = async () => {
    let prev_view = searchParams.get("prev_view") || null;

    var nparams = {
      view_type: prev_view ? prev_view : config.view_default,
    };
    setAppRoutes([]);
    pathNavigator(pathname, route, searchParams, nparams, ["prev_view", "id"]);
  }



  const handleBack = async (item) => {
    setFrmLoading(true);
    // await saveBeforeAction(async () => {
    setFrmSaveExpress(true, async () => {
      await setGridData(fnc_name, idRow);
      if (appRoutes.length === 0) {
        await returnTogrid();

        return;
      };
      let indice = appRoutes.findIndex((route) => route.path === item.path);
      if (indice >= 0) {
        let nroutes = appRoutes.slice(0, indice);
        setAppRoutes([...nroutes]);
        if (item.list) setFrmList(item.list);
        if (item.index) setFrmListIndex(item.index);
        route.replace(pathname + "?" + item.path)
      }
    })
    // })

  };

  const buildBreadcrumb = () => {
    setRoutesA([]);
    setRoutesB([]);
    if (appRoutes.length > ln_frm_links_show) {
      setRoutesA(appRoutes.slice(appRoutes.length - ln_frm_links_show))
      let rest = appRoutes.slice(0, appRoutes.length - ln_frm_links_show)
      if (rest.length > 0) {
        setRoutesB([...rest].reverse())
      }
    } else {
      setRoutesA([...appRoutes])
    }
  }

  const handleChangeId = async (index) => {
    setFrmLoading(true);
    let id = frmList[index]?.[idRow];
    // console.log(id)
    await setFrmItemSelected(fnc_name, idRow_db, id);
    // console.log('ejecutando cahnge Id')
    pathNavigator(pathname, route, searchParams, { id: id });
    // setFrmLoading(false);
  };

  const DeleteRow = () => {
    setFrmLoading(true);
    // setFrmState("d");
    setFrmAction('d')
  };

  const handleBtnSave = () => {
    setFrmLoading(true);
    
    // setFrmState("ps");
    setFrmAction('ps')
  };

  const handleBtnNew = async () => {
    setFrmLoading(true);
    setFrmSaveExpress(true, async () => {
      setFrmItemSelected(null)
      setFrmState("n");
      setFrmLoading(false);
      pathNavigator(pathname, route, searchParams, { view_type: "form", id: '0' });

    })


    // route.refresh();
  };

  const handleBtnUndo = () => {
    // setFrmState("u");
    setFrmAction('u')
  };

  const handlePrev = async () => {
    setFrmLoading(true)
    setFrmSaveExpress(true, async () => {
      let nIndex = 0
      if (frmListIndex <= 0) {
        nIndex = frmList.length - 1;
      } else {
        nIndex = frmListIndex - 1;

      }
      await handleChangeId(nIndex);
      setFrmListIndex(nIndex);

    })
  };
  const handleNext = async () => {
    setFrmLoading(true)
    setFrmSaveExpress(true, async () => {
      let nIndex = 0
      if (frmListIndex >= frmList.length - 1) {
        nIndex = 0;
      } else {
        nIndex = frmListIndex + 1;
      }
      await handleChangeId(nIndex);
      setFrmListIndex(nIndex);
    })

  };

  // useEffect(() => {
  //   if (frmState === "v") {
  //     setFrmIsChanged(false);
  //   }
  // }, [frmState]);

  useEffect(() => {
    buildBreadcrumb();
    let idForm = searchParams.get("id") ? searchParams.get("id") : '0';
    // console.log(idForm)
    if (frmItemSelected) {
      if (idForm !== 'null' && frmItemSelected?.[idRow] !== idForm) {
        setFrmItemSelected({ fnc_name, idName: idRow_db, value: idForm });
      }
    }
  }, [searchParams])

  useEffect(() => {
    buildBreadcrumb();
    // console.log(routesA)
    // console.log(routesB)
    if (frmList.length === 0) {
      setFrmList(gridData);
    }
  }, []);


  useEffect(() => {
    if (userData && frmItemSelected) {
      if (frmList.length < 1) {
        setFrmList([frmItemSelected])
        setFrmListIndex(0)
      }
      
    }
    if(userData && idForm==='0'){
      setFrmState('n')
    }
    if (appRoutes.length === 0) {
      // console.log('seteando rutas despues de f5')
      setAppRoutes([{
        name: title,
        path: `menu=${menu}&config=${configName}${prev_view ? `&view_type=${prev_view}` : ''}`
      }])
    }
  }, [userData, frmItemSelected])

  useEffect(() => {
    if (appRoutes.length > 0) {
      buildBreadcrumb();
    }
  }, [appRoutes])


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
        <div className="flex items-center c_NavMenuListEx">

          {routesB.length > 0 && (<>
            <NavMenuList menu="" icon={ld_frm_links.icon}>
              {routesB.map((item, i) => (
                <MenuItem key={i} onClick={() => handleBack(item)}>
                  <ListItemText>{item.name}</ListItemText>
                </MenuItem>
              ))}
            </NavMenuList>
            <span className=" mx-1.5"> / </span>
          </>)}
          {routesA.map((item, i) => {
            return (<>
              <Tooltip key={i} arrow title={'Regresar a "' + item.name + '"'}>
                <button
                  className="h-[20px] font-medium text-teal-600 text-truncate items-center"
                  disabled={frmLoading}
                  onClick={() => handleBack(item)}
                >
                  {item.name}
                </button>
              </Tooltip>
              {i < routesA.length - 1 && (
                <span className=" mx-1.5"> / </span>
              )}
            </>);
          })
          }

        </div>

        <div className="flex items-center">
          <div
            className="mr-1 text-truncate"
            // style={{ maxWidth: '349px' }}
            style={{ maxWidth: '300px' }}
          >
            {/* {frmState === "n" ? "..." : frmItemSelected?.[col_name]} */}
            {/* {frmState === "n" ? "Nuevo" : frmItemSelected?.[col_name]} */}
            {(frmState === "n" && frmNameForm == '') ? "Nuevo" : frmNameForm}

          </div>
          <Stack
            className="grow"
            direction="row"
          // spacing={1}
          >
            <Tooltip arrow title="Acciones">
              <IconButton
                disabled={frmLoading}
                onClick={handleClick} >
                <IoMdSettings style={{ fontSize: "18px" }} />
              </IconButton>
            </Tooltip>

            <StyledMenu
              className="menuEx"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {(frmItemSelected?.["status"] === "A" || frmState === 'n') && (
                <MenuItem onClick={() => handleChangeStatus("A")}>
                  <ListItemIcon>
                    <RiInboxArchiveLine style={{ fontSize: "16px" }} />
                  </ListItemIcon>
                  <ListItemText>Archivar</ListItemText>
                </MenuItem>
              )}

              {(frmItemSelected?.["status"] === "I" && frmState !== 'n') && (
                <MenuItem onClick={() => handleChangeStatus("D")}>
                  <ListItemIcon>
                    <RiInboxUnarchiveLine style={{ fontSize: "16px" }} />
                  </ListItemIcon>
                  <ListItemText>Desarchivar</ListItemText>
                </MenuItem>
              )}

              <MenuItem onClick={() => handleDuplicate("R")}>
                <ListItemIcon>
                  <HiOutlineDuplicate style={{ fontSize: "16px" }} />
                </ListItemIcon>
                <ListItemText>Duplicar</ListItemText>
                {/* <Typography variant="body2" color="text.secondary">F8</Typography> */}
              </MenuItem>

              {/* <Divider sx={{ my: 0.5 }} /> */}
            </StyledMenu>

            {(frmState !== "n" && frmItemSelected?.[idRow]) && (
              <Tooltip arrow title="Eliminar registro">
                <IconButton
                  style={{ width: "34px", height: "34px" }}
                  disabled={frmLoading}
                  onClick={handleDelete}
                >
                  {/* <RiDeleteBin2Line style={{ fontSize: "18px" }} /> */}
                  <GrTrash style={{ fontSize: "16px" }} />
                </IconButton>
              </Tooltip>
            )}

            {frmIsChanged && (
              <>
                <Tooltip arrow title="Guardar cambios">
                  <IconButton
                    style={{
                      width: "36px",
                      height: "34px",
                      marginLeft: "10px",
                      paddingTop: "9px",
                    }}
                    disabled={frmLoading}
                    onClick={handleBtnSave}
                  >
                    <RiUploadCloud2Line style={{ fontSize: "20px" }} />
                  </IconButton>
                </Tooltip>

                <Tooltip arrow title="Descartar cambios">
                  <IconButton
                    style={{
                      paddingTop: "9px",
                      paddingBottom: "7px",
                    }}
                    disabled={frmLoading}
                    onClick={handleBtnUndo}
                  // hidden={!formChanged}
                  // hidden={formChanged}
                  >
                    <IoIosUndo style={{ fontSize: "18px" }} />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Stack>
        </div>
      </div>

      <div className="w-1/3"></div>

      <div className="w-1/3 flex justify-end">
        {frmState !== "n" && (
          <Stack direction="row">
            <div className="flex flex-col justify-center mr-3">
              {/* <span className="text-sm">{`${firstIndex}-${lastIndex } / ${totalRows}`}</span> */}
              <span className="text-sm">
                {frmListIndex + 1} / {frmList.length}
              </span>
            </div>

            <ToggleButtonGroup aria-label="text formatting">
              <ToggleButton
                onClick={handlePrev}
                disabled={frmLoading}
                sx={{ height: "37px", width: "38px" }}
              >
                <GrPrevious />
              </ToggleButton>

              <ToggleButton
                onClick={handleNext}
                disabled={frmLoading}
                sx={{ height: "37px", width: "38px" }}
              >
                <GrNext />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        )}
      </div>
    </div>
  );
};
export default Frm_web_options_form;
