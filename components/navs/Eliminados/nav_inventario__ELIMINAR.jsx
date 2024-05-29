import * as React from 'react';
import Box from '@mui/material/Box';

import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import { IoMdSettings } from "react-icons/io";


import { CgPrinter } from 'react-icons/cg'

import { MdOutlineCancel } from 'react-icons/md'
import { MdOutlineCancelPresentation } from 'react-icons/md'

import { MdExpandMore } from 'react-icons/md'
import { RiMailSendLine } from 'react-icons/ri'
import { TbHistory } from 'react-icons/tb'
import { RiHistoryFill } from 'react-icons/ri'





import { RiDeleteBin2Line } from 'react-icons/ri'
import { BiHighlight } from 'react-icons/bi'
import { RiFolderAddLine } from 'react-icons/ri'



import { GrTrash } from "react-icons/gr";


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function Nav_Inventario() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };


  

  return (
    
    
    <>
    
    <Button
        // id="demo-customized-button"
        // aria-controls={open ? 'demo-customized-menu' : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        disableElevation
        onClick={handleClick2}
        // onMouseMove={handleClick2}
        // endIcon={<KeyboardArrowDownIcon />}
      >
            <Typography fontSize={"14px"} sx={{ textTransform: "none" }}>
            Informes
            </Typography>
      </Button>


      <StyledMenu
        className='menuEx'
        // id="demo-customized-menu"
        // MenuListProps={{
        //   'aria-labelledby': 'demo-customized-button',
        // }}
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
      >

        <MenuItem>
          <ListItemText>Stock</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemText>Análisis de movimientos</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleClose}>
        <ListItemText>Valoración</ListItemText>
        </MenuItem>

      </StyledMenu>
     
















      <Button
        // id="demo-customized-button"
        // aria-controls={open ? 'demo-customized-menu' : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        disableElevation
        onClick={handleClick}
        // onMouseMove={handleClick}
        // endIcon={<KeyboardArrowDownIcon />}
      >
            <Typography fontSize={"14px"} sx={{ textTransform: "none" }}>
            Configuración
            </Typography>
      </Button>

      <StyledMenu
        className='menuEx'
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
            <IoMdSettings style={{ fontSize: "16px" }} />
          </ListItemIcon>
          <ListItemText>Ajustes</ListItemText>
          {/* <Typography variant="body2" color="text.secondary">F1</Typography> */}
        </MenuItem>

        <div className="HeadMenuItem">Gestión de almacenes</div>

        <MenuItem onClick={handleClose}>
          <ListItemText  className="ml-4">Almacenes</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleClose}>
        <ListItemText  className="ml-4">Tipos de operaciones</ListItemText>
        </MenuItem>

        {/* <Divider sx={{ my: 0.5 }} /> */}

        <div className="HeadMenuItem">Productos</div>

        <MenuItem>
        <ListItemText  className="ml-4">Categorías de producto</ListItemText>
          {/* <Typography variant="body2" color="text.secondary">F8</Typography> */}
        </MenuItem>

        <MenuItem onClick={handleClose}>
        <ListItemText  className="ml-4">Reglas de abastecimiento</ListItemText>
        </MenuItem>
      </StyledMenu>
      </>

  );
}
