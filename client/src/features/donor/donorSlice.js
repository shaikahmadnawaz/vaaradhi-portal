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
  currentStudentId: -1,
};

const donorSlice = createSlice({
  name: "donor",
  initialState,
  reducers: {
    setCurrentStudent: (state, action) => {
      console.log(action.payload.id);
      state.currentStudentId = action.payload.id;
    },
  },
});

export const { setCurrentStudent } = donorSlice.actions;

export default donorSlice.reducer;
