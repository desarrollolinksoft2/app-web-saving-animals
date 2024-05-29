import { fncExecute } from "@/data";
import { toast } from "sonner";
import useUserStore from "./user_store";

const createDataSlice = (set, get) => ({
  dataError: null,
  ubigeo: {
    departamentos: [],
    provincias: [],
    distritos: [],
    paises: [],
  },
  setDataUbigeo: async (config) => {
    let Dpt = config.dpt;
    let Prv = config.prv;
    let Dtr = config.dtr;
    let Pais = config.pais;
    let dpts = await get().createOptions(Dpt.fnc_name, Dpt.label, Dpt.value);
    let prvs = await get().createOptions(Prv.fnc_name, Prv.label, Prv.value);
    let dtrs = await get().createOptions(Dtr.fnc_name, Dtr.label, Dtr.value);
    let paises = await get().createOptions(
      Pais.fnc_name,
      Pais.label,
      Pais.value
    );
    set((state) => ({
      ubigeo: (state.ubigeo = {
        departamentos: dpts,
        provincias: prvs,
        distritos: dtrs,
        paises,
      }),
    }));
  },
  createOptions: async (fnc_name, labelProp, valueProp, filters = []) => {
    set((state) => ({ dataError: (state.dataError = null) }));
    try {
      var res = await get().executeFnc(fnc_name, "s", null);
      if (res) {
        for (const f of filters) {
          if (f.exclude) {
            res = res.filter((item) => item[f.filterBy] !== f.filterValue);
          } else {
            res = res.filter((item) => item[f.filterBy] === f.filterValue);
          }
        }
        // if (filterBy && filterValue) {
        return res.map((item) => ({
          label: item[labelProp],
          value: item[valueProp],
          ...item,
        }));
        // }

        // return res.map(item => ({
        //     label: item[labelProp],
        //     value: item[valueProp],
        //     ...item
        // }))
      }
    } catch (e) {
      // console.log(e)
      set((state) => ({ dataError: (state.dataError = e) }));
    }
  },
  executeFnc: async (fnc_name, action, params) => {
    // console.log(fnc_name)
    // console.log(action)
    // console.log(params)
    set((state) => ({ dataError: (state.dataError = null) }));

    try {
      let cod_cia = useUserStore
        .getState()
        .userEmpSelected.map((item) => item.id_cia)
        .join(",");

      if (!fnc_name) return;
      if (
        useUserStore.getState().userData ||
        typeof useUserStore.getState().userData === "undefined"
      ) {
        if (!action) return;
      }
      // console.log(fnc_name)
      // console.log(useUserStore.getState()?.userData?.id_gpo)
      // console.log(useUserStore.getState()?.userData?.id_usu)
      // console.log(action)
      // console.log(cod_cia)
      // console.log(params || [])

      const res = await fncExecute(
        fnc_name,
        useUserStore.getState()?.userData?.id_gpo,
        useUserStore.getState()?.userData?.id_usu,
        action,
        cod_cia,
        (params = params) //|| useUserStore.getState().filters
      );

      const { data, error } = JSON.parse(res);

      console.log("Pasa por: fncExecute");
      // console.log(res)
      // console.log(data)
      // console.log(error)

      if (data) {
        let type = data[0].oj_info.type;
        let code = data[0].oj_info.code;
        let message = "";
        // let detail = data[0].oj_info.detail

        // let title = code > 204 ? 'Ocurrió un problema' : 'Acción completada'
        // let status = code > 204 ? 'error' : 'success'

        let title = "";
        let status = "";

        if (type === "success") {
          title = "Acción completada";
          status = "success";
          message = data[0].oj_info.message;
        } else if (type === "error") {
          title = "Ocurrió un problema";
          status = "error";
          message = `Limitación: ${data[0].oj_info.detail !== "" ? data[0].oj_info.detail : data[0].oj_info.message}`;

          toast[status](title, { description: message });
        }

        // toast[status](title, {description: message})

        // if (code > 200) {
        //     toast[status](title, {
        //         description: `${code}: ${message}`
        //     })
        // }

        if (data[0].oj_data === null) {
          return data[0].oj_info;
        }
        // console.log(data)
        return data[0].oj_data;
      } else {
        // console.log(error)
        set((state) => ({ dataError: (state.dataError = error) }));
      }
    } catch (e) {
      set((state) => ({ dataError: (state.dataError = e) }));
    }
  },
});

export default createDataSlice;
