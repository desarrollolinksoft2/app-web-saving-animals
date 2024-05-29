"use client";
import { useEffect, useRef, useState } from "react";
import AutocompleteControlled from "../tools/inputs/autocomplete_controlled";
import RadioButtonControlled from "../tools/inputs/radio-button-controlled";
import TextControlled from "../tools/inputs/text_controlled";
import SelectControlled from "../tools/inputs/select_controlled";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import useAppStore from "@/store/zustand";
import ImageInput from "../tools/inputs/image_input";
import { fncExecute } from "@/data";
import Grid_list from "../grids/grid_list";
import { set } from "react-hook-form";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import pathNavigator from "../tools/navs/path_navigator";
import { capitalizar } from "../tools/functions/capitalizer";
import { Tooltip } from "@mui/material";
import useUserStore from "@/store/user_store";
import GridListEditable from "../grids/grid_list_editable";
import useHasScroll from "../hooks/has_scroll";
import useWindowWidth from "../hooks/window_width";
import MultiSelect from "../tools/inputs/multi_select";
import MultiSelectObject from "../tools/inputs/multi_select_objects";
import Chip from "@mui/material/Chip";
import GridInput from "../grids/grid_input";
import GridInputTs from "../grids/grid_input_b";
import { DataExample } from "../grids/data_grid_example";
import AutocompleteTable from "../tools/inputs/autocomplete_table";
import InputTextTable from "../tools/inputs/input_text_table";
import SelectTable from "../tools/inputs/select_table";
import MultiSelecTable from "../tools/inputs/multi_select_table";

const required = {
  required: { value: true, message: "Este campo es requerido" },
};

export function Frm_bar_buttons({ control, errors }) {
  return (
    <>
    <button className="btn btn-primary">Confirmar</button>
    <button className="btn btn-secondary">Vista previa</button>
    <button className="btn btn-secondary">Cancelar</button>
    </>
  );
}

export function Frm_bar_status({ control, errors }) {
  return (
    <>
    <div className="c_bar_step " data-status="B">
        <div className="bar-step ">Borrador</div>
    </div>
    <div className="c_bar_step active" data-status="P">
        <div className="bar-step">Publicado</div>
    </div>
    <div className="c_bar_step" data-status="C">
        <div className="bar-step">Cancelado</div>
    </div>
    </>
  );
}

export function FrmTitle({ control, errors, editConfig }) {
  const frmState = useAppStore((state) => state.frmState);
  const style = {
    fontSize: 26,
    lineHeight: "38px",
    color: "#111827",
  };
  return (
    <>
      <TextControlled
        name={"numero"}
        control={control}
        rules={required}
        errors={errors}
        placeholder={"Borrador"}
        style={style}
        multiline={true}
        editConfig={{ frmState: frmState, config: editConfig }}
      />
    </>
  );
}

export function FrmMiddle({ setValues, watch, control, errors, editConfig }) {
  const createOptions = useAppStore((state) => state.createOptions);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const frmState = useAppStore((state) => state.frmState);
  const executeFnc = useAppStore((state) => state.executeFnc);

  const [Clientes, setClientes] = useState([]);

  const cargaData = () => {
      
    if (frmItemSelected['id_con_cliente']) {
      setClientes([{
        value: frmItemSelected['id_con_cliente'],
        label: frmItemSelected['dsc_con_cliente']
      }])
    }

  };


// =================================================================== inicio 1
  const cargaData_Clientes = async () => {
    let lClientes = await createOptions('fnc_cia_ct_con', "dsc_con", "id_con")
    setClientes(lClientes)
  }

  const fnc_enlace = (value) => {
    // setFrmSaveExpress(true)
    // let nroute = {
    //   name: watch('dsc_con'),
    //   path: searchParams.toString(),
    //   list: frmList,
    //   index: frmListIndex
    // }
    // setAppRoutes([...appRoutes, nroute])
    // setFrmList([{ 'id_con': value }])
    // setFrmListIndex(0)
    // setFrmItemSelected({ fnc_name, idName: 'con.id_con', value })

    // pathNavigator(pathname, route, searchParams, { view_type: "form", id: value, config: '101'});

    frmFncEnlaceInterno({
      currentName: watch('dsc_con'),
      currentPath: searchParams.toString(),
      nItem: { 'id_con': value },
      nItemSelected: { fnc_name, idName: 'con.id_con', value },
      fnc_next: () => {
        pathNavigator(pathname, route, searchParams, { view_type: "form", id: value, config: '101' });
      }
    })
  }

  const fnc_create = async (value) => {
    // let nvalue = capitalizar(value)
    // if (nvalue) {
    let res = await executeFnc(fnc_name, "i", { dsc_con: value, tcon: "C" })

    if (res?.id_con) {
      // setGridData(fnc_name)
      await cargaData()
      setValues('id_con_rel', res.id_con)
      // return res.id_con
    } else {
      toast.error('Error al crear la empresa')
    }
    // }
  }

// =================================================================== fin 1

  useEffect(() => {
    if (frmItemSelected) {
      
      // cargaData_Cliente();
      cargaData();

    }
  }, [frmItemSelected]);

  return (
    <>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">
            Cliente
            <Tooltip
              arrow
              title="El número registrado de la empresa. Úselo si es diferente al NIF. Debe ser único para todos los contactos del mismo país."
            >
              <sup className="text-info p-1">?</sup>
            </Tooltip>
          </label>
        </div>
        <div className="o_cell">
          <div className="o_field">

            <AutocompleteControlled
              name={"id_con_cliente"}
              placeholder={""}
              control={control}
              errors={errors}
              options={Clientes}
              fnc_create={fnc_create}
              createOpt={true}
              searchOpt={true}
              editOpt={true}
              // frmSearch={() => (<FrmSearch />)}
              fnc_loadOptions={cargaData_Clientes}
              enlace={true}
              fnc_enlace={fnc_enlace}
              editConfig={{ frmState: frmState, config: editConfig }}
            />

          </div>
        </div>
      </div>
    </>
  );
}

export function FrmMiddleRight({ control, errors,editConfig }) {
  const frmState = useAppStore((state) => state.frmState);
  const createOptions = useAppStore((state) => state.createOptions);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const executeFnc = useAppStore((state) => state.executeFnc);

  const [Divisas, setDivisas] = useState([]);
  const [CondicionesPago, setCondicionesPago] = useState([]);

  const cargaData = () => {

    if (frmItemSelected['id_div']) {
      setDivisas([{
        value: frmItemSelected['id_div'],
        label: frmItemSelected['dsc_div']
      }])
    }

    if (frmItemSelected['id_cdp']) {
      setCondicionesPago([{
        value: frmItemSelected['id_cdp'],
        label: frmItemSelected['dsc_cdp']
      }])
    }

  };

  const cargaData_Divisas = async () => {
    let lDivisas = await createOptions('fnc_con_ct_div', "dsc_div", "id_div")
    setDivisas(lDivisas)
  }

  const cargaData_CondicionesPago = async () => {
    let lCondicionesPago = await createOptions('fnc_fac_ct_cdp', "dsc_cdp", "id_cdp")
    setCondicionesPago(lCondicionesPago)
  }

  useEffect(() => {
    if (frmItemSelected) {
      cargaData();
    }
  }, [frmItemSelected]);

  return (
    <>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Fecha de Factura</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <TextControlled
              name={"pt_trab"}
              control={control}
              errors={errors}
              multiline={true}
              placeholder={""}
              editConfig={{ frmState: frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Referencia de pago</label>
        </div>
        <div className="o_cell">
          <div className="o_field">
            <TextControlled
              name={"ref_pago"}
              control={control}
              errors={errors}
              placeholder={""}
              editConfig={{ frmState: frmState, config: editConfig }}
            />
          </div>
        </div>
      </div>
      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Fecha de Vencimiento</label>
        </div>
        <div className="o_cell">
          <div className="o_field">

            <div className="w-full flex">
                <div name="invoice_fecha_ven" className="w-2/6">
    
                  <TextControlled
                    name={"movil"}
                    control={control}
                    errors={errors}
                    placeholder={""}
                    editConfig={{ frmState: frmState, config: editConfig }}
                  /> 

                </div>
                
                <span className="grow-0 o_form_label mx-3 oe_edit_only">o</span>
                
                <div name="invoice_cdp" className="w-4/6">

                  <AutocompleteControlled
                    name={"id_cdp"}
                    placeholder={"Término de pago"}
                    control={control}
                    errors={errors}
                    options={CondicionesPago}
                    // fnc_create={fnc_create}
                    createOpt={true}
                    searchOpt={true}
                    editOpt={true}
                    // frmSearch={() => (<FrmSearch />)}
                    fnc_loadOptions={cargaData_CondicionesPago}
                    enlace={true}
                    // fnc_enlace={fnc_enlace}
                    editConfig={{ frmState: frmState, config: editConfig }}
                  />

                </div>
            </div>

          </div>
        </div>
      </div>

      <div className="d-sm-contents">
        <div className="o_cell o_wrap_label">
          <label className="o_form_label">Divisa</label>
        </div>
        <div className="o_cell">
          <div className="o_field">

            <AutocompleteControlled
              name={"id_div"}
              placeholder={""}
              control={control}
              errors={errors}
              options={Divisas}
              // fnc_create={fnc_create}
              createOpt={true}
              searchOpt={true}
              editOpt={true}
              // frmSearch={() => (<FrmSearch />)}
              fnc_loadOptions={cargaData_Divisas}
              enlace={true}
              // fnc_enlace={fnc_enlace}
              editConfig={{ frmState: frmState, config: editConfig }}
            />

          </div>
        </div>
      </div>

    </>
  );
}

export function FrmTab0({ control, errors, editConfig }) {
  const frmState = useAppStore((state) => state.frmState);
  const divRef = useRef(null);
  const [ref, hasScroll] = useHasScroll(divRef);
  const [productos, setProductos] = useState([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const route = useRouter();
  const createOptions = useAppStore((state) => state.createOptions);
  const frmFncEnlaceInterno = useAppStore((state) => state.frmFncEnlaceInterno);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const [editCell, setEditCell] = useState(null);
  const [data, setData] = useState(DataExample);
  const [updateData, setUpdateData] = useState(false);
  // const windowWidth = useWindowWidth();
  const idTableRow = "id_lin";

  const handleOnChangeProduct = (rowId, columnId, option) => {
    // console.log(rowId)
    // console.log(columnId)
    // console.log(value)
    // console.log(option)
    
    const newData = [...data];
    // console.log(newData)
    // console.log(newData[rowId][columnId])
    newData[rowId][columnId] = option?.value;

    ///personalizar comportamiento
    newData[rowId]["etiqueta"] = "nueva eqtiqueta";
    newData[rowId]["precio_imp_excl"] = newData[rowId]["cantidad"] * newData[rowId]["precio"] ;
    //actualizar Tabla
    setData(newData);
  };

  const handleOnChange = (rowId, columnId, value) => {
    const newData = [...data];
    // console.log(rowId)
    // console.log(columnId)
    // console.log(value)
    
    newData[rowId][columnId] = value;
    ///actualizar precio
    newData[rowId]["precio_imp_excl"] = newData[rowId]["cantidad"] * newData[rowId]["precio"] ;
    //actualizar Tabla
    setData(newData);
  }

  const cargaSelect = () => {
    return [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
      { value: "6", label: "6" },
      { value: "7", label: "7" },
      { value: "8", label: "8" },
      { value: "9", label: "9" },
      { value: "10", label: "10" },
    ]
  }



  const cargaProductos = async () => {
    return await createOptions("fnc_inv_ct_pdt", "dsc_pdt", "id_pdt");
  };

  const fnc_enlaceProducto = async (value) => {
    // console.log('enviando a enlace interno')
    // console.log(frmItemSelected)

    frmFncEnlaceInterno({
      currentName: 'numero',//frmItemSelected["numero"], //|| 'nuevo',
      currentPath: searchParams.toString(),
      nItem: { id_pdt: value },
      nItemSelected: {
        fnc_name: "fnc_inv_ct_pdt",
        idName: "pdt.id_pdt",
        value,
      },
      fnc_next: () => {
        pathNavigator(pathname, route, searchParams, {
          view_type: "form",
          id: value,
          config: "301",
        });
      },
    });
  };

  const dataConfig = {
    fnc_name: "fnc",

    grid: {
      idRow: idTableRow,
      col_name: "dsc_con",
      columns: [
        {
          header: "Producto",
          accessorKey: "id_pdt",
          align: "left",
          size: 150,
          cell: ({ row, column }) => {
            return (
              <AutocompleteTable
                row={row}
                column={column}
                onChange={setUpdateData}
                fnc_options={cargaProductos}
                fnc_enlace={fnc_enlaceProducto}
              />
            );
          },
        },
        {
          header: "Etiqueta",
          accessorKey: "etiqueta",
          align: "left",
          size: 150,
          cell: ({ row, column }) => {
            return (
              <InputTextTable
                row={row}
                column={column}
                onChange={setUpdateData}
              />
            );
          },
        },
        {
          header: "Cantidad",
          accessorKey: "cantidad",
          align: "right",
          size: 80,
          cell: ({ row, column }) => {
            return (
              <InputTextTable
                type="number"
                row={row}
                column={column}
                onChange={setUpdateData}
              />
            );
          },
        },
        {
          header: "UdM",
          accessorKey: "id_udm",
          size: 100,
        },
        {
          header: 'select',
          accessorKey: 'selectOpt',
          size: 60,
          cell: ({ row, column }) => {
            return (
            <SelectTable
              row={row}
              column={column}
              fnc_options={cargaSelect}
              onChange={setUpdateData}
            />)
          }
        }
        ,
        {
          header: "Precio",
          accessorKey: "precio",
          align: "right",
          size: 80,
          cell: ({ row, column }) => {
            return (
              <InputTextTable
                type="number"
                row={row}
                column={column}
                onChange={setUpdateData}
              />
            );
          },
        },
        {
          header: "Impuestos",
          accessorKey: "tag_imp",
          cell: ({ row, column }) => {
            return (
              <MultiSelecTable
                row={row}
                column={column}
                onChange={setUpdateData}
                fnc_options={()=>[
                  { value: "1", label: "18% IGV", color: "green" },
                  { value: "2", label: "0% ISC", color: "red" },
                ]}
              />
            );
          }
        },
        {
          header: "Impuestos Excl.",
          accessorKey: "precio_imp_excl",
          align: "right",
          size: 80,
        },
        {
          header: "Impuestos incl.",
          accessorKey: "precio_imp_incl",
          align: "right",
          size: 80,
        },
      ],
    },
  };

  const fnc_renderTags = (value, getTagProps) => {
    return value.map((option, index) => (
      <Chip
        // variant="outlined"
        className="text-gray-100"
        label={option.label}
        size="small"
        {...getTagProps({ index })}
        style={{ backgroundColor: option.color, color: "white" }}
      />
    ));
  };

  useEffect(()=>{
    if(updateData){
      if(typeof updateData.option === 'object'){
        handleOnChangeProduct(updateData.rowId, updateData.columnId, updateData.option)
      }
      if(typeof updateData.option === 'string' || typeof updateData.option === 'number'){
        handleOnChange(updateData.rowId, updateData.columnId, updateData.option)
      }
    }
  },[updateData])

  // useEffect(() => {
  //   console.log("productos", productos);
  // }, [productos]);

  useEffect(() => {
    cargaProductos();
  }, []);

  return (
  <>
    <div
      className="o_list_renderer o_renderer table-responsive table_editable"
      ref={divRef}
    >
      {/* <MultiSelectObject name={'multivalues'} control={control} renderTags={fnc_renderTags} options={options} /> */}
      {/* <GridListEditable config={dataConfig}  refcont={divRef} width={windowWidth} hasScroll={hasScroll}  /> */}
      {/* <GridInput config={dataConfig} /> */}
      <GridInputTs
        config={dataConfig}
        data={data}
        setData={setData}
      />
    </div>

    <div className="w-full mt-4 flex gap-7">
      <div className="w-4/6">
        <div className="w-full">
          <TextControlled
            name={"terminos_condiciones"}
            control={control}
            errors={errors}
            multiline={true}
            className={"InputNoLineEx w-full"}
            placeholder={"Términos y condiciones"}
            editConfig={{ frmState: frmState, config: editConfig }}
          />
        </div>
      </div>

      <div className="w-2/6 flex justify-end">
        <div
          name="tax_totals"
          className="o_field_widget o_readonly_modifier o_field_account-tax-totals-field"
        >
          <table className="totales">
            <tbody>
              <tr>
                <td className="o_td_label o_dsc">
                  <label className="o_form_label o_tax_total_label">
                    Importe sin impuestos
                  </label>
                </td>

                <td className="o_td_label o_sim">
                  <span name="Importe sin impuestos">S/</span>
                </td>

                <td className="o_list_monetary o_imp">
                  <span name="Importe sin impuestos">15,070.00</span>
                </td>
              </tr>

              <tr>
                <td className="o_td_label o_dsc">
                  <label className="o_form_label o_tax_total_label">IGV</label>
                </td>

                <td className="o_td_label o_sim">
                  <span name="Importe sin impuestos">S/</span>
                </td>

                <td className="o_list_monetary o_imp">
                  <span className="o_tax_group_amount_value o_list_monetary">
                    3,60
                  </span>
                </td>
              </tr>

              <tr>
                <td className="o_td_label o_dsc">
                  <label className="o_form_label o_tax_total_label">Total</label>
                </td>

                <td className="o_td_label o_sim">
                  <span name="Importe sin impuestos">S/</span>
                </td>

                <td className="o_list_monetary o_imp">
                  <span name="amount_total" className="o_separator">
                    18,783.33
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
  );
}

export function FrmTab1({ watch, control, errors, editConfig }) {
  const createOptions = useAppStore((state) => state.createOptions);
  const frmItemSelected = useAppStore((state) => state.frmItemSelected);
  const frmState = useAppStore((state) => state.frmState);
  const setFrmItemSelected = useAppStore((state) => state.setFrmItemSelected);
  const setFrmSaveExpress = useAppStore((state) => state.setFrmSaveExpress);
  const frmList = useAppStore((state) => state.frmList);
  const frmListIndex = useAppStore((state) => state.frmListIndex);
  const appRoutes = useAppStore((state) => state.appRoutes);
  const setAppRoutes = useAppStore((state) => state.setAppRoutes);
  const setFrmList = useAppStore((state) => state.setFrmList);
  const setFrmListIndex = useAppStore((state) => state.setFrmListIndex);
  const frmFncEnlaceInterno = useAppStore((state) => state.frmFncEnlaceInterno);
  const route = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [Cias, setCias] = useState([]);
  const [Pfis, setPfis] = useState([]);

  const cargaData_Cias = async () => {
    let lCias = await createOptions('fnc_cia_ct_cia', "dsc_cia", "id_cia")
    setCias(lCias)
  }

  const cargaData_Pfis = async () => {
    let lPfis = await createOptions('fnc_con_ct_pfi', "dsc_pfi", "id_pfi")
    setPfis(lPfis)
  }
  
  const cargaData = () => {

    if(frmItemSelected?.['id_cia']){
      setCias([{
           value: frmItemSelected['id_cia'],
           label: frmItemSelected['dsc_cia']
      }])
    }
    
    if(frmItemSelected?.['id_pfi']){
      setPfis([{
           value: frmItemSelected['id_pfi'],
           label: frmItemSelected['dsc_pfi']
      }])
    }

  };

  useEffect(() => {
    cargaData();
  }, []);

  /*
  useEffect(() => {
    if (frmItemSelected) {
      cargaData();
    }
  }, [frmItemSelected]);
  */


  return (
    <>
      <div className="o_group mt-4">
        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
            <div className="g-col-sm-2">
              <div className="o_horizontal_separator mt-6 mb-4 text-uppercase fw-bolder small">
              Factura
              </div>
            </div>

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Referencia del cliente</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <TextControlled
                    name={"ref_cliente"}
                    control={control}
                    errors={errors}
                    placeholder={""}
                  />
                </div>
              </div>
            </div>

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Vendedor</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <AutocompleteControlled
                    name={"id_ldp"}
                    control={control}
                    errors={errors}
                    placeholder={""}
                    // options={tfas}
                    // fnc_loadOptions={cargaTarifas}
                    editConfig={{ frmState: frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Equipo de ventas</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <AutocompleteControlled
                    name={"id_ldp"}
                    control={control}
                    errors={errors}
                    placeholder={""}
                    // options={tfas}
                    // fnc_loadOptions={cargaTarifas}
                    editConfig={{ frmState: frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Banco destinatario</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <AutocompleteControlled
                    name={"id_ldp"}
                    control={control}
                    errors={errors}
                    placeholder={""}
                    // options={tfas}
                    // fnc_loadOptions={cargaTarifas}
                    editConfig={{ frmState: frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>
          
            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Fecha de entrega</label>
              </div>
              <div className="o_cell">
                <div className="o_field">
                  <TextControlled
                    name={"cod_barras"}
                    control={control}
                    errors={errors}
                    placeholder={""}
                    editConfig={{ frmState: frmState, config: editConfig }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="o_inner_group grid">
            <div className="g-col-sm-2">
              <div className="o_horizontal_separator mt-6 mb-4 text-uppercase fw-bolder small">
                Contabilidad
              </div>
            </div>

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Empresa</label>
              </div>
              <div className="o_cell">
                <div className="o_field">

                  <AutocompleteControlled
                    name={"id_cia"}
                    placeholder={""}
                    control={control}
                    errors={errors}
                    options={Cias}
                    // fnc_create={fnc_create}
                    createOpt={true}
                    searchOpt={true}
                    editOpt={true}
                    // frmSearch={() => (<FrmSearch />)}
                    fnc_loadOptions={cargaData_Cias}
                    enlace={true}
                    // fnc_enlace={fnc_enlace}
                    editConfig={{ frmState: frmState, config: editConfig }}
                  />

                </div>
              </div>
            </div>

            <div className="d-sm-contents">
              <div className="o_cell o_wrap_label">
                <label className="o_form_label">Posición fiscal</label>
              </div>
              <div className="o_cell">
                <div className="o_field">

                  <AutocompleteControlled
                    name={"id_pfi"}
                    placeholder={""}
                    control={control}
                    errors={errors}
                    options={Pfis}
                    // fnc_create={fnc_create}
                    createOpt={true}
                    searchOpt={true}
                    editOpt={true}
                    // frmSearch={() => (<FrmSearch />)}
                    fnc_loadOptions={cargaData_Pfis}
                    enlace={true}
                    // fnc_enlace={fnc_enlace}
                    editConfig={{ frmState: frmState, config: editConfig }}
                  />

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

// export function Frm_footer({ control, errors }) {
//   return (
//     <>
//     </>
//   );
// }


