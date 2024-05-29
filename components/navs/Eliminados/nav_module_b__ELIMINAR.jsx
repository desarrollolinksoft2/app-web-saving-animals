'use client'
import Button from '@mui/material/Button';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { styled } from '@mui/system';
import { MenuButton } from '@mui/base';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Nav_almacen_config from '../nav_config_inv';
import Link from 'next/link';
import Nav_ventas_config from '../nav_config_ven';

import Nav_Inventario from './nav_inventario';


const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#99CCF3',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E6',
    700: '#0059B3',
    800: '#004C99',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const MenuItem = styled(BaseMenuItem)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 6px;
    cursor: default;
    user-select: none;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${menuItemClasses.focusVisible} {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
  
    &.${menuItemClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${menuItemClasses.disabled}) {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
    `,
);

const Listbox = styled('ul')(
    ({ theme }) => `
    // font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 6px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
    z-index: 1;
    `,
);

const MenuSectionRoot = styled('li')`
  list-style: none;
  padding-top: 0.6em;
  & > ul {
    // padding-left: 1em;
  }
`;

const MenuSectionLabel = styled('span')`
  display: block;
  color: #6B7A90;};
`;

function MenuSection({ children, label }) {
    return (
        <MenuSectionRoot role="group">
            <MenuSectionLabel><span className='text-sm px-3'>{label}</span></MenuSectionLabel>
            <ul>{children}</ul>
        </MenuSectionRoot>
    );
}

const NavMain = () => {
    const searchParams = useSearchParams();
    const menuId = searchParams.get('menu');
    const [menu, setMenu] = useState(null)
    const route = useRouter()
    const navigate = (path) => {
        route.push(path)
    }

    const changeMenuConfig = (id) => {
        switch (id) {
            case '2':
                setMenu(Nav_almacen_config)
                break;
            case '3':
                setMenu(Nav_ventas_config)
                break;
            default:
                setMenu(null)
                break;
        }
    }

    useEffect(() => {
        // console.log(menuId)
        changeMenuConfig(menuId)
    }, [menuId])

    return (
        <>
            {
                menu && (
                    <>
                        <Link href={'/web?menu=1'} accessKey="h" aria-label="Menú de inicio"
                            title="Menú de inicio" className='o_menu_toggle hasImage' >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="o_menu_toggle_icon"
                                width="14px"
                                height="14px"
                                viewBox="0 0 14 14"
                            >
                                <g
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    id="o_menu_toggle_row_0"
                                >
                                    <rect
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="3"
                                        height="3"
                                        x="0"
                                        y="0"
                                    />
                                    <rect
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="3"
                                        height="3"
                                        x="5"
                                        y="0"
                                    />
                                    <rect
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="3"
                                        height="3"
                                        x="10"
                                        y="0"
                                    />
                                </g>
                                <g
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    id="o_menu_toggle_row_1"
                                >
                                    <rect
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="3"
                                        height="3"
                                        x="0"
                                        y="5"
                                    />
                                    <rect
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="3"
                                        height="3"
                                        x="5"
                                        y="5"
                                    />
                                    <rect
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="3"
                                        height="3"
                                        x="10"
                                        y="5"
                                    />
                                </g>
                                <g
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    id="o_menu_toggle_row_2"
                                >
                                    <rect
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="3"
                                        height="3"
                                        x="0"
                                        y="10"
                                    />
                                    <rect
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="3"
                                        height="3"
                                        x="5"
                                        y="10"
                                    />
                                    <rect
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="3"
                                        height="3"
                                        x="10"
                                        y="10"
                                    />
                                </g>
                            </svg>
                            <img
                                className="o_menu_brand_icon d-none d-lg-inline position-absolute start-0 h-100 ps-1 ms-2"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALySURBVHgB7d29ahRRGMbx58x+IORro0RBDNlYRIv4AemsAqLRyrUTbLayXe9gNwqmMBBSBRQMFoKd2GmM6CV4CbmEdEoyO69nsqCI4I5hZueZyfMjTcKkyP5zztk5Z9kFRERERERERsuhxOzdcvwXNsKxegeRteCsCXMN5MdqK5+Cf11QRUkd7NzCIdBxsJ6PMYhg/P9/pQwS7qzEj/wrs6hdtEmgdEEOP96GmXX9cGijgAKUTBgF8z5GFwVVuiCVICxsjFjpgvgV4xoKrHRBfJLrKLASBik2BSGjIGQUhIyCkFEQMgpCRkHIKAgZBSFDs/1uvY1GVD/smLlluHj7w451she+fYk0VB7MIQ8UQfpr652+9Xt+H6oxOE8ynFS5BwnXnm/7A6U25Eiua0j/2XrXD4Y25Jfcgnxf22ha/AIE+UNuQSoW9iB/yS9IwU/2spJbEP88qtAne1nRjSEZBSGjIGQUhIyCkFEQMgpCRkHI/Pdu71br6bJzaPmW9/ztXRPH9OLNZ6Th0cObKJPEQbZbvcZBUO2a4fHgJyf3zCJLiYIcxXDVLz6GtjsylmgNORoZ2nsaiaFBtlq95u9pSrI2fIS4ag8yMkmmLJ1bjNDQIE5rx0jpxpCMgpBREDIKQkZByCgIGQUhoyBkFISMgpBREDIKQkZByCgIGQUhoyBkFISMgpBREDIKQkZByCgIGQUhoyBkFISMgpBREDIKQkZByCgIGQUhoyBkFISMgpBREDKFDnJmehyZaNSRCYdvwy4peJAJZMFN15AFF5U8yNLVi8hCsJjJJ3xbxSpPhl1U2CCLl2cxMXYKaXNxjLHU3xLf/Nequ/thb9iFhQxy2q8dN5YWkDY3P+5HxxRSZgZ7XVvZXU1yceE+vjseGalPVbUA7soUgoVJpMjgbN8irNbv7G4m/aUkQXJ/Y6x4apqbnUHzwgzOn5tGKnwE+MXbnT2F4NLk4Ps0+Aj+EdtDhPfVH+Gmu/91HyIiIiIiIsR+AsmgihQyBSQXAAAAAElFTkSuQmCC"
                                alt="Ventas"
                            />
                            <span className="o_menu_brand d-none d-md-flex ms-3 pe-0">
                                {menu.title}
                            </span>
                        </Link>
                        <div className="mx-2 ml-2">
                            <div className="hidden md:flex items-center text-sm space-x-4">

                                {/* =================================================== */}
                                {/* <Nav_Inventario /> */}
                                {/* =================================================== */}


                                {/* <button
                                    onClick={() => navigate("almacen")}
                                    className="flex mr-2 dark:text-gray-300 focus:outline-none"
                                >
                                    
                                </button> */}
                                {
                                    menu?.items.map((item, i) => (<>
                                        {
                                            item?.list ? (
                                                <>
                                                    <Dropdown>
                                                        <MenuButton><span className='p-1'>{item.title}</span></MenuButton>

                                                        <Menu key={i} slots={{ listbox: Listbox }}>
                                                            {
                                                                item?.list?.map((subItem, index) => (

                                                                    subItem?.list ? (
                                                                        <MenuSection key={index} label={subItem.title}>
                                                                            {
                                                                                subItem?.list?.map((subSubItem, ind) => (
                                                                                    <MenuItem key={ind} onClick={subSubItem.path ? () => navigate(subSubItem.path) : null}>
                                                                                        <span className='text-sm p-1 pl-5'>{subSubItem.title}</span>
                                                                                    </MenuItem>
                                                                                ))
                                                                            }
                                                                        </MenuSection>

                                                                    ) : (
                                                                        <MenuItem key={index} onClick={subItem.path ? () => navigate(subItem.path) : null}>
                                                                            <span className='text-sm p-1 pl-5'>{subItem.title}</span>
                                                                        </MenuItem>
                                                                    )

                                                                ))
                                                            }
                                                        </Menu>
                                                    </Dropdown>
                                                </>
                                            ) : (
                                                <>

                                                    <button onClick={item.path ? () => navigate(item.path) : null} className="flex btn-toggle">
                                                        <span className="">{item.title}</span>
                                                    </button>
                                                </>
                                            )
                                        }
                                    </>))
                                }



                                {/* <Menu>
                        <MenuHandler>
                            <button className="flex btn-toggle">
                                <span className=" text-sm">Operaciones</span>
                            </button>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem>{' '}</MenuItem>
                        </MenuList>
                    </Menu> */}
                                {/* <Menu>
                        <MenuHandler>
                            <button className="flex btn-toggle">
                                <span className=" text-sm">Productos</span>
                            </button>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem>Lineas</MenuItem>
                            <MenuItem onClick={() => navigate("almacen/articulos")}>
                                Artículos
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuHandler>
                            <button className="flex btn-toggle">
                                <span className=" text-sm">Informes</span>
                            </button>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem>{' '}</MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuHandler>
                            <button className="flex btn-toggle">
                                <span className=" text-sm">Configuración</span>
                            </button>
                        </MenuHandler>
                        <MenuList className="MenuListEx">
                            <MenuItem>Ajustes</MenuItem>

                            <div className="px-3 py-2 font-bold" style={{ fontSize: "13px" }}>
                                Gestión de almacenes
                            </div>

                            <MenuItem className="pl-6">Almacenes</MenuItem>
                            <MenuItem className="pl-6">Tipos de operaciones</MenuItem>

                            <div className="px-3 py-2 font-bold" style={{ fontSize: "13px" }}>
                                Productos
                            </div>

                            <MenuItem className="pl-6">Categorías de productos</MenuItem>
                            <MenuItem className="pl-6">Reglas de abastecimiento</MenuItem>
                        </MenuList>
                    </Menu> */}
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default NavMain