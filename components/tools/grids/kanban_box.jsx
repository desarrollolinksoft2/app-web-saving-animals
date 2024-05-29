import { Tooltip } from "@mui/material";
import { FaRegImage } from "react-icons/fa6";
import "./kanban_box.css";

import { TfiUser } from "react-icons/tfi";
import { BsBuildings } from "react-icons/bs";

import { LuUser } from "react-icons/lu";
import { HiOutlineUser } from "react-icons/hi";

import { RiStarLine } from "react-icons/ri";
import { RiStarFill } from "react-icons/ri";

const Kanban_box = ({ box, item, fnc, index }) => {
  if (item === undefined) return <></>;
  if (box === undefined) return <></>;
  const image = item?.[box?.image] ? item?.[box?.image] : null;
  const uri = image ? image?.[0]?.publicUrl : null;
  // console.log(box.form);
  return (
    <>
      <div
        role="article"
        className="o_kanban_record d-flex flex-grow-1 flex-md-shrink-1 flex-shrink-0"
      >
        <div
          onClick={() => fnc(item, index)}
          className="oe_kanban_card oe_kanban_global_click flex"
        >
          {item["status"] === "I" && (
            <div className="ribbon_card">
              <span>Archivado</span>
            </div>
          )}

          {box.fnc === "fnc_cia_ct_con" && (
            <>
              <div className="c_imageEx_64 self-center">
                {uri ? (
                  <>
                    <img
                      src={uri}
                      className="object-cover object-center imageEx_64"
                    />
                  </>
                ) : (
                  <>
                    <div className="imageEx_64">
                      <div className="flex justify-center items-center w-full h-full">
                        {item["tcon"] === "I" ? (
                          <LuUser className=" w-14 h-14 text-gray-400" />
                        ) : (
                          <BsBuildings className=" w-14 h-14 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="oe_kanban_details ">
                <div className="o_kanban_record_top mb-0 ">
                  <div className="o_kanban_record_headings ">
                    {" "}
                    <strong className="o_kanban_record_title">
                      <span>{item?.[box.title]}</span>
                    </strong>
                  </div>

                  {item?.[box.fav] !== undefined && (
                    <>
                      {item?.fav === true ? (
                        // <LuUser className=" w-14 h-14 text-gray-400" />
                        <Tooltip arrow title="Eliminar de favoritos">
                          <div className="flex w-auto h-max">
                            <RiStarFill
                              style={{ height: "18px", width: "18px" }}
                              color="#f3cc00"
                            />
                          </div>
                        </Tooltip>
                      ) : (
                        // <BsBuildings className=" w-14 h-14 text-gray-400" />
                        <Tooltip arrow title="Añadir a favoritos">
                          <div className="flex w-auto h-max">
                            <RiStarLine
                              style={{ height: "18px", width: "18px" }}
                              color="rgba(55, 65, 81, 0.76)"
                            />
                          </div>
                        </Tooltip>
                      )}
                    </>
                  )}
                </div>

                {item?.tag_eti?.length !== undefined && (
                  <>
                    <div className="w-full o_kanban_tags_section">
                      <div className="d-flex flex-wrap gap-1">
                        {item?.tag_eti?.map((tag, i) => (
                          <>
                            {/* <Tooltip arrow title={item?.dsc_cet_full}> */}
                            <span
                              className="o_tag"
                              style={{ backgroundColor: tag?.color_cet }}
                            >
                              <div className="text-truncate">
                                {tag?.dsc_cet_full}
                              </div>
                            </span>
                            {/* </Tooltip> */}
                          </>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className="w-full">
                  <p className="text-sm mt-1">{item?.[box.subtitle]}</p>{" "}
                  <p className="text-sm mt-1">{item?.[box.desc1]}</p>
                  <p className="text-sm mt-1">{item?.[box.desc2]}</p>
                </div>
              </div>
            </>
          )}

          {box.fnc === "fnc_inv_ct_pdt" && (
            <>
              <div className="oe_kanban_details ">
                <div className="o_kanban_record_top mb-0 ">
                  {item?.[box.fav] !== undefined && (
                    <>
                      {item?.fav === true ? (
                        // <LuUser className=" w-14 h-14 text-gray-400" />
                        <Tooltip arrow title="Eliminar de favoritos">
                          <div className="flex w-auto h-max mr-2">
                            <RiStarFill
                              style={{ height: "18px", width: "18px" }}
                              color="#f3cc00"
                            />
                          </div>
                        </Tooltip>
                      ) : (
                        // <BsBuildings className=" w-14 h-14 text-gray-400" />
                        <Tooltip arrow title="Añadir a favoritos">
                          <div className="flex w-auto h-max mr-2">
                            <RiStarLine
                              style={{ height: "18px", width: "18px" }}
                              color="rgba(55, 65, 81, 0.76)"
                            />
                          </div>
                        </Tooltip>
                      )}
                    </>
                  )}

                  <div className="o_kanban_record_headings">
                    <strong className="o_kanban_record_title">
                      {/* <span>{item?.[box.title]}</span> */}
                      <span>{item?.dsc_pdt}</span>
                    </strong>
                  </div>
                </div>
                <div className="w-full">
                  {item?.ref_interna && (
                    <p className="text-sm mt-1">[{item?.ref_interna}]</p>
                  )}

                  <p className="text-sm mt-1">Precio: {item?.sim_div} {item?.precio_venta}</p>
                  {/* <p className="text-sm mt-1">{item?.[box.desc2]}</p> */}

                  {/* <p className="text-sm mt-1">{item?.[box.subtitle]}</p>{" "}
                  <p className="text-sm mt-1">{item?.[box.desc1]}</p>
                  <p className="text-sm mt-1">{item?.[box.desc2]}</p> */}
                </div>
              </div>

              {uri && (
                <div className="c_imageEx_64 self-center">
                  <img
                    src={uri}
                    className="object-cover object-center imageEx_64"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Kanban_box;
