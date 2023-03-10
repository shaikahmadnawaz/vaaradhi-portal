import { createSlice } from "@reduxjs/toolkit";
import { students } from "../../assets/students";

const initialState = {
  name: "",
  email: "",
  image: "",
  dateOfBirth: "",
  token: "",
  mobile: "",
  occupation: "",
  students: students,
  transactions: [],
};

const donorSlice = createSlice({
  name: "donor",
  initialState,
  reducers: {},
});

export default donorSlice.reducer;
