import { useAppStore } from "@/store/zustand";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import { ImSearch } from "react-icons/im";
import Divider from '@mui/material/Divider';
import { FaSortDown } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';
// import { MegaMenu } from 'primereact/megamenu';
// import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

// const menuFilters = [
//   {
//     label: 'Filtros',
//     icon: 'pi pi-fw pi-filter',
//     items: [
//       [
//         {
//           label: 'Filtros',
//           items: [
//             { label: 'personas' },
//             { label: 'empresas' }
//           ]
//         }
//       ],
//       [{
//         label: 'Agrupar',
//         items: [
//           { label: 'personas' },
//           { label: 'empresas' }
//         ]
//       }]
//     ]
//   }
// ]

const Frm_web_options_list_search = () => {
  const globalFilter = useAppStore((state) => state.globalFilter);
  const setGlobalFilter = useAppStore((state) => state.setGlobalFilter);

  return (
    <>
      <FormControl variant="outlined" className="w-full InputSearchEx">
        <OutlinedInput
          className="w-full text-sm"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar ..."
          size="small"
          startAdornment={
            <InputAdornment position="start">
              <ImSearch />
            </InputAdornment>
          }
        />


      </FormControl>
    </>
  );
};

export default Frm_web_options_list_search;
