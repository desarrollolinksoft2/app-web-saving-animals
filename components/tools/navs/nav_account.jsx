'use client'
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import { BiSolidUserCircle } from "react-icons/bi"

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { signOut } from '@/data/auth';
import { useRouter } from 'next/navigation';
import useAppStore from '@/store/zustand';
import useUserStore from '@/store/user_store';

export default function AccountMenu() {
    const route = useRouter()
    const userData = useUserStore(state => state.userData)
    const setUserSession = useUserStore(state => state.setUserSession)
    const [anchorEl, setAnchorEl] = useState(null);
    const [wordName, setWordName] = useState('');
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async() => {
        await signOut()
        setUserSession(null);
        route.push('/auth/login')

    }



    useEffect(()=>{
        // console.log(userData)
        if(userData?.nombre){
            setWordName(userData.nombre[0])
        }
    },[userData])


    return (
        <React.Fragment>



            {/* <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Cuenta S7 - Fernando Villarruel">
          <IconButton
              size="large"
              color="inherit"
              edge="end"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <BiSolidUserCircle />
            </IconButton>
        </Tooltip>
      </Box> */}
            <button onClick={handleClick} className="h-6 w-6 flex justify-center items-center mx-2 bg-green-600 rounded text-gray-200 dark:text-gray-300 focus:outline-none">
                {
                    userData?.avatar ?
                    <Avatar src={userData?.avatar?.[0].publicUrl} alt={userData?.name} sx={{width: 26, height: 26}}  variant='rounded'/>
                    :<span className="font-bold">{wordName}</span>
                }
            </button>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 26,
                            height: 26,
                            ml: -0.5,
                            mr: 1.75,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> Mi perfil
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemText >Cambiar contraseña</ListItemText>
                </MenuItem>
                <Divider />
                {/*
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configuración
        </MenuItem>
        */}
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        {/* <Logout fontSize="small" /> */}
                    </ListItemIcon>
                    Cerrar sesión
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
