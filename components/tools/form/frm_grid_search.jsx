import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { useAppStore } from "@/store/zustand";
import { Chip, FormControl, InputAdornment, OutlinedInput, makeStyles, styled } from "@mui/material";
import { ImSearch } from "react-icons/im";
import Divider from "@mui/material/Divider";
import { FaSortDown } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Menu, MenuItem, Grid } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";

import { VscFilterFilled } from "react-icons/vsc";
import { FaLayerGroup } from "react-icons/fa";
import useUserStore from "@/store/user_store";

import { GrFormCheckmark } from "react-icons/gr";

const StyledChip = styled(Chip)(({ theme })=>({
  borderRadius: 0, // Hace que el Chip sea cuadrado
  backgroundColor: 'rgba(0, 0, 0, 0.08);',
  '& .MuiChip-icon': {
    backgroundColor: 'green', // Color de fondo del icono
    // backgroundColor: theme.palette.background.paper, 
    // borderRadius: '50%', 
    padding: '4px',
    color: 'white', // Color del icono
     // Ajusta la altura del icono para que cubra todo el alto del Chip
    display: 'block ', // Asegura que el icono se centre verticalmente
    // alignItems: 'center', // Centra el icono verticalmente
    margin: 0, // Elimina el margen del icono
    width: '25px',
    height: '100%'
  },
  '& .MuiChip-iconColorPrimary': {
    backgroundColor: 'purple', // Otro color de fondo para el icono
    // backgroundColor: theme.palette.primary.main,
  },
  '&.MuiChip-colorPrimary': {
    backgroundColor: 'rgba(0, 0, 0, 0.08);', // Sobrescribe el color de fondo cuando el Chip tiene el color "primary"
    color: 'black', // Cambia el color del texto cuando el Chip tiene el color "primary"
  },
  // '& .MuiChip-iconColorGreen': {
  //   backgroundColor: 'green', 
  // },
  
  height: '30%'
}))

const FrmGridSearch = ({ config }) => {

  const [searchText, setSearchText] = useState("");
  // const [filter, setFilter] = useState("");
  const filters = useUserStore((state) => state.filters);
  const setFilters = useUserStore((state) => state.setFilters);
  // const groupedList = useAppStore((state) => state.groupedList);
  const listGroupBy = useAppStore((state) => state.listGroupBy);
  const setListGroupBy = useAppStore((state) => state.setListGroupBy);
  // const setGroupedList = useAppStore((state) => state.setGroupedList);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [chips, setChips] = useState([]);
  const [listFilters, setListFilters] = useState([]);
  const [groupedList, setGroupedList] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFilterChange = (event) => {};

  const updateListFilters = () => {
    setListFilters([...filters] || []);
  }

  const updateListGrupBy = () => {
    const listGroups = listGroupBy.map((item)=>{
      let group = config?.group_by?.[0]?.list.find((f)=>f.key===item) || null;
      return group?.title
    })
    setGroupedList([...listGroups] || []);
  }

  const chipLabelList =(list, icon)=>{
    const string = list.join(icon)
    return string
  }

  const handleChangeGroup = (key) => {
    let isSelected = listGroupBy.find((f) => f === key);
    if (isSelected) {
      setListGroupBy(listGroupBy.filter((f) => key !== f));
    } else {
      setListGroupBy([...listGroupBy, key]);
    }
  }

  /*
  const handleFilters = (key) => {
    console.log(key)
    let nfilter = { idFiltro: key }
    console.log(filters)
    let isSelected = filters.find(item => item.idFiltro === key) || null//filter.includes(key)
    console.log(isSelected)
    if (isSelected) {
      setFilters(filters.filter((item) => item.idFiltro !== key))

    } else {
      setFilters([...filters, nfilter])

    }
  };
*/

  const handleFilters = (key) => {
    let nfilter = ["filter_cf", key];
    let isSelected = filters.find((f) => nfilter[1] === f[1]);

    builderFilterGroups(filters, config?.filters)

    if (isSelected) {
      setFilters(filters.filter((f) => nfilter[1] !== f[1]));
    } else {
      setFilters([...filters, nfilter]);
    }
    // console.log(filters);
  };

  const builderFilterGroups=(keys, listFilters)=>{

    const groups =[]

    listFilters.forEach((sublist, index)=>{
      sublist.list.forEach((item, i)=>{
        
        keys.forEach(key=>{
          if(key[1]===item.key){
            groups[index].push(item)
          }
        })


      })

    })

    console.log(groups)
  }

  const builderListChips = () => {
    const listFilters = filters.map((item) => {

    });
    const list = []
  }

  useEffect(() => {
    updateListFilters();
  }, [filters])

  useEffect(()=>{
    updateListGrupBy();
  },[listGroupBy])

  useEffect(() => {
    setFilters([]);
    updateListFilters();
    updateListGrupBy();
  }, []);

  return (
    <>
      <Paper
        variant="outlined"
        className="w-full flex items-center InputSearchEx"
      >
        <SearchIcon sx={{ p: "2px", opacity: 0.6 }} />
        {listFilters.length > 0 &&
            <StyledChip
            label={chipLabelList(listFilters, ' o ')}
            
            deleteIcon={<IoClose  style={{width: '12px', color: 'black'}}/>}
            onDelete={()=>setFilters([])}
            icon={<FaFilter />}
            size="small"
            color="primary"
            className="ml-1"
            />
        }
        {groupedList.length > 0 &&
            <StyledChip
            label={chipLabelList(groupedList, ' > ')}
            // onDelete={() => {
            //   setChips(chips.filter((item, i) => i !== index));
            // }}
            deleteIcon={<IoClose  style={{width: '12px'}}/>}
            icon={<FaLayerGroup />}
            onDelete={()=>setListGroupBy([])}
            size="small"
            />
        }
        <InputBase
          sx={{ flex: 1 }}
          placeholder="Buscar  ..."
          inputProps={{ "aria-label": "buscar ..." }}
          fullWidth
        />

        {config?.filters && (
          <>
            <Divider sx={{ height: 26 }} orientation="vertical" />
            <IconButton
              onClick={handleClick}
              color="primary"
              aria-label="filtros"
              className="flex items-center"
            >
              <FaSortDown className="w-4 h-4" />
            </IconButton>
            <Menu
              className="MenuSearchEx"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Grid container className="MenuSearchEx_container">
                <Grid item xs={6} className="px-4">
                  <div className="MenuHead">
                    <div className="MenuHeadIcon">
                      <VscFilterFilled color="RGBA(113, 75, 103, 1)" />
                    </div>
                    <div className="MenuText">Filtros</div>
                  </div>

                  {config?.filters.map(
                    (item, i) =>
                      item?.list && (
                        <>
                          {item?.list?.map((subItem, index) => {
                            
                            // let isSelected = filters.some((item) => item.idFiltro === subItem.key) || null;
                            let isSelected = filters.find((f) => f[1] === subItem.key) || null;

                            return (
                              <MenuItem
                                key={index}
                                onClick={() => handleFilters(subItem.key)}
                              >
                                <span style={{ width: "14px" }}>
                                  {
                                    isSelected && (
                                      <>
                                        <GrFormCheckmark
                                          className="text-cyan-600"
                                          style={{ fontSize: "18px" }}
                                        />
                                      </>
                                    )
                                  }
                                </span>
                                <label>
                                  {/* <input value={filters?.some(item=>item.idFiltro===subItem.key)} type="checkbox" /> */}
                                  {/* <input type="checkbox" /> */}
                                  <span />
                                  <span
                                    className={`MenuItemText ${
                                      isSelected && " font-medium"
                                    }`}
                                  >
                                    {subItem.title}
                                  </span>
                                </label>
                              </MenuItem>
                            );
                          })}
                          {i < config?.filters.length - 1 && (
                            <Divider orientation="horizontal" flexItem />
                          )}
                        </>
                      )
                  )}
                </Grid>

                <Divider orientation="vertical" flexItem />

                <Grid item xs={6} className="px-4">
                  <div className="MenuHead">
                    <div className="MenuHeadIcon">
                      <FaLayerGroup color="RGBA(1, 126, 132, 1)" />
                    </div>
                    <div className="MenuText">Agrupar por</div>
                  </div>

                  {config?.group_by.map(
                    (item, i) =>
                      item?.list && (
                        <>
                          {item?.list?.map((subItem, index) => {
                            let isSelected = listGroupBy.find((f) => f === subItem.key);
                            return (
                              <MenuItem onClick={() =>handleChangeGroup(subItem.key)}>
                                <span style={{ width: "14px" }}>
                                {
                                    isSelected && (
                                      <>
                                        <GrFormCheckmark
                                          className="text-cyan-600"
                                          style={{ fontSize: "18px" }}
                                        />
                                      </>
                                    )
                                  }
                                </span>
                                <label>
                                  <span />
                                  <span className={`MenuItemText ${
                                      isSelected && " font-medium"
                                    }`}>
                                    {subItem.title}
                                  </span>
                                </label>
                              </MenuItem>
                            )
                          })}
                          {i < config?.group_by.length - 1 && (
                            <Divider orientation="horizontal" flexItem />
                          )}
                        </>
                      )
                  )}
                </Grid>
              </Grid>
            </Menu>
          </>
        )}
      </Paper>
    </>
  );
};
export default FrmGridSearch;
