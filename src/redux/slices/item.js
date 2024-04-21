

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import Api from "@/config/api"
 
export const fetchAllItem= createAsyncThunk(
  'user/fetchAllItem',
  async (page, thunkAPI) => {
    try {  
      const response = await Api.get(`/items/${page}`)
      return response.data.items;
      // console.log(response);
    } catch (error) {
  return thunkAPI.rejectWithValue(error.message);
    }
}
);
 
  const item = createSlice({
    name: "item",
    initialState: {
      value: { 
      data: [] , 
     },
    }, 
    extraReducers: (builder) => {
      builder.addCase(fetchAllItem.fulfilled, (state, action) => {
        state.value.loggedIn=true
        state.value.data=action.payload
      });
      builder.addCase(fetchAllItem.rejected, (state, action) => {
        state.value.loggedIn=false
      }); 
    },
  }); 

export default item.reducer