import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
};

// const authFetch = axios.create({
//   baseURL: "/api",
// });

// authFetch.interceptors.request.use(
//   (request) => {
//     request.headers.common["Authorization"] = `Bearer ${state.token}`;
//     return request;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const login = createAsyncThunk("admin/login", async (payload) => {
  console.log(payload);
  try {
    const response = await axios.post("/api/admin/login", payload);
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      const { adminData, adminToken } = action.payload;
      localStorage.setItem("user", JSON.stringify(adminData));
      localStorage.setItem("token", token);
      state.user = adminData;
      state.token = adminToken;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action);
    });
  },
});

export default adminSlice.reducer;
