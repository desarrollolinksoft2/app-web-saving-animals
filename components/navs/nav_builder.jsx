"use client";
import Button from "@mui/material/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import NavMenuList from "../tools/navs/nav_menu_list";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { IoMdSettings } from "react-icons/io";
import { Typography } from "@mui/material";

import Nav_config_con from "./nav_config_con";
import Nav_config_inv from "./nav_config_inv";
import Nav_config_ven from "./nav_config_ven";
import Nav_config_pdv from "./nav_config_pdv";
import Nav_config_fac from "./nav_config_fac";
import Nav_config_aju from "./nav_config_aju";
import pathNavigator from "../tools/navs/path_navigator";

const Nav_builder = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const menuId = searchParams.get("menu");
  const [menu, setMenu] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const route = useRouter();
  const navigate = (path) => {
    route.push(path);
  };

  const changeMenuConfig = (i_menu) => {
    switch (i_menu) {
      case "con":
        setMenu(Nav_config_con);
        break;
      case "inv":
        setMenu(Nav_config_inv);
        break;
      case "ven":
        setMenu(Nav_config_ven);
        break;
      case "fac":
        setMenu(Nav_config_fac);
        break;
      case "aju":
        setMenu(Nav_config_aju);
        break;
      default:
        setMenu(null);
        break;
    }
  };

  useEffect(() => {
    changeMenuConfig(menuId);
  }, [menuId]);

  useEffect(() => {
    if (menu) {
      pathNavigator(pathname,route, searchParams, {config: menu.defaultOption})
      // console.log(menu.defaultOption);
    }
  }, [menu]);

  return (
    <>
      {menu && (
        <>
          <Link
            href={"/web?menu=1"}
            accessKey="h"
            aria-label="Menú de inicio"
            title="Menú de inicio"
            className="o_menu_toggle hasImage"
          >
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
          <div className="mx-2">
            
            <div className="hidden md:flex items-center text-sm">
            
              {menu?.items.map((item, i) =>
                item?.list ? (
                  <NavMenuList key={i} menu={item.title}>
                    {item?.list?.map((subItem, index) =>
                      subItem?.list ? (
                        <>
                          <div className="HeadMenuItem">{subItem.title}</div>

                          {subItem?.list?.map((subSubItem, ind) => (
                            <MenuItem
                              className="MenuItem_N2"
                              key={ind}
                              onClick={
                                subSubItem.path
                                  ? () => navigate(subSubItem.path)
                                  : null
                              }
                            >
                              <ListItemText>{subSubItem.title}</ListItemText>
                            </MenuItem>
                          ))}
                        </>
                      ) : (
                        <MenuItem
                          key={index}
                          onClick={
                            subItem.path ? () => navigate(subItem.path) : null
                          }
                        >
                          <ListItemText>{subItem.title}</ListItemText>
                        </MenuItem>
                      )
                    )}
                  </NavMenuList>
                ) : (
                  <Button
                    key={i}
                    onClick={item.path ? () => navigate(item.path) : null}
                    disableElevation
                    // onClick={() => navigate(item.path)}
                  >
                    <Typography
                      fontSize={"14px"}
                      sx={{ textTransform: "none" }}
                    >
                      {item.title}
                    </Typography>
                  </Button>
                )
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Nav_builder;