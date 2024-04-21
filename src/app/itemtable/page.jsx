"use client";
import React, { useEffect, useRef, useState } from "react";
import ItemModel from "../../components/add/ItemModel";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItem } from "@/redux/slices/item";
import Api from "@/config/api";
import { notifyError, notifySuccess } from "../../components/toastify/toastify";
import { useRouter } from "next/navigation";
import arrow from "@/assets/photos/control.png";
import Folder from "@/assets/photos/Folder.png";
import logo from "@/assets/photos/logo.jpg";

const itemTable = () => {
  const Menus = [{ title: "Products ", href: "/itemtable", src: Folder.src }];

  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector((state) => state.item.value.data);
  const [data, setData] = useState(new Map());
  const [foucedItem, setFoucedItem] = useState(new Map());
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState(0);
  const [itemEdits, setItemEdits] = useState([]);
  const lastChangedInputRef = useRef(null);

 

  console.log(data);

  useEffect(() => {
    dispatch(fetchAllItem(page));
    setData()
  }, [page, dispatch]);

  
  useEffect(() => {
    if (items) {
      const edits = items.reduce((acc, item) => {
        acc[item.id] = { ...item };
        return acc;
      }, {});
      setItemEdits(edits);
    }
  }, [items]);

  const handleInputChange = (id, field, value) => {
    const updatedItems = {  ...itemEdits , [id] : { ...itemEdits[id], [field]: value, }, };
    setItemEdits(updatedItems);
    lastChangedInputRef.current = id;
   
    setFoucedItem(foucedItem => new Map(foucedItem.set(page, id)));
    console.log(foucedItem );
  };
  

  

  const handleSubmitChanges = () => {
    const data = Object.values(itemEdits).map((item) => ({ id: item.id,  ...item, }));

    Api.put(`/items`, data).then((response) => {
        notifySuccess("Data submitted"); })
      .catch((error) => {
        notifyError("Error submitting changes:", error);
      });
  };
  const handleAutoFocus = (index, key) => {
    const focusedInput = foucedItem.get(page);
    return focusedInput && focusedInput.index === index  && focusedInput[key];
  };
  

  useEffect(() => { 
    if (lastChangedInputRef.current) {
      const lastChangedInput = document.getElementById(
        `input-${lastChangedInputRef.current}`
      );
      // if (lastChangedInput) {
      //   lastChangedInput.focus();
      // }
    }
  }, [itemEdits]);
  


  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const [modal, setModal] = useState({
    open: false,
    update: false,
    data: null,
  });

  const handleClose = () => setModal({ open: false });

  return (
    <div className="flex bg-white ">
      <div
        className={` ${
          open ? "w-72 p-5 " : "w-20 "
        }     pt-8 relative duration-300 rounded-r-3xl min-h-screen		shadow`}
        style={{ background: "var(--adminDark)" }}
      >
        <img
          src={arrow.src}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          style={{ marginRight: "-8px" }}
          onClick={() => setOpen(!open)}
        />
        <div className="flex flex-col gap-x-4 items-center">
          <img
            src={logo.src}
            className={` rounded-3xl  cursor-pointer duration-500 w-36	${
              open && "rotate-[360deg]"
            }`}
          />
        </div>
        <div className="flex flex-col gap-x-4 items-center ">
          <ul className="pt-6 p-0 ">
            {Menus.map((Menu, index) => (
              <div key={index} className="row hover-effect">
                <li
                  onClick={() => router.push(Menu.href)}
                  className={`         ${
                    open &&
                    "flex items-center gap-x-2 w-25 rounded-md p-2  text-sm"
                  } flex  cursor-pointer hover:bg-light-white 

          ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && ""} `}
                >
                  <img src={`${Menu.src}`} className={`${!open && "w-100"} `} />
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {Menu.title}
                  </span>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className=" flex-1 p-7 w-fit	min-h-screen	overflow-hidden	">
        <ItemModel open={modal.open} handleClose={handleClose} />
        <div className="flex justify-end  ">
          <button
            type="button"
            className=" text-white rounded-3xl	 bg-primary hover:bg-sky-700 transition-all focus:ring-4 focus:outline-none font-medium   text-sm px-4 py-2 text-center   fw-bold"
            onClick={() => setModal({ open: true, update: false })}
          >
            Add
          </button>
        </div>

        <div className="row mb-4">
          <div className=" gy-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead
                  className="  text-gray-700 uppercase header    dark:text-gray-400"
                  style={{ background: "var(--adminDark)" }}
                >
                  <tr className="text-center bg-primary text-white">
                    <th scope="col" className="px-6 py-3">
                      -
                    </th>
                    {Object.values(itemEdits).map((item, index) => (
                      <>
                    
                        <th scope="col" className="px-6 py-3">
                          <div className="input-group mb-3 min-w-32">
                            <input
                              type="text"
                              className="form-control "
                              ref={lastChangedInputRef}
                              placeholder="name"
                              value={itemEdits[item.id]?.name || ""}
                              autoFocus={handleAutoFocus(index , "name")}
                              onChange={(e) =>
                                handleInputChange(
                                  item.id,
                                  "name",
                                  e.target.value
                                )
                              }
                              id={`input-${item.id}`}
                            />
                          </div>
                        </th>
                      </>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className=" text-center border-b   border-white dark:border-gray-700   dark:hover:bg-gray-600 pointer">
                    <td className="px-6 py-4 font-semibold  text-white     bg-primary ">
                      Brand
                    </td>
                    {Object.values(itemEdits).map((item, index) => (
                      <>
                        {" "}
                        <td scope="col" className="px-6 py-3">
                          <div className="input-group mb-3 min-w-32">
                            <input
                              type="text"
                              className="form-control "
                              placeholder="brand"
                              id={`input-${item.id}`}
                              value={itemEdits[item.id]?.brand || ""}
                              autoFocus={handleAutoFocus(index , "brand")}
                              onChange={(e) =>
                                handleInputChange(
                                  item.id,
                                  "brand",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </td>
                      </>
                    ))}
                  </tr>

                  <tr className=" text-center border-b  border-white dark:border-gray-700   dark:hover:bg-gray-600 pointer">
                    <td className="px-6 py-4 font-semibold      bg-primary text-white   ">
                      Model
                    </td>
                    {Object.values(itemEdits).map((item, index) => (
                      <>
                        {" "}
                        <td scope="col" className="px-6 py-3">
                          <div className="input-group mb-3 min-w-32">
                            <input
                              type="text"
                              className="form-control "
                              placeholder="model"
                              value={itemEdits[item.id]?.model || ""}
                              autoFocus={handleAutoFocus(index , "model")}
                              id={`input-${item.id}`}
                              onChange={(e) =>
                                handleInputChange(
                                  item.id,
                                  "model",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </td>
                      </>
                    ))}
                  </tr>
                  <tr className=" text-center border-b border-white dark:border-gray-700   dark:hover:bg-gray-600 pointer">
                    <td className="px-6 py-4 font-semibold     bg-primary text-white     ">
                      Color
                    </td>
                    {Object.values(itemEdits).map((item, index) => (
                      <>
                        {" "}
                        <td scope="col" className="px-6 py-3">
                          <div className="rounded">
                            <div className="input-group mb-3 min-w-32 flex justify-center ">
                              <input
                                type="color"
                                className="   h-12"
                                placeholder="color"
                                value={itemEdits[item.id]?.color || ""}
                                id={`input-${item.id}`}
                                autoFocus={handleAutoFocus(index , "color")}
                                onChange={(e) =>
                                  handleInputChange(
                                    item.id,
                                    "color",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        </td>
                      </>
                    ))}
                  </tr>

                  <tr className=" text-center border-b   border-white dark:border-gray-700   dark:hover:bg-gray-600 pointer">
                    <td className="px-6 py-4 font-semibold       bg-primary text-white ">
                      Price
                    </td>
                    {Object.values(itemEdits).map((item, index) => (
                      <>
                        {" "}
                        <td scope="col" className="px-6 py-3">
                          <div className="input-group mb-3 min-w-32">
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Price"
                              value={itemEdits[item.id]?.Price || ""}
                              id={`input-${item.id}`}
                              autoFocus={handleAutoFocus(index , "Price")}
                              onChange={(e) =>
                                handleInputChange(
                                  item.id,
                                  "Price",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </td>
                      </>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>{" "}
            <div className="  flex gap-4 justify-center ">
              <button
                type="button"
                className="btn      mt-4  text-primary    ansition-all"
                onClick={handlePreviousPage}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn      mt-4   text-primary   ansition-all"
                onClick={handleNextPage}
              >
                Next
              </button>
            </div>
            <div className="  flex gap-4 justify-center ">
              <button
                type="submit"
                className="btn      mt-4   text-primary   ansition-all"
                onClick={handleSubmitChanges}
              >
                Submit Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default itemTable;
