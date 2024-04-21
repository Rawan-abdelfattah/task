'use client'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../../components/toastify/toastify";
import TextField from "@mui/material/TextField"; 
import Button from "@mui/material/Button";
import { fetchAllItem } from "@/redux/slices/item";
import Api from "@/config/api";
import Dropdown from 'react-bootstrap/Dropdown';
 import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const style = { 
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper", 
  boxShadow: 24,
  p: 4,
};
const ItemModel = ({ open, handleClose  }) => { 
   const [initialState, setInitialState] = useState({
    Price: "",
    name: "",
    brand: "",
    color: "",
    model: '',
  });
 
  const [brand, setBrand] = useState('');

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };
  const formik = useFormik({
    initialValues: initialState,
    onSubmit: handleSubmit,
  });
  function handleSubmit(values) {
 
    console.log(values);
  
    Api.post('/items' ,values)
      .then(() => {
        notifySuccess("Data submitted");
        formik.resetForm();
        dispatch(fetchAllItem());
        handleClose();
      })
      .catch((err) => {
        let error = err?.response?.data?.message;
        notifyError(Array.isArray(error) ? error[0] : error);
      })
    
  }

 
  const handleModalClose = () => {
    handleClose();
    formik.resetForm();  
  };
  
 

  return (
    <div> 
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
              <Box sx={style} >

        <form
          onSubmit={formik.handleSubmit}
           
        >
          <TextField
            error={formik.touched.name && formik.errors.name ? true : false}
            helperText={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : null
            }
            required
            label="name"
            name="name" 
            id="name"
            value={formik?.values?.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" mb-2"
            fullWidth
          />
                    <TextField
            error={formik.touched.Price && formik.errors.Price ? true : false}
            helperText={
              formik.touched.Price && formik.errors.Price
                ? formik.errors.Price
                : null
            }
            required
            label="Price"
            name="Price" 
            id="Price"
            value={formik?.values?.Price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" mb-2"
            fullWidth
          />
      
       
<TextField
            error={
              formik.touched.color && formik.errors.color
                ? true
                : false
            }
            helperText={
              formik.touched.color && formik.errors.color
                ? formik.errors.color
                : null
            }
            required
            label="color"
            type="color" 
            id="color" 
            name="color"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik?.values?.color}
            fullWidth
            className=" mt-2"
          />
          
      <FormControl fullWidth>
        <InputLabel  >brand</InputLabel>
        <Select 
          id="brand"
          label="brand"
          onChange={handleBrandChange}
          onBlur={formik.handleBlur}
          className="mt-2"
          value={formik?.values?.brand}
        >
          <MenuItem onClick={() => formik.setFieldValue('brand', 'SOVAGE') } value={'SOVAGE'}>SOVAGE</MenuItem>
          <MenuItem onClick={() => formik.setFieldValue('brand', 'PRAGA')} value={'PRAGA'}>PRAGA</MenuItem>
          <MenuItem onClick={() => formik.setFieldValue('brand', 'LIOBARD')} value={'LIOBARD'}>LIOBARD</MenuItem>
          <MenuItem onClick={() => formik.setFieldValue('brand', 'TOMMY')} value={'TOMMY'}>TOMMY</MenuItem>
        </Select>
      </FormControl>
 
 

          <TextField
            error={
              formik.touched.model && formik.errors.model
                ? true
                : false
            }
            helperText={
              formik.touched.model && formik.errors.model
                ? formik.errors.model
                : null
            }
            required
            label="model"
            name="model"
            id="model" 

            value={formik?.values?.model}
            onChange={formik.handleChange}
            fullWidth
            onBlur={formik.handleBlur}
            className=" mt-2"
          />
 

 
          <div className="col-12  flex gap-2 ">
            <button
              type="submit"
              className="btn bg-primary form-control text-white  mt-4  w-100  hover:bg-sky-700 transition-all"
             
            >
        Create  
            </button>
            <button
              type="submit"
              className="btn bg-primary form-control text-white   mt-4  w-100  hover:bg-sky-700 transition-all"
 
              onClick={handleModalClose}

            >
              Close
            </button>
          </div>
        </form>
        </Box>
      </Modal>
    </div>
  );
};
export default ItemModel
